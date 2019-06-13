<template>
  <div :class="$style.root">
    <!--<Select-->
    <!--  :class="$style.select"-->
    <!--  :list="filters"-->
    <!--  :active="defaultSorting"-->
    <!--  @select="handleSortSelect"-->
    <!--/>-->

    <Search
      :class="$style.search"
      :is-open="true"
      @change="handleSearchChange"
    />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ListFilter extends Vue {
  @Prop() defaultSorting!: string;

  filters = [
    {
      id: 'date',
      label: 'По дате',
    },
    {
      id: 'rating',
      label: 'По рейтингу',
    },
    // {
    //   id: 'review',
    //   label: 'По количеству рецензий',
    // },
  ];

  @Emit('sort-change')
  handleSortSelect(id: string) {
    return id;
  }

  @Emit('search-change')
  handleSearchChange(query: string) {
    return query;
  }
}
</script>

<style module lang="scss">
.root {
  position: relative;
  display: flex;
  justify-content: flex-end;
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
