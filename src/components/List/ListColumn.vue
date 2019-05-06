<template>
  <div :class="$style.root">
    <h2 :class="$style.title">{{ task.title }}</h2>

    <ListFilter :class="$style.filter" />

    <Card
      v-for="item in solutions"
      :class="$style.item"
      :key="item.id"
      :solution="item"
    />

    <Button secondary fullwidth :class="$style.button" @click="handleMoreClick">
      Показать еще
    </Button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Solution, Task } from '@/modules/task/TaskModels';
import TaskModule from '@/modules/task/TaskModule';
import Card from '@/components/Card/Card.vue';
import ListFilter from '@/components/List/ListFilter.vue';

@Component({
  components: {
    Card,
    ListFilter,
  },
})
export default class ListColumn extends Vue {
  @Prop(Object)
  task!: Task;

  page = 0;
  taskModule = TaskModule;

  get solutions(): Solution[] {
    return this.taskModule.solutions[this.task.id] || [];
  }

  handleMoreClick() {
    this.taskModule.fetchTaskSolutions({
      taskId: this.task.id,
      page: ++this.page,
    });
  }
}
</script>

<style module lang="scss">
.root {
  max-width: 432px;
  margin-bottom: -20px;

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
    padding: 0 40px;
    font-size: 20px;
    line-height: 1.25;
    text-align: center;
  }
}

.filter {
  margin-bottom: 20px;
}

.item {
  margin-bottom: 20px;
}

.button {
  margin-bottom: 20px;
}
</style>
