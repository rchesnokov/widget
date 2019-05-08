<template>
  <div :class="$style.root">
    <List :tasks="tasks" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import TaskModule from '@/modules/task/TaskModule';
import List from '@/components/List/List.vue';
import { Task } from '@/modules/task/models/task';

@Component({
  components: {
    List,
  },
})
export default class Main extends Vue {
  taskModule = TaskModule;

  @Getter('getTasks') tasks!: Task[];

  created() {
    this.taskModule.fetchTasks();
    this.taskModule.fetchTasksMeta();
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
