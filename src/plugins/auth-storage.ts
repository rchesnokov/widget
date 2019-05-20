import Cookies from 'universal-cookie/es6';

export default class Storage {
  storage = new Cookies();
  storageTokenKey = 'FOM_ID_TOKEN';
  storageUserKey = 'FOM_ID_USER';

  getToken(): string | undefined {
    return this.storage.get(this.storageTokenKey);
  }

  setToken(token: string) {
    if (!this.storage.get(this.storageUserKey)) {
      this.storage.set(this.storageUserKey, true, {
        maxAge: 12 * 30 * 24 * 60 * 60,
      });
    }

    this.storage.set(this.storageTokenKey, token, {
      maxAge: 5 * 60,
    });
  }

  removeToken() {
    this.storage.remove(this.storageTokenKey);
  }
}
