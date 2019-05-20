<template>
  <span :class="$style.root">
    <transition name="fade" mode="out-in">
      <component :is="name"></component>
    </transition>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import bookLoader from '@/assets/images/book-loader.svg';
import close from '@/assets/images/close.svg';
import heart from '@/assets/images/heart.svg';
import heartHover from '@/assets/images/heart-hover.svg';
import heartFilled from '@/assets/images/heart-filled.svg';
import heartDisabled from '@/assets/images/heart-disabled.svg';
import loupe from '@/assets/images/loupe.svg';
import paperclip from '@/assets/images/paperclip.svg';
import share from '@/assets/images/share.svg';
import star from '@/assets/images/star.svg';
import starFilled from '@/assets/images/star-filled.svg';

enum Icons {
  bookLoader = 'book-loader',
  close = 'close',
  heart = 'heart',
  heartHover = 'heart-hover',
  heartFilled = 'heart-filled',
  heartDisabled = 'heart-disabled',
  loupe = 'loupe',
  paperclip = 'paperclip',
  share = 'share',
  star = 'star',
  starFilled = 'star-filled',
}

@Component({
  components: {
    bookLoader,
    close,
    heart,
    heartHover,
    heartFilled,
    heartDisabled,
    loupe,
    paperclip,
    share,
    star,
    starFilled,
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
