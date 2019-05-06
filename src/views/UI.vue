<template>
  <div :class="$style.root">
    <h1>UI Kit</h1>

    <!-- Buttons -->
    <div :class="$style.block">
      <div :class="$style.label">
        Кнопки
      </div>
      <div :class="$style.content">
        <Button primary>Предложить книгу</Button>
        <Button secondary>Предложить книгу</Button>
        <Button plain icon="loupe">Предложить книгу</Button>
      </div>
    </div>

    <!-- Cards -->
    <div :class="$style.block">
      <div :class="$style.label">
        Карточка книги
      </div>
      <div :class="$style.content">
        <Card></Card>
      </div>
    </div>

    <!-- List -->
    <div :class="$style.block">
      <div :class="$style.label">
        Список карточек
      </div>
      <div :class="$style.content">
        <List />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card/Card.vue';
import List from '@/components/List/List.vue';

@Component({
  components: {
    Card,
    List,
  },
})
export default class UI extends Vue {}
</script>

<style lang="scss" module>
.root {
  margin: 0 80px;
  padding: 20px;

  @media #{$tablet} {
    margin: 0;
  }
}

h1 {
  margin: 0 0 20px;
  text-align: center;
}

.block {
  margin-bottom: 50px;
}

.label {
  margin-bottom: rem(16px);
  font-size: rem(10px);
  text-transform: uppercase;
  opacity: 0.41;
}

.content {
  & > * {
    margin-right: 10px;
  }

  & > :last-child {
    margin-right: 0;
  }
}
</style>
