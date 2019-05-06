<template>
  <div :class="$style.root">
    <List :tasks="tasks" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TaskModule from '@/modules/task/TaskModule';
import List from '@/components/List/List.vue';

@Component({
  components: {
    List,
  },
})
export default class Home extends Vue {
  taskModule = TaskModule;

  get tasks() {
    return this.taskModule.tasks;
  }

  get solutions() {
    return this.taskModule.solutions;
  }

  created() {
    this.taskModule.fetchTasks();
    this.taskModule.fetchTaskSolutions({ taskId: 9303 });
    this.taskModule.fetchTaskSolutions({ taskId: 9304 });
  }
}
</script>

<style lang="scss" module>
.root {
  padding: 20px;
}
</style>
