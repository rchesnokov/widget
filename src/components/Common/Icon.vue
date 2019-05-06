<template>
  <span :class="$style.root">
    <component :is="name"></component>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import heart from '@/assets/images/heart.svg';
import loupe from '@/assets/images/loupe.svg';

enum Icons {
  heart = 'heart',
  loupe = 'loupe',
}

@Component({
  components: {
    heart,
    loupe,
  },
})
export default class Icon extends Vue {
  @Prop({ type: String, required: true })
  private readonly name!: Icons;
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
