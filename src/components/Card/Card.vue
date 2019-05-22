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
        <a :class="$style.top" :href="link">
          <div :class="$style.author">{{ content.author }}</div>
          <div :class="$style.name">{{ content.title || solution.title }}</div>
        </a>
        <div :class="$style.bottom">
          <CardLikes
            :likes="solution.metrics.positive_votes"
            :dislikes="solution.metrics.negative_votes"
            :vote="vote"
            :votesRemaining="votesRemaining"
            @like="handleLikeClick"
          />
          <Toggle @click="handleDetailsClick">Подробнее</Toggle>
        </div>
      </div>
    </div>

    <transition name="slide-down">
      <div v-show="isExpanded" :class="$style.additional">
        <hr />

        <transition name="slide-down-in" mode="out-in">
          <div
            v-if="isDescriptionTrimmed && !isDescriptionExpanded"
            key="trimmed"
          >
            <p :class="$style.description" v-html="trimmedContent"></p>
            <p :class="$style.descriptionButtonMore">
              <CLink @click="handleReadAllClick">Читать все</CLink>
            </p>
          </div>

          <div v-else key="full">
            <p
              :class="$style.description"
              v-html="content.description || solution.content"
            ></p>
          </div>
        </transition>

        <Button
          v-if="preview"
          :class="$style.fragmentButton"
          :link="preview"
          plain
          fullwidth
          icon="paperclip"
        >
          Читать отрывок
        </Button>

        <footer :class="$style.footer">
          <span>
            <a :href="`/user/${solution.author.id}`" :class="$style.author">
              <CLink>{{ solution.author.username }}</CLink>
            </a>
            <span> • {{ solution.created | date }}</span>
          </span>

          <span :class="$style.actions">
            <Icon name="share" />
            <Icon name="star" />
          </span>
        </footer>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import * as R from 'ramda';
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import CardLikes from './CardLikes.vue';
import { Solution } from '@/modules/task/models/solution';
import { Task } from '@/modules/task/models/task';

@Component({
  components: {
    CardLikes,
  },
})
export default class Card extends Vue {
  @Prop() solution!: Solution;
  @Prop() task!: Task;
  @Prop() vote!: boolean;
  @Prop() votesRemaining!: number;

  isExpanded = false;
  isDescriptionExpanded = false;

  get content() {
    const fields = R.pathOr({}, ['fields'], this.solution.json_content);
    const getFieldValue = (path: string): string => {
      return R.pipe(
        R.find(R.propEq('header', path)),
        R.path(['value'])
      )(fields) as string;
    };

    return {
      author: getFieldValue('Автор'),
      description: getFieldValue('Описание'),
      publisher: getFieldValue('Издательство'),
      title: getFieldValue('Название'),
    };
  }

  get isDescriptionTrimmed() {
    const content = this.content.description || this.solution.content;
    return content && content.length! > 180;
  }

  get link() {
    return `/project/${this.task.project.path}/task/${this.task.id}/solution/${
      this.solution.id
    }`;
  }

  get preview() {
    return R.path(['attachments', 1, 'url'], this.solution) || '';
  }

  get thumbnail() {
    return R.path(['attachments', 0, 'thumbs', 560], this.solution) || '';
  }

  get trimmedContent() {
    return this.solution.content && `${this.solution.content.slice(0, 180)}...`;
  }

  handleDetailsClick(event: MouseEvent) {
    this.isExpanded = !this.isExpanded;
  }

  @Emit('like')
  handleLikeClick() {
    return { task: this.task, solution: this.solution };
  }

  handleReadAllClick() {
    this.isDescriptionExpanded = true;
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
  text-decoration: none;
  cursor: pointer;
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
  color: $black;
  transition: color 0.2s ease-out;

  .top:hover & {
    color: $blue;
  }
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  font-size: 13px;
  line-height: 1.54;
  color: $warm-grey;
}

.author {
  text-decoration: none;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    fill: $light-grey;
    transition: fill 0.2s ease-out;
    cursor: pointer;

    &:hover {
      fill: $blue;
    }

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
}
</style>
