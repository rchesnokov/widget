<template>
  <div :class="$style.root" v-click-outside="hide">
    <div :class="$style.button" @click="open">
      <Icon name="share" />
    </div>

    <transition name="fade">
      <div v-if="isOpened" :class="$style.list">
        <div :class="$style.icons">
          <div :class="$style.button" @click="share(socialsType.FB)">
            <Icon name="social-fb" />
          </div>
          <div :class="$style.button" @click="share(socialsType.VK)">
            <Icon name="social-vkontakte" />
          </div>
          <div :class="$style.button" @click="share(socialsType.OK)">
            <Icon name="social-odnoklassniki" />
          </div>
          <div :class="$style.button" @click="share(socialsType.TW)">
            <Icon name="social-twitter" />
          </div>
          <div :class="$style.button" @click="share(socialsType.GP)">
            <Icon name="social-google" />
          </div>
          <div :class="$style.button" @click="share(socialsType.EMAIL)">
            <Icon name="social-mail" />
          </div>
        </div>

        <span :class="$style.link">
          <input
            type="text"
            :class="$style.input"
            :value="url"
            @click="selectLink"
          />
        </span>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Solution } from '@/modules/task/models/solution';
import { Task } from '@/modules/task/models/task';
import SharingModule from '@/modules/sharing/SharingModule';
import { SocialsType } from '@/modules/sharing/models/share';

@Component
export default class Sharing extends Vue {
  @Prop() solution!: Solution;
  @Prop() task!: Task;

  isOpened = false;
  socialsType = SocialsType;

  get config() {
    return {
      url: this.url,
      image: this.task.image,
      title: this.task.title,
      description: `Участвуйте в задании ${this.task.title} проекта ${
        this.task.project.title
      } на платформе КраудСпейс`,
    };
  }

  get url() {
    return (
      window.location.origin +
      `/project/${this.task.project.url}/task/${this.task.id}/solution/${
        this.solution.id
      }`
    );
  }

  open() {
    this.isOpened = true;
  }

  hide() {
    this.isOpened = false;
  }

  share(type: SocialsType) {
    SharingModule.share(this.config, type);
  }

  selectLink(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.setSelectionRange) {
      target.setSelectionRange(0, target.value.length);
    }
  }
}
</script>

<style lang="scss" module>
.root {
  position: relative;
}

.button {
  cursor: pointer;
  fill: $warm-grey;
  transition: fill 0.2s ease-out;

  &:hover {
    fill: $blue;
  }
}

.list {
  position: absolute;
  right: -1px;
  bottom: calc(100% + 10px);
  display: block;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: $white;
  box-shadow: 0 2px 20px 10px rgba(28, 32, 38, 0.05);

  &:after {
    content: '';
    position: absolute;
    top: 100%;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 8px 0 8px;
    border-color: $white transparent transparent transparent;
    box-shadow: 0 8px 18px 0 rgba(28, 32, 38, 0.05);
  }
}

.icons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: rem(20px);
}

.button {
  fill: $warm-grey;

  &:hover {
    fill: $blue;
  }
}

.input {
  padding: 4px 5px;
  color: $warm-grey;
  border: solid 1px $light-grey-two;
  border-radius: 3px;
}
</style>
