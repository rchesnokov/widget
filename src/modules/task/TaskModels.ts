/* Task */

export interface SolutionsView {
  design: string;
  show_author: number;
  columns: number;
  show_solution_title: number;
  show_solution_description: number;
}

export interface Literals {
  all_solutions: string;
  solutions_statuses_title: string;
  my_solutions: string;
  new_solution_placeholder: string;
  new_solution_button: string;
  solution_title: string;
  solution_content: string;
  solution_template: string;
  no_solutions: string;
  solution_num_1: string;
  solution_num_2: string;
  solution_num_5: string;
  solution_num_s: string;
  solution_num_t: string;
  solution_created_text: string;
  solution_attachment_hint: string;
  solution_call_to_action: string;
  solution_call_to_action_button: string;
  new_comment_placeholder: string;
  new_comment_button: string;
  comment_content: string;
  comment_template: string;
  no_comments: string;
  sort_by_comments: string;
  comment_num_1: string;
  comment_num_2: string;
  comment_num_5: string;
  comment_attachment_hint: string;
  like: string;
  dislike: string;
  task_completed: string;
}

export interface Stage {
  label: string;
  timestamp: number;
}

export interface Rubrics {}

export interface Rule {
  title: string;
  content: string;
}

export interface Titles {
  7480: string;
  38870: string;
  91: string;
}

export interface Staff {
  titles: Titles;
  editors: number[];
  editors_space: any[];
  moderators: number[];
}

export interface Project {
  id: string;
  title: string;
  image: string;
  status: string;
  url: string;
  path: string;
  privacy: string;
}

export interface CreateComment {
  is_phone: boolean;
  is_soc_auth: boolean;
}

export interface CreateSolution {
  is_phone: boolean;
  is_soc_auth: boolean;
}

export interface Like {
  is_phone: boolean;
  is_soc_auth: boolean;
}

export interface ActionAccess {
  create_comment: CreateComment;
  create_solution: CreateSolution;
  like: Like;
}

export interface Og {
  title: string;
  description: string;
  image: string;
}

export interface Meta {
  og: Og;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  description_source: string;
  description_custom?: any;
  image: string;
  status: string;
  privacy: string;
  solutions_view: SolutionsView;
  sort_by: string;
  vote_budget: string;
  solutions_budget: number;
  vote_mode: string;
  premoderate: number;
  premoderate_comment: number;
  new_solutions_disabled: number;
  comments_disabled: number;
  evaluation_disabled: number;
  vote_require_project_review: number;
  view_own_solutions: number;
  literals: Literals;
  show_filters: number;
  stages: Stage[];
  rubrics: Rubrics;
  prizes: any[];
  prize_categories: any[];
  rules: Rule[];
  attachments: any[];
  solutions_count: number;
  staff: Staff;
  task_constructor?: any;
  project: Project;
  actionAccess: ActionAccess;
  meta: Meta;
  leagues: any[];
}

/* Meta */

export interface Distribution {
  id?: number;
  title: string;
  label: string;
  color: string;
  description: string;
  position: number;
  count: number;
}

export interface TaskMeta {
  distribution: Distribution[];
  meta: Meta;
}

/* Solution */

export interface Thumbs {
  thumb: string;
  72: string;
  136: string;
  280: string;
  560: string;
}

export interface Attachment {
  id: number;
  url: string;
  title: string;
  type: string;
  owner_model: string;
  owner_id: string;
  thumbs: Thumbs;
}

export interface Author {
  id: string;
  username: string;
  status: string;
  avatar: string;
  leagues: any[];
}

export interface Metrics {
  positive_votes: number;
  negative_votes: number;
  comments_count: number;
}

export interface Status {
  id: string;
  solution_id: string;
  label_id: string;
}

export interface Solution {
  id: number;
  title: string;
  content: string;
  pinned: boolean;
  cut: boolean;
  attachments: Attachment[];
  author: Author;
  created: number;
  rubric?: any;
  rubric_extended?: any;
  metrics: Metrics;
  comments_count: number;
  comments: any[];
  statuses: Status[];
  prizes: any[];
  shared_url: any[];
  json_content?: any;
  moderated: number;
}

export interface SolutionMeta {
  solutions_count: number;
}

export interface SolutionRootObject {
  data: Solution[];
  meta: SolutionMeta;
}
