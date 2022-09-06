<template>
  <q-page class="relative-position">
    <div
      class="row"
      :class="{
        'q-ma-xl': $q.screen.gt.sm,
        'q-ma-md': $q.screen.lt.md,
      }"
    >
      <div
        class="col-xs-12 col-sm-12 col-md-2 text-secondary text-mpsemibold text-h6 q-pr-md"
      >
        <p>Организаторы конференции</p>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-10 text-body1">
        <div class="row q-col-gutter-lg items-start justify-start">
          <img
            v-for="organizer in organizers"
            :key="organizer.id"
            :src="organizer.src"
            class="col-auto organizers-logo"
            fit="contain"
          />
        </div>
        <ul class="q-pl-md q-my-none q-mt-lg">
          <li v-for="organizer in organizers" :key="organizer.id">
            {{ organizer.name }}
          </li>
        </ul>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

const organizers = [
  {
    name: 'Российская академия архитектуры и строительных наук (РААСН)',
    id: 1,
    src: 'raasn.jpg',
  },
  {
    name: 'Федеральное бюджетное автономное образовательное учреждение высшего образования «Южно-Уральский государственный университет(национальный исследовательский университет)»',
    id: 2,
    src: 'susu.jpg',
  },
  {
    name: 'Федеральное государственное бюджетное образовательное учреждение высшего образования «Национальный исследовательский Московский государственный строительный университет (НИУ МГСУ)»',
    id: 3,
    src: 'mgsu.png',
  },
  {
    name: 'Федеральное государственное бюджетное образовательное учреждение высшего образования «Томский государственный архитектурно-строительный университет» (ТГАСУ)',
    id: 4,
    src: 'tgasu.jpg',
  },
  {
    name: 'Федеральное бюджетное автономное образовательное учреждение высшего образования Уральский государственный архитектурно-художественный университет',
    id: 5,
    src: 'urgahu.jpg',
  },
  {
    name: 'ООО «СПЕЦВЫСОТСТРОЙПРОЕКТ»',
    id: 6,
    src: 'svsp.jpg',
  },
  {
    name: 'Федеральное бюджетное автономное образовательное учреждение высшего образования Уральский Федеральный университет имени первого президента России Б.Н. Ельцина',
    id: 7,
    src: 'ufu.png',
  },
]

export default defineComponent({
  name: 'OraganizersPage',
  setup() {
    return {
      organizers,
    }
  },
})
</script>

<style lang="sass">
.organizers-logo
  height: 8vw
  max-height: 150px
  min-height: 70px
</style>
