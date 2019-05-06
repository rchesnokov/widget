import Vue from 'vue';
import vClickOutside from 'v-click-outside';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import axios from 'axios';
import VueAxios from 'vue-axios';

import 'swiper/dist/css/swiper.css';

const registerPlugins = () => {
  Vue.use(vClickOutside);
  Vue.use(VueAwesomeSwiper);
  Vue.use(VueAxios, axios);
};

export default registerPlugins;
