import Vue from 'vue';
import Button from '@/components/Common/Button.vue';
import Icon from '@/components/Common/Icon.vue';
import Link from '@/components/Common/Link.vue';
import Search from '@/components/Common/Search.vue';
import Select from '@/components/Common/Select.vue';

const registerGlobalComponents = () => {
  Vue.component('Button', Button);
  Vue.component('Icon', Icon);
  Vue.component('CLink', Link); // Clink для избежания ошибки линтера с одноименным тегом link
  Vue.component('Search', Search);
  Vue.component('Select', Select);
};

export default registerGlobalComponents;
