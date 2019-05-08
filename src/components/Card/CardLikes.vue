<template>
  <div :class="$style.root">
    <span
      :class="$style.button"
      @mouseleave="handleBlur"
      @mouseenter="handleHover"
    >
      <Button square plain :icon="buttonIcon"></Button>
    </span>
    <span :class="$style.counter">{{ likes | roundup }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CardLikes extends Vue {
  @Prop(Number) likes!: number;
  @Prop(Number) dislikes!: number;
  @Prop({ default: false }) isDislikesShown!: boolean;

  isButtonHovered = false;

  get buttonIcon() {
    return this.isButtonHovered ? 'loupe' : 'heart';
  }

  handleBlur() {
    this.isButtonHovered = false;
  }

  handleHover() {
    this.isButtonHovered = true;
  }
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
