<template>
  <div :class="$style.root">
    <h2 :class="$style.title">{{ task.title }}</h2>

    <ListFilter
      :class="$style.filter"
      @search-change="handleSearchChange"
      @sort-change="handleSortChange"
    />

    <Card
      v-for="item in solutions(task.id)"
      :class="$style.item"
      :key="item.id"
      :solution="item"
    />

    <div v-if="!isFetching(task.id) && !hasSolutions" :class="$style.empty">
      Ничего не найдено
    </div>

    <Button
      v-if="hasMoreSolutionsToLoad"
      secondary
      fullwidth
      :class="$style.button"
      @click="handleMoreClick"
    >
      Показать еще
    </Button>

    <transition name="fade">
      <Loader v-if="isFetching(task.id)" :bottom="hasSolutions" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import TaskModule from '@/modules/task/TaskModule';
import Card from '@/components/Card/Card.vue';
import ListFilter from '@/components/List/ListFilter.vue';
import { SolutionArray } from '@/modules/task/models/solution';
import { Task } from '@/modules/task/models/task';

type Sorting = 'rating' | 'name' | 'date';

@Component({
  components: {
    Card,
    ListFilter,
  },
})
export default class ListColumn extends Vue {
  @Prop(Object)
  task!: Task;

  query = '';
  page = 0;
  sort: Sorting = 'rating';

  taskModule = TaskModule;

  @Getter('getIsFetchingSolutions') isFetching!: (taskId: number) => boolean;
  @Getter('getSolutions') solutions!: (taskId: number) => SolutionArray;

  get hasSolutions() {
    const solutions = this.solutions(this.task.id);
    return solutions && solutions.length;
  }

  get hasMoreSolutionsToLoad() {
    const solutions = this.solutions(this.task.id);

    if (!solutions) {
      return false;
    }

    return solutions.length < solutions.count!;
  }

  handleMoreClick() {
    this.taskModule.fetchTaskSolutions({
      taskId: this.task.id,
      page: ++this.page,
      query: this.query,
      sort: this.sort,
    });
  }

  handleSearchChange(query: string) {
    if (this.query === query) {
      return;
    }

    this.page = 0;
    this.query = query;

    this.taskModule.resetTaskSolutions(this.task.id);
    this.taskModule.fetchTaskSolutions({
      taskId: this.task.id,
      page: this.page,
      query,
    });
  }

  handleSortChange(id: 'rating' | 'name' | 'date') {
    this.page = 0;
    this.sort = id;

    this.taskModule.resetTaskSolutions(this.task.id);
    this.taskModule.fetchTaskSolutions({
      taskId: this.task.id,
      page: this.page,
      sort: id,
    });
  }
}
</script>

<style module lang="scss">
.root {
  max-width: 432px;
  min-height: 1100px;
  padding-bottom: 20px;

  @media #{$tablet} {
    width: 100%;
    margin: 0 auto;
  }
}

.title {
  margin-bottom: 32px;
  font-size: rem(28px);
  font-weight: 600;
  line-height: 1.21;
  color: $black;

  @media #{$tablet} {
    position: relative;
    min-height: rem(50px);
    padding: 0 70px;
    font-size: 20px;
    line-height: 1.25;
    text-align: center;

    :global(.swiper-slide-prev) &,
    :global(.swiper-slide-next) & {
      opacity: 0.09;
    }
  }
}

.filter {
  margin-bottom: 20px;

  @media #{$tablet} {
    :global(.swiper-slide-prev) &,
    :global(.swiper-slide-next) & {
      opacity: 0;
    }
  }
}

.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 155px;
  padding: 20px;
  font-size: rem(16px);
  text-align: center;
  background-color: $white;
  box-shadow: 0 18px 18px 0 rgba(28, 32, 38, 0.05);
}

.item {
  margin-bottom: 20px;

  @media #{$tablet} {
    :global(.swiper-slide-prev) &,
    :global(.swiper-slide-next) & {
      display: none;
    }
  }
}

.button {
  margin-bottom: 20px;

  @media #{$tablet} {
    :global(.swiper-slide-prev) &,
    :global(.swiper-slide-next) & {
      display: none;
    }
  }
}
</style>
