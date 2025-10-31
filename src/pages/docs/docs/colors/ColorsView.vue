<script setup lang="ts">
import ColorCard from '@/pages/docs/docs/colors/components/ColorCard.vue'
import MultiColorCard from '@/pages/docs/docs/colors/components/MultiColorCard.vue'

const textColors = [
  { var: '--primary-text' },
  { var: '--regular-text' },
  { var: '--secondary-text' },
  { var: '--placeholder-text' },
  { var: '--disabled-text' },
]

const borderColors = [
  { var: '--darker-border' },
  { var: '--dark-border' },
  { var: '--base-border' },
  { var: '--light-border' },
  { var: '--lighter-border' },
  { var: '--extra-light-border' },
]

const bgColors = [
  { var: '--darker-fill' },
  { var: '--dark-fill' },
  { var: '--base-fill' },
  { var: '--light-fill' },
  { var: '--lighter-fill' },
  { var: '--extra-light-fill' },
  { var: '--blank-fill' },
]
const basicColors = [
  { var: '--basic-black' },
  { var: '--basic-white' },
  { var: '--transparent' },
  { var: '--page-background' },
  { var: '--base-background' },
  { var: '--overlay-background' },
]

const brandColor = {
  main: '--color-brand',
  collection: [
    '--color-brand-2',
    '--color-brand-3',
    '--color-brand-4',
    '--color-brand-5',
    '--color-brand-6',
    '--color-brand-7',
  ],
}
const secondaryColor = [
  {
    main: '--color-success',
    collection: [
      '--color-success-2',
      '--color-success-3',
      '--color-success-4',
      '--color-success-5',
      '--color-success-6',
      '--color-success-7',
    ],
  },
  {
    main: '--color-warning',
    collection: [
      '--color-warning-2',
      '--color-warning-3',
      '--color-warning-4',
      '--color-warning-5',
      '--color-warning-6',
      '--color-warning-7',
    ],
  },
  {
    main: '--color-danger',
    collection: [
      '--color-danger-2',
      '--color-danger-3',
      '--color-danger-4',
      '--color-danger-5',
      '--color-danger-6',
      '--color-danger-7',
    ],
  },
  {
    main: '--color-info',
    collection: [
      '--color-info-2',
      '--color-info-3',
      '--color-info-4',
      '--color-info-5',
      '--color-info-6',
      '--color-info-7',
    ],
  },
]
</script>

<template>
  <div class="docs-chapter docs-colors-view">
    <h2 class="chapter__title">Color</h2>
    <div class="chapter__description">
      Определенный набор палитр для выбора цветов, чтобы обеспечить единообразный внешний вид
      создаваемых вами продуктов.
    </div>

    <section class="main-color color-section">
      <h3 class="chapter__second-title">Main Color</h3>
      <div class="chapter__description">
        Основной цвет Element Plus - яркий и дружелюбный синий.
      </div>

      <div class="color-section__content">
        <MultiColorCard :main="brandColor.main" :collection="brandColor.collection" />
      </div>
    </section>
    <section class="secondary-color color-section">
      <h3 class="chapter__second-title">Secondary Color</h3>
      <div class="chapter__description">
        Помимо основного цвета, вам необходимо использовать разные цвета сцены в разных сценариях
        (например, опасный цвет указывает на опасную операцию).
      </div>
      <div class="color-section__content">
        <div class="col">
          <MultiColorCard
            :main="secondaryColor[0].main"
            :collection="secondaryColor[0].collection"
          />
          <MultiColorCard
            :main="secondaryColor[1].main"
            :collection="secondaryColor[1].collection"
          />
        </div>
        <div class="col">
          <MultiColorCard
            :main="secondaryColor[2].main"
            :collection="secondaryColor[2].collection"
          />
          <MultiColorCard
            :main="secondaryColor[3].main"
            :collection="secondaryColor[3].collection"
          />
        </div>
      </div>
    </section>
    <section class="neutral-color">
      <h3 class="chapter__second-title">Neutral Color</h3>
      <div class="chapter__description">
        Нейтральные цвета предназначены для текста, фона и рамок. Вы можете использовать различные
        нейтральные цвета для представления иерархической структуры.
      </div>
      <div class="color-section__content">
        <div class="col">
          <ColorCard :color-var="color.var" v-for="(color, key) in textColors" :key="key" />
        </div>
        <div class="col">
          <ColorCard :color-var="color.var" v-for="(color, key) in borderColors" :key="key" />
        </div>
        <div class="col">
          <ColorCard :color-var="color.var" v-for="(color, key) in bgColors" :key="key" />
        </div>
        <div class="col">
          <ColorCard :color-var="color.var" v-for="(color, key) in basicColors" :key="key" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '../docs-chapter' as *;

.docs-colors-view {
  @include docs-chapter();

  .color-section {
    &__content {
      display: flex;
      gap: 8px;

      .col {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    }
  }
}
</style>
