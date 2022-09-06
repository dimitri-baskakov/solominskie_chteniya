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
        class="col-xs-12 col-sm-12 col-md-2 text-secondary text-mpsemibold text-h6"
      >
        <p>Как пройти</p>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-10">
        <!-- :marker="[55.160855, 61.367671]" -->
        <t-gis-map
          :center="[55.16022084617933, 61.3697898387909]"
          :styles="{ width: 'auto', height: '400px' }"
          :markers="[
            {
              coords: [55.160855, 61.367671],
              label: 'Университетский комплекс «Сигма»',
              popup: 'Университетский комплекс «Сигма»',
            },
            {
              coords: [55.160429, 61.370316],
              label: 'Главный корпус «ЮУрГУ»',
              popup: 'Главный корпус «ЮУрГУ», аудитория 612',
            },
            {
              coords: [55.150444, 61.364045],
              label: 'Отель «ПаркСити»',
              popup: 'Лесопарковая, 6 - ParkCity, гостиничный комплекс',
            },
            {
              coords: [55.167535, 61.379403],
              label: 'Отель «Radisson Blu Hotel Chelyabinsk»',
              popup: 'Труда, 179 - Radisson Blu Hotel Chelyabinsk, отель',
            },
          ]"
          :zoom="17"
        ></t-gis-map>
      </div>
      <div class="col-xs-12 q-mt-xl"></div>
      <div
        class="col-xs-12 col-sm-12 col-md-2 text-secondary text-mpsemibold text-h6"
      >
        <p>Ближайшие гостиницы</p>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-10">
        <ul class="q-pl-md q-my-none">
          <li>Лесопарковая, 6 - Отель «ПаркСити»</li>
          <li>Труда, 179 - Отель «Radisson Blu Hotel Chelyabinsk»</li>
        </ul>
      </div>
      <div class="col-xs-12 q-mt-xl"></div>
      <div
        class="col-xs-12 col-sm-12 col-md-2 text-secondary text-mpsemibold text-h6"
      >
        <p>Карта территории кампуса</p>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-10">
        <q-img v-if="$q.screen.gt.sm" src="/campus.png"></q-img>
        <q-img v-else src="/campus-mobile.png"></q-img>
      </div>
      <div class="col-xs-12 q-mt-xl"></div>
      <div
        class="col-xs-12 col-sm-12 col-md-2 text-secondary text-mpsemibold text-h6"
      >
        <p>Карта этажей главного корпуса</p>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-10">
        <q-img v-if="$q.screen.gt.sm" src="/floor-map.svg"></q-img>
        <q-img v-else src="/floor-map-mobile.svg"></q-img>
      </div>
      <div class="col-xs-12 q-mt-xl"></div>
      <!-- <div class="col-xs-12 q-mt-xl"></div> -->
      <!-- <div class="col-xs-12 col-sm-12 col-md-10 offset-md-2 q-mt-xl">
        <q-img src="/path.jpg"></q-img>
      </div> -->
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import tGisMap from 'components/tGisMap.vue'

export default defineComponent({
  name: 'PathPage',
  components: {
    tGisMap,
  },
  setup() {
    const map = ref(null)
    onMounted(() => {})
    onBeforeUnmount(() => {
      if (map.value) {
        map.value.remove()
      }
    })

    return {
      map,
    }
  },
})
</script>

<style lang="sass"></style>
