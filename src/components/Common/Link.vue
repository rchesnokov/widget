<template>
  <span :class="$style.root" @click="emitClick">
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';

@Component
export default class Link extends Vue {
  @Emit('click')
  public emitClick(event: Event) {
    return event;
  }
}
</script>

<style lang="scss" module>
.root {
  color: $blue;
  transition: color 0.3s ease-out;
  cursor: pointer;

  &:hover {
    color: $dark-sky-blue;
  }
}
</style>
