import api from '@/api';
import { Task, Solution } from '@/modules/task/TaskModels';

class TaskService {
  async fetchTask(taskId: number): Promise<Task[]> {
    const response = await api.get(`/api/tasks/${taskId}`);
    return response.data.data;
  }

  async fetchTaskMeta(taskId: number): Promise<object> {
    const response = await api.get(`/api/tasks/${taskId}/meta`);
    return response.data.data;
  }

  async fetchTaskSolutions({
    taskId,
    page = 0,
    pageSize = 5,
  }: {
    taskId: number;
    page?: number;
    pageSize?: number;
  }): Promise<Solution[]> {
    const response = await api.get(
      `api/tasks/${taskId}/solutions?sort_by=vote_total&sort_order=desc&page=${page}&page_size=${pageSize}`
    );
    return response.data.data;
  }
}

export default new TaskService();
