<template>
  <div :class="$style.root">
    <span :class="$style.button">
      <Button square plain icon="heart"></Button>
    </span>
    <span :class="$style.counter">{{ likes | roundup }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
  @Prop(Number) likes!: number;
  @Prop(Number) dislikes!: number;
  @Prop({ default: false }) isDislikesShown!: boolean;
}
</script>

<style lang="scss" module>
.root {
  position: relative;
  display: flex;
  align-items: center;
}

.button {
}

.counter {
  margin-left: 7px;
  font-size: 13px;
  line-height: 1.54;
  color: $blue;
}
</style>
