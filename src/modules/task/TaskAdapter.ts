import {
  SolutionArray,
  SolutionResponse,
} from '@/modules/task/models/solution';

export default class TaskAdapter {
  static solutions(response: SolutionResponse): SolutionArray {
    const data = response.data;
    return data.map((solution) => {
      return {
        ...solution,
        // @ts-ignore
        json_content: JSON.parse(solution.json_content),
      };
    });
  }
}
