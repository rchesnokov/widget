import * as R from 'ramda';
import {
  getModule,
  Module,
  VuexModule,
  Action,
  Mutation,
  MutationAction,
} from 'vuex-module-decorators';
import { Task, Solution } from './TaskModels';
import TaskService from './TaskService';
import store from '@/store';

interface ISolutionMap {
  [key: number]: Solution[];
}

@Module({ dynamic: true, name: 'task', store })
export class TaskModule extends VuexModule {
  tasks: Task[] = [];
  solutions: ISolutionMap = {};

  @Mutation
  setTaskSolutions(solutions: ISolutionMap) {
    this.solutions = R.mergeWith(R.concat, this.solutions, solutions);
  }

  @MutationAction({ mutate: ['tasks'] })
  async fetchTasks() {
    const response = await Promise.all([
      TaskService.fetchTask(9303),
      TaskService.fetchTask(9304),
    ]);

    return { tasks: response };
  }

  @Action({ commit: 'setTaskSolutions' })
  async fetchTaskSolutions({
    taskId,
    page = 0,
    pageSize = 5,
  }: {
    taskId: number;
    page?: number;
    pageSize?: number;
  }) {
    const response = await TaskService.fetchTaskSolutions({
      taskId,
      page,
      pageSize,
    });

    return {
      [taskId]: response,
    };
  }
}

export default getModule(TaskModule);
