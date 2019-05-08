export interface Distribution {
  id?: number;
  title: string;
  label: string;
  color: string;
  description: string;
  position: number;
  count: number;
}

export interface Og {
  title: string;
  description: string;
  image: string;
}

export interface MetaOg {
  og: Og;
}

export interface Task {
  distribution: Distribution[];
  meta: MetaOg;
}

export interface CommentVotes {}

export interface SolutionVotes {}

export interface User {
  favorites: any[];
  my_solutions_count: number;
  comment_votes: CommentVotes;
  solution_votes: SolutionVotes;
  acl: string[];
  unread_solutions_count: string;
  last_seen_time: string;
}

export interface Meta {
  task: Task;
  user: User;
}

export interface MetaResponse {
  data: Meta;
}
