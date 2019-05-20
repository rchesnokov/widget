import { Vue as _Vue } from 'vue/types/vue';
import axios from 'axios';
import get from 'lodash/get';
import Storage from './auth-storage';
import { PluginObject } from 'vue';

export class AuthPlugin implements PluginObject<object> {
  storage = new Storage();
  isGuest = false;

  createToken(): Promise<string | undefined | void> {
    return axios
      .request({
        method: 'post',
        url: `${process.env.VUE_APP_FOM_ID_URL}/api/jwt/new`,
        withCredentials: true,
      })
      .then((res) => this.storage.setToken(res.data))
      .then(() => this.storage.getToken())
      .catch((res) => {
        const statusCode = get(res, 'response.status');

        if (statusCode === 403 || statusCode === 401) {
          this.storage.removeToken();
          this.isGuest = true;
        }
      });
  }

  getToken(): string | undefined {
    return this.storage.getToken();
  }

  install(Vue: typeof _Vue, options?: object): void {
    Vue.$auth = this;
    Vue.prototype.$auth = this;
  }
}

export default new AuthPlugin();
