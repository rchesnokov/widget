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
          <CLink @click="handleDetailsClick">Подробнее</CLink>
        </div>
      </div>
    </div>

    <transition name="slide-down">
      <div v-show="isExpanded" :class="$style.additional">
        <p :class="$style.description" v-html="solution.content"></p>
        <p :class="$style.descriptionButtonMore">
          <CLink @click="handleDetailsClick">Читать все</CLink>
        </p>
        <Button :class="$style.fragmentButton" plain fullwidth icon="loupe">
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
import { Solution } from '@/modules/task/TaskModels';

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
  margin-top: 20px;
  padding-top: 12px;
  border-top: 1px solid $light-grey;
}

.description {
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
