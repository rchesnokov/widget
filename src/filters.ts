import Vue from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

const registerFilters = () => {
  dayjs.locale('ru');

  Vue.filter('date', (value: number) => {
    return dayjs(new Date(value * 1000)).format('DD MMMM YYYY');
  });

  Vue.filter(
    'roundup',
    (value: number | string): string => {
      const num = Number(value);
      return num < 1000 ? String(num) : `${Math.floor(num / 100) / 10}K`;
    }
  );
};

export default registerFilters;
