<template>
  <a
    v-if="link"
    :href="link"
    :class="buttonClass"
    target="_blank"
    @click="handleClick"
  >
    <span><slot></slot></span>
    <Icon
      v-if="icon"
      :name="icon"
      :class="[$style.icon, $style[`icon_${icon}`]]"
    ></Icon>
  </a>

  <button v-else :class="buttonClass" @click="handleClick">
    <span><slot></slot></span>
    <Icon
      v-if="icon"
      :name="icon"
      :class="[$style.icon, $style[`icon_${icon}`]]"
    ></Icon>
  </button>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop(String) link!: string;
  @Prop(String) text!: string;
  @Prop(String) icon!: string;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: true }) primary!: boolean;
  @Prop(Boolean) secondary!: boolean;
  @Prop(Boolean) plain!: boolean;
  @Prop(Boolean) fullwidth!: boolean;
  @Prop(Boolean) square!: boolean;

  get buttonClass() {
    return {
      [this.$style.root]: true,
      [this.$style.disabled]: this.disabled,
      [this.$style.primary]: this.primary && !(this.secondary || this.plain),
      [this.$style.secondary]: this.secondary,
      [this.$style.plain]: this.plain,
      [this.$style.fullwidth]: this.fullwidth,
      [this.$style.square]: this.square,
      [this.$style.withIcon]: this.icon,
    };
  }

  @Emit('click')
  handleClick(event: MouseEvent) {
    return event;
  }
}
</script>

<style lang="scss" module>
.root {
  position: relative;
  display: block;
  width: auto;
  height: rem(42px);
  padding: 10px 1rem 12px;
  font-family: $font;
  font-size: rem(13px);
  line-height: 1.54;
  text-decoration: none;
  text-align: center;
  border: none;
  border-radius: 3px;
  transition: background-color 0.3s ease-out, border-color 0.3s ease-out,
    color 0.3s ease-out;
  cursor: pointer;

  &.primary {
    color: $white;
    fill: $white;
    background-color: $blue;

    &:hover {
      background-color: $dark-sky-blue;
    }
  }

  &.secondary {
    color: $black;
    fill: $black;
    background-color: $white;
    box-shadow: 0 18px 18px 0 rgba(28, 32, 38, 0.05);

    &:hover {
      color: $blue;
      fill: $blue;
    }
  }

  &.plain {
    color: $blue;
    fill: $blue;
    background-color: $pale-grey-two;
    border: 1px solid $light-blue-grey;

    &:hover {
      background-color: $pale-grey-three;
      border-color: $light-blue-grey-three;
    }
  }

  &.disabled {
    background-color: $pale-grey;
    border: 1px solid $light-grey;

    &:hover {
      background-color: $pale-grey;
      border-color: $light-grey;
    }
  }

  &.fullwidth {
    width: 100%;
  }

  &.square {
    height: auto;
    width: auto;
    padding: 7px;

    &.withIcon {
      padding: rem(15px);

      .icon {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  &.withIcon {
    padding-left: rem(48px);
    padding-right: rem(58px);
  }
}

.icon {
  position: absolute;
  top: 50%;
  right: rem(14px);
  display: block;
  font-size: rem(20px);
  fill: $warm-grey;
  transform: translate(0, -50%);

  &.icon_heart {
    font-size: rem(14px);
  }

  &.icon_heartHover {
    font-size: rem(14px);
  }

  &.icon_paperclip {
    font-size: rem(14px);
  }
}
</style>
