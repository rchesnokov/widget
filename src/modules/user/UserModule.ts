import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from 'vuex-module-decorators';
import store from '@/store';
import {
  authServiceMock,
  alertServiceMock,
  verificationServiceMock,
} from '@/modules/mocks';

declare global {
  interface Window {
    authService: any;
    alertsActions: any;
    verificationService: any;
    store: any;
  }
}

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

  @Mutation
  setUser(user: any) {
    this.user = user;
  }

  @Action({ commit: 'setUser' })
  renewUserData() {
    return window.store && window.store.getState().user;
  }

  @Action
  requestVerification({
    isNotPhoneVerified,
    isNotSNVerified,
    solutionLiteral,
  }: {
    isNotPhoneVerified: boolean;
    isNotSNVerified: boolean;
    solutionLiteral: string;
  }) {
    return UserModule.verificationService
      .requestVerification(
        isNotPhoneVerified,
        isNotSNVerified,
        'like',
        solutionLiteral
      )
      .then(() => {
        this.renewUserData();
      });
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
