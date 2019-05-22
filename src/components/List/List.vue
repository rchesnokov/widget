<template>
  <div :class="$style.root">
    <swiper :class="$style.slider" :options="swiperOptions">
      <swiper-slide v-for="item in tasks" :key="item.id" :class="$style.slide">
        <ListColumn :task="item" />
      </swiper-slide>

      <div
        :class="[$style.navbutton, $style.navbutton_prev, 'button-prev']"
        slot="button-prev"
      >
        <arrow :class="$style.icon" />
      </div>
      <div
        :class="[$style.navbutton, $style.navbutton_next, 'button-next']"
        slot="button-next"
      >
        <arrow :class="$style.icon" />
      </div>
    </swiper>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Task } from '@/modules/task/models/task';
import ListColumn from '@/components/List/ListColumn.vue';
import arrow from '@/assets/images/arrow.svg';

@Component({
  components: {
    arrow,
    ListColumn,
  },
})
export default class List extends Vue {
  @Prop(Array)
  tasks!: Task[];

  swiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 65,
    centerInsufficientSlides: true,
    watchOverflow: true,
    navigation: {
      nextEl: '.button-next',
      prevEl: '.button-prev',
    },
    breakpoints: {
      1280: {
        slidesPerView: 'auto',
        centeredSlides: true,
        centerInsufficientSlides: false,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
  };
}
</script>

<style module lang="scss">
.root {
  position: relative;
}

.slider {
  position: relative;

  &:after,
  &:before {
    content: '';
    position: absolute;
    z-index: 2;
    top: 0;
    bottom: 0;
    display: block;
    height: 100%;
    width: 20%;
    pointer-events: none;

    @media #{$desktop} {
      width: 10%;
    }

    @media #{$tablet} {
      width: 20px;
    }
  }

  &:after {
    left: 0;
    background: linear-gradient(to right, $pale-grey, rgba(244, 244, 245, 0));

    @media #{$tablet} {
      height: 50px;
    }
  }

  &:before {
    right: 0;
    background: linear-gradient(to left, $pale-grey, rgba(244, 244, 245, 0));

    @media #{$tablet} {
      height: 50px;
    }
  }
}

.slide {
  position: relative;
  width: auto !important;

  @media #{$tablet} {
    width: 100% !important;

    &:global(.swiper-slide-active) {
      z-index: 1;
    }

    &:global(.swiper-slide-prev) {
      right: calc(-40% - 60px);
    }

    &:global(.swiper-slide-next) {
      left: calc(-40% - 60px);
    }
  }
}

.navbutton {
  position: absolute;
  z-index: 3;
  top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 31px;
  width: 31px;
  background-color: $blue;
  border-radius: 100%;
  fill: $white;
  transition: background-color 0.2s ease-out, opacity 0.3s ease-out;
  cursor: pointer;

  @media #{$tablet} {
    top: 26px;
  }

  &:hover {
    background-color: $dark-sky-blue;
  }

  &_prev {
    left: 0;
    transform: rotate(180deg);
  }

  &_next {
    right: 0;
  }

  &:global(.swiper-button-disabled) {
    opacity: 0;
  }
}

.icon {
  display: block;
  height: 12px;
  width: 12px;
}
</style>