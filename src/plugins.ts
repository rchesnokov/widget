import Vue from 'vue';
import vClickOutside from 'v-click-outside';
import VTooltip from 'v-tooltip';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueAxios from 'vue-axios';
import axios from 'axios';
import AuthPlugin from '@/plugins/auth-plugin';

import 'swiper/dist/css/swiper.css';

const registerPlugins = () => {
  Vue.use(vClickOutside);
  Vue.use(VTooltip);
  Vue.use(VueAwesomeSwiper);
  Vue.use(VueAxios, axios);
  Vue.use(AuthPlugin);
};

export default registerPlugins;
