import { Action, getModule, Module, VuexModule } from 'vuex-module-decorators';
import store from '@/store';

declare global {
  interface Window {
    authService: any;
    alertsActions: any;
    verificationService: any;
    store: any;
  }
}

const authServiceMock = {
  // tslint:disable-next-line:no-empty
  showRegistrationPopup: () => {},
};

const alertServiceMock = {
  // tslint:disable-next-line:no-empty
  error: (text: string) => {},
};

const verificationServiceMock = {
  // tslint:disable-next-line:no-empty
  requestVerification: (
    isNotPhoneVerified: boolean,
    isNotSNVerified: boolean,
    like: string,
    solutionLiteral: string
  ) => {},
};

@Module({ dynamic: true, name: 'user', namespaced: true, store })
export class UserModule extends VuexModule {
  static authService = window.authService || authServiceMock;
  static alertService = window.alertsActions || alertServiceMock;
  static verificationService =
    window.verificationService || verificationServiceMock;

  user = window.store && window.store.getState().user;

  get getUser() {
    return this.user;
  }

  @Action
  requestVerification(
    isNotPhoneVerified: boolean,
    isNotSNVerified: boolean,
    solutionLiteral: string
  ) {
    return UserModule.verificationService.requestVerification(
      isNotPhoneVerified,
      isNotSNVerified,
      'like',
      solutionLiteral
    );
  }

  @Action
  showConfirmation() {
    UserModule.alertService.error(
      `Для оценки книг вам необходимо подтвердить регистрацию.
       Письмо со ссылкой для подтверждения регистрации отправлено на ваш адрес.`
    );
  }

  @Action
  showRegistration() {
    UserModule.authService.showRegistrationPopup();
  }
}

export default getModule(UserModule);
