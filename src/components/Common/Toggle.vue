<template>
  <span :class="$style.root" @click="handleClick">
    <CLink v-if="!isExpanded" :class="$style.text">Подробнее</CLink>
    <CLink v-else :class="$style.text">Скрыть</CLink>
    <triangle :class="[$style.icon, { [$style.icon_reverse]: isExpanded }]" />
  </span>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';
import triangle from '@/assets/images/triangle.svg';

@Component({
  components: {
    triangle,
  },
})
export default class Toggle extends Vue {
  isExpanded = false;

  @Emit('click')
  handleClick() {
    this.isExpanded = !this.isExpanded;
  }
}
</script>

<style lang="scss" module>
.root {
  white-space: nowrap;
}

.text {
  display: inline-block;
}

.icon {
  display: inline-block;
  vertical-align: middle;
  height: rem(5px);
  width: rem(7px);
  margin-left: 5px;

  &_reverse {
    transform: rotate(180deg);
  }
}
</style>
