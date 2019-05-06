<template>
  <div :class="$style.root" v-click-outside="hide">
    <div
      :class="[$style.select, { [$style.select_active]: isOpened }]"
      @click="toggle"
    >
      <span>{{ selectedItem.label }}</span>
      <span :class="$style.selectMarker">
        <triangle :class="$style.selectIcon" />
      </span>
    </div>

    <transition name="slide-down">
      <div v-show="isOpened" :class="$style.list">
        <div
          v-for="item in restItems"
          :key="item.id"
          :class="$style.option"
          :data-id="item.id"
          @click="select"
        >
          {{ item.label }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import triangle from '@/assets/images/triangle.svg';

interface SelectItem {
  id: string;
  label: string;
}

@Component({
  components: {
    triangle,
  },
})
export default class Select extends Vue {
  @Prop({ type: Array, required: true }) list!: SelectItem[];
  @Prop(String) active!: string;

  isOpened = false;
  activeItemId = this.active;

  get selectedItem() {
    return (
      this.list.find((item) => item.id === this.activeItemId) || {
        id: '',
        label: '-',
      }
    );
  }

  get restItems() {
    return this.list.filter((item) => item.id !== this.activeItemId);
  }

  hide() {
    this.isOpened = false;
  }

  select(event: Event) {
    const id = (event.target as HTMLElement).dataset.id;
    this.activeItemId = id || '';
  }

  toggle() {
    this.isOpened = !this.isOpened;
  }
}
</script>

<style module lang="scss">
.root {
  position: relative;
  font-size: rem(13px);
  line-height: 1.54;
  color: $warm-grey;
}

.select {
  height: rem(42px);
  padding: rem(10px) rem(58px) rem(11px) 16px;
  background-color: $white;
  border-radius: 3px;
  transition: background-color 0.2s ease-out, color 0.2s ease-out;
  cursor: pointer;

  &:hover {
    background-color: $light-blue-grey;
    color: $blue;
  }

  &_active {
    background-color: $light-blue-grey;
    color: $blue;
  }
}

.selectMarker {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: rem(42px);
  width: rem(42px);
  background-color: $light-blue-grey;
  background-image: url('');
  border-radius: 0 3px 3px 0;
}

.selectIcon {
  height: rem(4px);
  width: rem(6px);
}

.list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: $white;
  box-shadow: 0 18px 18px 0 rgba(28, 32, 38, 0.05);
}

.option {
  position: relative;
  padding: rem(10px) 16px rem(12px);
  border-radius: 0 0 3px 3px;
  transition: color 0.3s ease-out;
  cursor: pointer;

  &:hover {
    color: $blue;
  }

  &:after {
    content: '';
    position: absolute;
    top: calc(100% - 1px);
    left: 16px;
    right: 16px;
    display: block;
    height: 1px;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.12);
  }

  &:last-child {
    &:after {
      display: none;
    }
  }
}
</style>
