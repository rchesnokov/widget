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
import socialFb from '@/assets/images/social-fb.svg';
import socialGoogle from '@/assets/images/social-google.svg';
import socialInstagram from '@/assets/images/social-instagram.svg';
import socialMail from '@/assets/images/social-mail.svg';
import socialOdnoklassniki from '@/assets/images/social-ok.svg';
import socialTwitter from '@/assets/images/social-twitter.svg';
import socialVkontakte from '@/assets/images/social-vk.svg';
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
  socialFb = 'social-fb',
  socialGoogle = 'social-google',
  socialInstagram = 'social-instagram',
  socialMail = 'social-mail',
  socialOdnoklassniki = 'social-ok',
  socialTwitter = 'social-twitter',
  socialVkontakte = 'social-vk',
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
    socialFb,
    socialGoogle,
    socialInstagram,
    socialMail,
    socialOdnoklassniki,
    socialTwitter,
    socialVkontakte,
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
  font-size: 1em;

  svg {
    display: block;
    height: 1em;
    width: 1em;
  }
}
</style>
