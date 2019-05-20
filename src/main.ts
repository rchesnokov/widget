import Vue from 'vue';
import App from './App.vue';
import registerFilters from './filters';
import registerPlugins from './plugins';
import registerGlobalComponents from '@/components/global';
import store from './store';

Vue.config.productionTip = false;

registerFilters();
registerPlugins();
registerGlobalComponents();

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
