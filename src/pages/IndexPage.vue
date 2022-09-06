<template>
  <q-page class="relative-position">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    /> -->

    <div class="row q-my-xl">
      <!-- <q-img class="" src="/sign-1.svg"></q-img> -->
      <!-- <q-img class="" src="/logo.svg" /> -->
      <p>О конференции</p>
    </div>
    <div class="q-my-xl">
      <p>{{ authStore.eventDate }}</p>
      <p>Российская Федерация, г. Челябинск, проспект Ленина, д. 76</p>
      <p>Южно-Уральский государственный университет (НИУ)</p>
    </div>
    <div class="q-my-xl">
      <p>Организаторы конференции</p>
    </div>
    <div class="q-my-xl">
      <p>О конференции</p>
    </div>
    <div class="q-my-xl">
      <p>{{ authStore.eventDate }}</p>
      <p>Российская Федерация, г. Челябинск, проспект Ленина, д. 76</p>
      <p>Южно-Уральский государственный университет (НИУ)</p>
    </div>
    <div class="q-my-xl">
      <p>Организаторы конференции</p>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useAuthStore } from 'stores/auth'

export default defineComponent({
  name: 'IndexPage',

  setup() {
    const authStore = useAuthStore()

    return {
      authStore,
    }
  },
})
</script>

<style lang="sass">
.sign-number
  font: regilar 100% serif
  fill: red
  stroke: black
</style>
