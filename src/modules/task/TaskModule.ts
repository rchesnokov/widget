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

type Sorting = 'rating' | 'name' | 'date';

interface IMetaMap {
  [key: number]: Meta;
}

interface ISolutionMap {
  [key: number]: SolutionArray;
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
  rating = 'vote_total',
  date = 'created',
  name = '',
}

const tasksRequested = window.__BOOK_AWARD_TASKS__ || [9303, 9304];
const metricsServiceMock = {
  // tslint:disable-next-line:no-empty
  sendEvent: (event: object) => {},
};

@Module({ dynamic: true, name: 'task', store })
export class TaskModule extends VuexModule {
  fetchingTasks = false;
  fetchingSolutions: IFetchingSolutionMap = {};
  requested = tasksRequested;
  solutions: ISolutionMap = {};
  tasks: Task[] = [];
  tasksMeta: IMetaMap = {};

  metricsService = window.metricsService || metricsServiceMock;
  userModule = UserModule;

  get getIsFetchingSolutions() {
    return (taskId: number) => this.fetchingSolutions[taskId];
  }

  get getSolutions() {
    return (taskId: number) => this.solutions[taskId];
  }

  get getTasks() {
    return this.tasks;
  }

  get getTaskMeta() {
    return (taskId: number) => this.tasksMeta[taskId];
  }

  get getRemainingVotes() {
    return (taskId: number): number => {
      const task: Task | undefined = R.find(R.propEq('id', taskId))(this.tasks);
      const meta: Meta = this.tasksMeta[taskId];

      if (!task) {
        return -1;
      }

      const votesBudget = Number(task.vote_budget);
      if (!votesBudget) {
        return -1;
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
  setTasks(tasks: Task[]) {
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

    return response;
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
    pageSize = 50,
    sort = 'rating',
  }: IFetchSolutionParams) {
    this.context.commit('setIsFetchingSolutions', { taskId, value: true });

    const sorting: 'vote_total' | 'created' | '' =
      FetchSolutionSortMap[sort as keyof typeof FetchSolutionSortMap];

    const response = await Promise.all([
      TaskService.fetchTaskSolutions({
        taskId,
        query,
        page,
        pageSize,
        sort: sorting,
      }),

      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 600);
      }),
    ]);

    const solutions: SolutionArray = response[0];

    this.context.commit('setIsFetchingSolutions', { taskId, value: false });

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
        await this.userModule.requestVerification(
          likeAccess.is_phone && !user.phoneVerified,
          likeAccess.is_soc_auth && !user.socialVerified,
          task.literals.solution_num_s
        );
        this.likeSolution({ task, solution });
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

    this.metricsService.sendEvent({
      gaCategory: 'Контент',
      gaAction: userVoteCode ? 'Лайк решения' : 'Снятие лайка решения',
    });
  }
}

export default getModule(TaskModule);
