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
  comments_count?: number;
  my_vote?: number;
}

export interface Status {
  id: string;
  solution_id: string;
  label_id: string;
}

export interface Field {
  header: string;
  type: string;
  value: string;
}

export interface JSONContent {
  fields: Field[];
}

export interface Solution {
  id: number;
  title: string;
  content?: string;
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
  json_content?: JSONContent;
  moderated: number;
}

export interface SolutionArray extends Array<Solution> {
  [index: number]: Solution;
  count?: number;
}

export interface SolutionMeta {
  solutions_count: number;
}

export interface SolutionResponse {
  data: Solution[];
  meta: SolutionMeta;
}
