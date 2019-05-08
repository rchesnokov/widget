import * as R from 'ramda';
import {
  getModule,
  Module,
  VuexModule,
  Action,
  Mutation,
  MutationAction,
} from 'vuex-module-decorators';
import TaskService from './TaskService';
import store from '@/store';
import { Meta } from '@/modules/task/models/meta';
import { SolutionArray } from '@/modules/task/models/solution';
import { Task } from '@/modules/task/models/task';

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
}

@Module({ dynamic: true, name: 'task', store })
export class TaskModule extends VuexModule {
  fetchingTasks = false;
  fetchingSolutions: IFetchingSolutionMap = {};
  solutions: ISolutionMap = {};
  tasks: Task[] = [];
  tasksMeta: IMetaMap = {};

  get getIsFetchingSolutions() {
    return (taskId: number) => this.fetchingSolutions[taskId];
  }

  get getSolutions() {
    return (taskId: number) => this.solutions[taskId];
  }

  get getTasks() {
    return this.tasks;
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

  @MutationAction({ mutate: ['tasks'] })
  async fetchTasks() {
    this.context.commit('setIsFetchingTasks', true);

    const response: Task[] = await Promise.all([
      TaskService.fetchTask(9303),
      TaskService.fetchTask(9304),
    ]);

    this.context.commit('setIsFetchingTasks', true);

    return { tasks: response };
  }

  @MutationAction({ mutate: ['tasksMeta'] })
  async fetchTasksMeta() {
    const response: Meta[] = await Promise.all([
      TaskService.fetchTaskMeta(9303),
      TaskService.fetchTaskMeta(9304),
    ]);

    return { tasksMeta: { 9303: response[0], 9304: response[1] } };
  }

  @Action({ commit: 'setTaskSolutions' })
  async fetchTaskSolutions({
    taskId,
    query = '',
    page = 0,
    pageSize = 5,
    sort = 'rating',
  }: IFetchSolutionParams) {
    this.context.commit('setIsFetchingSolutions', { taskId, value: true });

    const sorting: 'vote_total' | 'name' | 'date' =
      FetchSolutionSortMap[sort as keyof typeof FetchSolutionSortMap];

    const response = await Promise.all([
      TaskService.fetchTaskSolutions({
        taskId,
        query,
        page,
        pageSize,
        sort: sorting,
      }),

      new Promise((resolve, reject) => {
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
}

export default getModule(TaskModule);
