import Vue from 'vue';
import { AuthPlugin } from '@/plugins/auth-plugin';

declare module 'vue/types/vue' {
  interface Vue {
    $auth: AuthPlugin;
    $style: any;
  }

  interface VueConstructor {
    $auth: AuthPlugin;
    prototype: any;
  }
}
