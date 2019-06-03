import { Action, getModule, Module, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import { ShareConfig, SocialsType } from '@/modules/sharing/models/share';

declare global {
  interface Window {
    SharingUtils: any;
  }
}

const metricsServiceMock = {
  // tslint:disable-next-line:no-empty
  sendEvent: (event: object) => {},
};

const sharingUtilsMock = {
  // tslint:disable-next-line:no-empty
  shareByType: (config: ShareConfig, type: SocialsType) => {},
};

@Module({ dynamic: true, name: 'sharing', namespaced: true, store })
export class SharingModule extends VuexModule {
  static metricsService = window.metricsService || metricsServiceMock;
  static sharingUtils = window.SharingUtils || sharingUtilsMock;

  @Action
  share({ config, type }: { config: ShareConfig; type: SocialsType }) {
    SharingModule.sharingUtils.shareByType(config, type);
  }
}

export default getModule(SharingModule);
