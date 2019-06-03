import * as R from 'ramda';
import {
  getModule,
  Action,
  Mutation,
  Module,
  VuexModule,
} from 'vuex-module-decorators';
import TaskService from './TaskService';
import store from '@/store';
import { Meta } from '@/modules/task/models/meta';
import {
  Metrics,
  Solution,
  SolutionArray,
} from '@/modules/task/models/solution';
import { Task } from '@/modules/task/models/task';
import UserModule from '@/modules/user/UserModule';

declare global {
  interface Window {
    __BOOK_AWARD_TASKS__: number[];
    metricsService: any;
  }
}

type Sorting = 'date' | 'rating' | 'review';

interface IMetaMap {
  [key: number]: Meta;
}

interface ISolutionMap {
  [key: number]: SolutionArray;
}

interface ITaskMap {
  [key: number]: Task;
}

interface IFetchingSolutionMap {
  [key: number]: boolean;
}

interface IFetchSolutionParams {
  taskId: number;
  query?: string;
  page?: number;
  pageSize?: number;
  sort?: Sorting;
}

enum FetchSolutionSortMap {
  date = 'created',
  rating = 'vote_total',
  review = 'review_count',
}

enum FetchSolutionSortMapReverse {
  created = 'date',
  vote_total = 'rating',
  review_count = 'review',
}

const tasksRequested = window.__BOOK_AWARD_TASKS__ || [9303, 9304];
const metricsServiceMock = {
  // tslint:disable-next-line:no-empty
  sendEvent: (event: object) => {},
};

@Module({ dynamic: true, name: 'task', store })
export class TaskModule extends VuexModule {
  static metricsService = window.metricsService || metricsServiceMock;
  static userModule = UserModule;

  fetchingTasks = false;
  fetchingSolutions: IFetchingSolutionMap = {};
  requested = tasksRequested;
  solutions: ISolutionMap = {};
  tasks: ITaskMap = {};
  tasksMeta: IMetaMap = {};

  get getIsFetchingSolutions() {
    return (taskId: number) => this.fetchingSolutions[taskId];
  }

  get getSolutions() {
    return (taskId: number) => this.solutions[taskId];
  }

  get getTasks() {
    return R.values(this.tasks);
  }

  get getTask() {
    return (taskId: number) => this.tasks[taskId];
  }

  get getTaskMeta() {
    return (taskId: number) => this.tasksMeta[taskId];
  }

  get getDefaultSorting() {
    return (taskId: number) => {
      const task = this.tasks[taskId];
      const param = task.sort_by.match(/^(\w+)/g);
      const sorting = param && param[0];
      // @ts-ignore
      return FetchSolutionSortMapReverse[sorting];
    };
  }

  get getIsVotingDisabled() {
    return (taskId: number) => {
      const task = this.tasks[taskId];
      const status = task.status;
      return status === 'completed' || status === 'summing-up';
    };
  }

  get getRemainingVotes() {
    return (taskId: number): number => {
      const task: Task = this.tasks[taskId];
      const meta: Meta = this.tasksMeta[taskId];

      if (!task || !meta.user) {
        return -1;
      }

      const votesBudget = Number(task.vote_budget);
      if (votesBudget === 0) {
        return Infinity;
      }

      const userVotes = meta.user.solution_votes;
      const votesCount = R.keys(userVotes).filter(
        (vote) => userVotes[vote] !== 0
      ).length;

      return votesBudget - votesCount;
    };
  }

  @Mutation
  setIsFetchingTasks(value: boolean) {
    this.fetchingTasks = value;
  }

  @Mutation
  setIsFetchingSolutions({
    taskId,
    value,
  }: {
    taskId: number;
    value: boolean;
  }) {
    this.fetchingSolutions = {
      ...this.fetchingSolutions,
      [taskId]: value,
    };
  }

  @Mutation
  setTasks(tasks: ITaskMap) {
    this.tasks = tasks;
  }

  @Mutation
  setTasksMeta(meta: IMetaMap) {
    this.tasksMeta = {
      ...this.tasksMeta,
      ...meta,
    };
  }

  @Mutation
  setTaskSolutions(solutions: ISolutionMap) {
    this.solutions = R.mergeWith(R.concat, this.solutions, solutions);
    R.forEach((key) => {
      this.solutions[key].count = solutions[key].count;
    }, R.keys(solutions));
  }

  @Mutation
  resetTaskSolutions(taskId: number) {
    this.solutions[taskId] = [];
    this.solutions[taskId].count = 0;
  }

  @Action({ commit: 'setTasks' })
  async fetchTasks() {
    this.context.commit('setIsFetchingTasks', true);

    const response: Task[] = await Promise.all(
      R.map((taskId) => TaskService.fetchTask(taskId), tasksRequested)
    );

    this.context.commit('setIsFetchingTasks', false);

    const getIdsArray = R.pipe(
      // @ts-ignore
      R.pluck('id'),
      R.map((id) => String(id))
    );

    return R.zipObj(getIdsArray(response), response);
  }

  @Action({ commit: 'setTasksMeta' })
  async fetchTasksMeta() {
    const response: Meta[] = await Promise.all(
      R.map((taskId) => TaskService.fetchTaskMeta(taskId), tasksRequested)
    );

    return R.zipObj(R.map((task) => String(task), tasksRequested), response);
  }

  @Action({ commit: 'setTaskSolutions' })
  async fetchTaskSolutions({
    taskId,
    query = '',
    page = 0,
    pageSize = 5,
    sort,
  }: IFetchSolutionParams) {
    this.context.commit('setIsFetchingSolutions', { taskId, value: true });

    const defaultSorting = this.getDefaultSorting(taskId);
    const sorting: 'created' | 'review_count' | 'vote_total' =
      FetchSolutionSortMap[sort as keyof typeof FetchSolutionSortMap];

    const response = await Promise.all([
      TaskService.fetchTaskSolutions({
        taskId,
        query,
        page,
        pageSize,
        sort: sorting || defaultSorting,
      }),

      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 600);
      }),
    ]);

    const solutions: SolutionArray = response[0];

    this.context.commit('setIsFetchingSolutions', { taskId, value: false });

    if (page !== 0) {
      TaskModule.metricsService.sendEvent({
        gaCategory: 'Виджет',
        gaAction: 'Показать еще',
      });
    }

    return {
      [taskId]: solutions,
    };
  }

  @Action
  async likeSolution({ task, solution }: { task: Task; solution: Solution }) {
    const user = this.context.rootGetters['user/getUser'];
    if (!user) {
      this.context.dispatch('user/showRegistration');
      return;
    }

    if (user.status === 'inactive') {
      this.context.dispatch('user/showConfirmation');
      return;
    }

    const likeAccess: { is_phone: boolean; is_soc_auth: boolean } =
      task.actionAccess.like;
    const taskHasAccessRestrictions: boolean =
      likeAccess && (likeAccess.is_phone || likeAccess.is_soc_auth);

    if (taskHasAccessRestrictions) {
      const userIsVerified: boolean =
        (likeAccess.is_phone && user.phoneVerified) ||
        (likeAccess.is_soc_auth && user.socialVerified);

      if (!userIsVerified) {
        try {
          await TaskModule.userModule.requestVerification({
            isNotPhoneVerified: likeAccess.is_phone && !user.phoneVerified,
            isNotSNVerified: likeAccess.is_soc_auth && !user.socialVerified,
            solutionLiteral: task.literals.solution_num_s,
          });
          this.likeSolution({ task, solution });
        } catch (e) {}

        return;
      }
    }

    const userVote = R.path(
      [task.id, 'user', 'solution_votes', solution.id],
      this.tasksMeta
    );
    const userVoteCode =
      userVote !== undefined ? Number(!Boolean(userVote)) : 1;

    const response: Metrics | null = await TaskService.voteForSolution(
      solution.id,
      userVoteCode
    );

    if (response === null) {
      return;
    }

    const updatedSolutions: SolutionArray = [...this.solutions[task.id]];
    const updatedSolutionsIndex = R.findIndex(
      R.propEq('id', solution.id),
      updatedSolutions
    );

    updatedSolutions[updatedSolutionsIndex].metrics = {
      ...updatedSolutions[updatedSolutionsIndex].metrics,
      ...response,
    };
    updatedSolutions.count = this.solutions[task.id].count;

    this.resetTaskSolutions(task.id);
    this.setTaskSolutions({ [task.id]: updatedSolutions });

    this.setTasksMeta(
      R.assocPath(
        [task.id, 'user', 'solution_votes', solution.id],
        userVoteCode,
        this.tasksMeta
      )
    );

    TaskModule.metricsService.sendEvent({
      gaCategory: 'Контент',
      gaAction: userVoteCode ? 'Лайк решения' : 'Снятие лайка решения',
    });
  }
}

export default getModule(TaskModule);
