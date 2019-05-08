<template>
  <div :class="$style.root">
    <div :class="$style.main">
      <div
        :class="$style.image"
        :style="{
          backgroundImage: `url(${thumbnail})`,
        }"
      ></div>
      <div :class="$style.content">
        <div :class="$style.top">
          <div :class="$style.author">Мартин Риз, Кнут Харрис, Дж…</div>
          <div :class="$style.name">{{ solution.title }}</div>
        </div>
        <div :class="$style.bottom">
          <CardLikes
            :likes="solution.metrics.positive_votes"
            :dislikes="solution.metrics.negative_votes"
          />
          <Toggle @click="handleDetailsClick">Подробнее</Toggle>
        </div>
      </div>
    </div>

    <transition name="slide-down">
      <div v-show="isExpanded" :class="$style.additional">
        <hr />
        <p :class="$style.description" v-html="solution.content"></p>
        <p :class="$style.descriptionButtonMore">
          <CLink @click="handleDetailsClick">Читать все</CLink>
        </p>
        <Button
          :class="$style.fragmentButton"
          :link="'#'"
          plain
          fullwidth
          icon="loupe"
        >
          Читать отрывок
        </Button>
        <footer :class="$style.footer">
          <CLink>{{ solution.author.username }}</CLink>
          <span> • {{ solution.created | date }}</span>
        </footer>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import * as R from 'ramda';
import { Component, Prop, Vue } from 'vue-property-decorator';
import CardLikes from './CardLikes.vue';
import { Solution } from '@/modules/task/models/solution';

@Component({
  components: {
    CardLikes,
  },
})
export default class Card extends Vue {
  @Prop() solution!: Solution;

  isExpanded = false;

  get thumbnail() {
    return R.path(['attachments', 0, 'thumbs', 560], this.solution);
  }

  handleDetailsClick(event: MouseEvent) {
    this.isExpanded = !this.isExpanded;
  }
}
</script>

<style lang="scss" module>
.root {
  padding: 20px;
  background-color: $white;
  box-shadow: 0 18px 18px 0 rgba(28, 32, 38, 0.05);
  border-radius: 4px;
}

.main {
  display: flex;
  align-items: stretch;
}

.image {
  flex-shrink: 0;
  height: rem(115px);
  width: rem(75px);
  border: 1px solid $light-grey;
  border-radius: 3px;
  background-position: 50% 50%;
  background-size: contain;
  background-repeat: no-repeat;
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
}

.top {
  margin-bottom: rem(20px);
  cursor: pointer;

  &:hover {
    color: $blue;
  }
}

.author {
  margin-bottom: 2px;
  font-size: rem(13px);
  line-height: 1.54;
  color: $warm-grey;
}

.name {
  font-weight: 600;
  line-height: 1.32;
  transition: color 0.2s ease-out;
}

.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: rem(13px);
}

.additional {
  overflow: hidden;
  max-height: 500px;

  &:global(.slide-down-enter),
  &:global(.slide-down-leave-to) {
    max-height: 0;
  }

  hr {
    margin: 20px 0 12px;
    height: 1px;
    background-color: $light-grey;
    border: none;
  }
}

.description {
  overflow: hidden;
  max-height: rem(100px);
  margin: 0 auto;
  font-size: 13px;
  line-height: 1.54;
}

.descriptionButtonMore {
  margin-top: 0;
  font-size: 13px;
  line-height: 1.54;
}

.fragmentButton {
  margin-top: 1rem;
}

.footer {
  margin-top: 2rem;
  font-size: 13px;
  line-height: 1.54;
  color: $warm-grey;
}
</style>
