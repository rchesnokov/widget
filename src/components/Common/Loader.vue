<template>
  <div :class="$style.root">
    <Icon
      :class="[$style.icon, { [$style.icon_bottom]: bottom }]"
      name="bookLoader"
    ></Icon>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Loader extends Vue {
  @Prop({ default: false }) bottom!: boolean;
}
</script>

<style lang="scss" module>
.root {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: transparentize($pale-grey, 0.25);
}

.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 80px;
  width: 80px;
  font-size: 80px;
  transform: translate(-50%, -50%);

  &_bottom {
    top: auto;
    bottom: 15px;
  }
}
</style>
