<template>
  <div :class="$style.root">
    <button :class="$style.button" @click="toggle">
      <Icon :class="$style.icon" :name="buttonIcon"></Icon>
    </button>

    <transition name="fade" v-on:after-leave="clear">
      <input
        v-model="query"
        v-show="isActive"
        ref="input"
        :class="$style.input"
        type="text"
        placeholder="Найти книгу"
        @input="handleChange"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';
import _debounce from 'lodash/debounce';

@Component
export default class Search extends Vue {
  isActive = false;
  query = '';

  get buttonIcon() {
    return this.isActive ? 'close' : 'loupe';
  }

  clear() {
    this.query = '';
    this.handleChange();
  }

  toggle() {
    this.isActive = !this.isActive;

    if (!this.isActive) {
      return;
    }

    this.$nextTick(() => {
      (this.$refs.input as HTMLInputElement).focus();
    });
  }

  @Emit('change')
  handleChange() {
    return this.query;
  }

  created() {
    this.handleChange = _debounce(this.handleChange, 500);
  }
}
</script>

<style module lang="scss">
.root {
  display: flex;
  justify-content: flex-end;
  height: rem(42px);
  border-radius: 3px;
}

.button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: rem(42px);
  width: rem(42px);
  padding: 0;
  border: none;
  border-radius: 3px;
  background: $white;
  fill: $warm-grey;
  transition: fill 0.2s ease-out;
  cursor: pointer;

  &:hover {
    fill: $gold;
  }
}

.icon {
  display: block;
  font-size: rem(20px);
  fill: $warm-grey;
}

.input {
  position: absolute;
  right: rem(42px);
  height: 100%;
  width: calc(100% - 2.625rem);
  padding: rem(10px) 16px rem(12px);
  font-size: rem(13px);
  line-height: 1.54;
  border: none;
  border-radius: 3px 0 0 3px;

  &::placeholder {
    color: $warm-grey;
  }
}
</style>
