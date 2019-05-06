<template>
  <div :class="$style.root">
    <Select :class="$style.select" :list="filters" active="date" />
    <Search :class="$style.search" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

export default class ListFilter extends Vue {
  filters = [
    {
      id: 'date',
      label: 'По дате',
    },
    {
      id: 'rating',
      label: 'По рейтингу',
    },
    {
      id: 'name',
      label: 'По алфавиту',
    },
  ];
}
</script>

<style module lang="scss">
.root {
  position: relative;
  display: flex;
}

.select {
  flex-grow: 1;
  margin-right: 20px;
}

.search {
  flex-grow: 0;
  flex-shrink: 0;
}
</style>
