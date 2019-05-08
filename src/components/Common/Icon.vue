<template>
  <span :class="$style.root">
    <component :is="name"></component>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import bookLoader from '@/assets/images/book-loader.svg';
import heart from '@/assets/images/heart.svg';
import heartHover from '@/assets/images/heart-hover.svg';
import loupe from '@/assets/images/loupe.svg';

enum Icons {
  bookLoader = 'book-loader',
  heart = 'heart',
  heartHover = 'heart-hover',
  loupe = 'loupe',
}

@Component({
  components: {
    bookLoader,
    heart,
    heartHover,
    loupe,
  },
})
export default class Icon extends Vue {
  @Prop({ type: String, required: true })
  readonly name!: Icons;
}
</script>

<style lang="scss" module>
.root {
  height: 1em;
  width: 1em;
  font-size: 1rem;

  svg {
    display: block;
    height: 1em;
    width: 1em;
  }
}
</style>
