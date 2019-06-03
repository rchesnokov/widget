export enum SocialsType {
  FB = 'facebook',
  VK = 'vkontakte',
  OK = 'odnoklassniki',
  TW = 'twitter',
  EMAIL = 'email',
}

export interface ShareConfig {
  url: string;
  title?: string;
  image?: string;
  description?: string;
}
