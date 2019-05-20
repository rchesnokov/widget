import api from '@/api';
import * as R from 'ramda';
import { Meta, MetaResponse } from '@/modules/task/models/meta';
import {
  SolutionResponse,
  SolutionArray,
} from '@/modules/task/models/solution';
import { Task, TaskResponse } from '@/modules/task/models/task';
import { AxiosResponse } from 'axios';

type Sorting = 'vote_total' | 'created' | '';

interface IFetchSolutionsParams {
  taskId: number;
  query?: string;
  page?: number;
  pageSize?: number;
  sort?: Sorting;
}

class TaskService {
  static async fetchTask(taskId: number): Promise<Task> {
    const response: AxiosResponse = await api.get(`/api/tasks/${taskId}`);
    const data: TaskResponse = response.data;
    return data.data;
  }

  static async fetchTaskMeta(taskId: number): Promise<Meta> {
    const response: AxiosResponse = await api.get(`/api/tasks/${taskId}/meta`);
    const data: MetaResponse = response.data;
    return data.data;
  }

  static async fetchTaskSolutions(
    params: IFetchSolutionsParams
  ): Promise<SolutionArray> {
    const { taskId, query, page, pageSize, sort } = params;
    const queryParams = {
      sort_by: sort,
      sort_order: 'desc',
      page,
      page_size: pageSize,
      query,
    };

    const queryString = R.pipe(
      R.pickBy((val) => val),
      // @ts-ignore
      R.toPairs,
      R.map(R.join('=')),
      R.join('&')
    )(queryParams);

    const response: AxiosResponse = await api.get(
      `api/tasks/${taskId}/solutions?${queryString}`
    );
    const data: SolutionResponse = response.data;
    const solutions: SolutionArray = data.data;
    solutions.count = Number(data.meta.solutions_count);

    return solutions;
  }

  static async voteForSolution(solutionId: number, vote: number) {
    const data = new FormData();
    data.set('value', String(vote));

    const response = await api.request({
      url: `/api/solutions/${solutionId}/vote`,
      method: 'post',
      data,
    });

    if (response.status === 200) {
      return response.data;
    }

    return null;
  }
}

export default TaskService;
