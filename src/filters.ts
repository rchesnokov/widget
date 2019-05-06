import Vue from 'vue';

const registerFilters = () => {
  Vue.filter('date', (value: number) => {
    return new Date(value);
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
