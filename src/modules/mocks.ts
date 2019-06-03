import { ShareConfig, SocialsType } from '@/modules/sharing/models/share';

declare global {
  interface Window {
    alertService: any;
    captchaService: any;
    metricsService: any;
    SharingUtils: any;
    store: any;
    verificationService: any;
  }
}

export const authServiceMock = {
  // tslint:disable-next-line:no-empty
  showRegistrationPopup: () => {},
};

export const alertServiceMock = {
  // tslint:disable-next-line:no-empty
  error: (text: string) => {},
};

export const captchaServiceMock = {
  // tslint:disable-next-line:no-empty
  execute: (key: string) => {},
};

export const metricsServiceMock = {
  // tslint:disable-next-line:no-empty
  sendEvent: (event: object) => {},
};

export const sharingUtilsMock = {
  // tslint:disable-next-line:no-empty
  shareByType: (config: ShareConfig, type: SocialsType) => {},
};

export const verificationServiceMock = {
  requestVerification: (
    isNotPhoneVerified: boolean,
    isNotSNVerified: boolean,
    like: string,
    solutionLiteral: string
    // tslint:disable-next-line:no-empty
  ) => {},
};
