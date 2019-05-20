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
  requestVerification: () => {},
};

@Module({ dynamic: true, name: 'user', namespaced: true, store })
export class UserModule extends VuexModule {
  authService = window.authService || authServiceMock;
  alertService = window.alertsActions || alertServiceMock;
  verificationService = window.verificationService || verificationServiceMock;
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
    return this.verificationService.requestVerification(
      isNotPhoneVerified,
      isNotSNVerified,
      'like',
      solutionLiteral
    );
  }

  @Action
  showConfirmation() {
    this.alertService.error(
      `Для оценки книг вам необходимо подтвердить регистрацию.
       Письмо со ссылкой для подтверждения регистрации отправлено на ваш адрес.`
    );
  }

  @Action
  showRegistration() {
    this.authService.showRegistrationPopup();
  }
}

export default getModule(UserModule);
