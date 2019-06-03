<template>
  <div :class="$style.root">
    <span
      v-tooltip.auto="{ content: tooltipContent, trigger: 'hover' }"
      :class="$style.button"
      @click="handleClick"
      @mouseleave="handleBlur"
      @mouseenter="handleHover"
    >
      <Button
        square
        plain
        :disabled="buttonDisabled"
        :icon="buttonIcon"
      ></Button>
    </span>
    <span :class="$style.counter">{{ likes | roundup }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as utils from '@/utils';
import { Getter } from 'vuex-class';
import { User } from '@/modules/task/models/meta';

@Component
export default class CardLikes extends Vue {
  @Prop(Number) likes!: number;
  @Prop(Number) dislikes!: number;
  @Prop({ default: false }) isUserAuthor!: boolean;
  @Prop({ default: false }) isDislikesShown!: boolean;
  @Prop({ default: false }) vote!: boolean;
  @Prop({ default: false }) votingDisabled!: boolean;
  @Prop({ default: null }) votesRemaining!: number;

  @Getter('user/getUser') user!: User;

  isButtonHovered = false;

  get buttonDisabled() {
    return (
      this.votingDisabled ||
      this.isUserAuthor ||
      (this.votesRemaining <= 0 && this.user)
    );
  }

  get buttonIcon() {
    if (this.votingDisabled || this.isUserAuthor) {
      return this.vote ? 'heartFilled' : 'heartDisabled';
    }

    if (!this.user) {
      return this.isButtonHovered ? 'heartHover' : 'heart';
    }

    return this.vote
      ? 'heartFilled'
      : this.votesRemaining <= 0
      ? 'heartDisabled'
      : this.isButtonHovered
      ? 'heartHover'
      : 'heart';
  }

  get tooltipContent() {
    if (this.votingDisabled) {
      return 'Голосование окончилось';
    }

    if (this.isUserAuthor) {
      return 'Нельзя голосовать за свое решение';
    }

    if (!this.user) {
      return '';
    }

    if (this.vote) {
      return 'Отменить голос';
    }

    const remains = utils.declension(this.votesRemaining, {
      one: 'Остался',
      few: 'Осталось',
      many: 'Осталось',
    });

    const votes = utils.declension(this.votesRemaining, {
      one: 'голос',
      few: 'голоса',
      many: 'голосов',
    });

    return this.votesRemaining === Infinity
      ? 'Отдать голос'
      : this.votesRemaining < 0
      ? 'Голосование недоступно'
      : this.votesRemaining === 0
      ? 'У вас не осталось голосов'
      : `${remains} ${this.votesRemaining} ${votes}`;
  }

  handleClick() {
    if (this.buttonDisabled) {
      return;
    }

    this.$emit('like');
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
  position: relative;
}

.counter {
  margin-left: 7px;
  font-size: 13px;
  line-height: 1.54;
  color: $gold;
}
</style>
