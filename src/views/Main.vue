<template>
  <div :class="$style.root">
    <List :tasks="tasks" />
  </div>
</template>

<script lang="ts">
import * as R from 'ramda';
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

  async created() {
    if (!this.$auth.getToken()) {
      await this.$auth.createToken();
    }

    await Promise.all([
      this.taskModule.fetchTasks(),
      this.taskModule.fetchTasksMeta(),
    ]);

    R.forEach(
      (task) => this.taskModule.fetchTaskSolutions({ taskId: task }),
      this.taskModule.requested
    );
  }
}
</script>

<style lang="scss" module>
.root {
  padding: 20px;
}
</style>
