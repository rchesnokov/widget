export enum SocialsType {
  FB = 'facebook',
  VK = 'vkontakte',
  OK = 'odnoklassniki',
  TW = 'twitter',
  GP = 'google',
  EMAIL = 'email',
}

export interface ShareConfig {
  url: string;
  title?: string;
  image?: string;
  description?: string;
}
