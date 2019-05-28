export enum SocialsType {
  FB,
  VK,
  OK,
  TW,
  GP,
  EMAIL,
}

export interface ShareConfig {
  url: string;
  title?: string;
  image?: string;
  description?: string;
}
