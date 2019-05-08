<template>
  <div :class="$style.root">
    <Select
      :class="$style.select"
      :list="filters"
      active="rating"
      @select="handleSortSelect"
    />

    <Search :class="$style.search" @change="handleSearchChange" />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';

@Component
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
