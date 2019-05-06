import Vue from 'vue';
import App from './App.vue';
import registerGlobalComponents from '@/components/global';
import registerFilters from './filters';
import registerPlugins from './plugins';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

registerFilters();
registerPlugins();
registerGlobalComponents();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
