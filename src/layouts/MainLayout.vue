<template>
  <q-layout view="HHH lpr fff">
    <q-header elevated class="row">
      <q-space />
      <q-toolbar class="restricted-width">
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        /> -->

        <div class="gt-xs text-mpbold text-h5 text-no-wrap">
          {{ authStore.eventDate }}
        </div>

        <q-space />

        <!-- <q-btn-toggle
          :options="essentialLinks"
          flat
          no-caps
          stretch
          toggle-color="secondary"
          v-model="activeLink"
        /> -->
        <q-tabs
          v-model="activeLink"
          active-color="secondary"
          class="bg-primary text-white shadow-2"
          indicator-color="transparent"
          inline-label
          shrink
          stretch
        >
          <q-route-tab
            v-for="essentialLink in essentialLinks"
            :key="essentialLink.value"
            :label="essentialLink.label"
            :name="essentialLink.value"
            :to="essentialLink.to"
            exact
            flat
            no-caps
            stretch
            toggle-color="secondary"
          />
        </q-tabs>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
      <q-toolbar class="xs text-mpbold text-h5 text-no-wrap">
        {{ authStore.eventDate }}
      </q-toolbar>
      <q-space />
    </q-header>

    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> ИНФОРМАЦИЯ </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container
      :class="{ 'bg-secondary': ['2', '1'].includes(activeLink) }"
    >
      <div class="row justify-center">
        <div class="restricted-width relative-position">
          <div class="header-bg relative-position restricted-width row">
            <div class="col-xs-8 col-sm-4 q-py-lg q-pl-lg">
              <q-img class="" src="/sign-1.svg"></q-img>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-center">
        <router-view v-slot="{ Component }" class="restricted-width">
          <transition
            appear
            mode="out-in"
            :duration="{ enter: 1500, leave: 900 }"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </q-page-container>

    <q-footer class="bg-white footer">
      <div class="row justify-center bg-secondary">
        <div class="row restricted-width">
          <div class="bg-white col-xs-12 col-sm-8 col-md-4 q-px-md q-py-md">
            <q-img src="/susu-logo.svg"></q-img>
          </div>
          <div class="col-xs-7 col-sm-4 col-md-3 bg-secondary q-px-md q-pt-lg">
            <q-img src="/sign-1.svg"></q-img>
          </div>
          <div
            class="bg-secondary col-xs-12 col-sm-10 col-md-5 q-px-md q-py-md text-caption"
          >
            <div>
              <p class="q-my-none">
                © 2022 Архитектурно-строительный институт ЮУрГУ
              </p>
              <p class="q-my-none">Над сайтом работали:</p>
              <p class="q-my-none">
                Дизайн. Архитектурно-строительный институт.
              </p>
              <p class="q-my-none">
                Кафедра «Дизайн и изобразительные искусства». Доцент: Черных
                Д.Г.
              </p>
              <p class="q-my-none">
                Программирование. Высшая школа электроники и компьютерных наук
                ЮУрГУ,
              </p>
              <p class="q-my-none">
                кафедра системного программирования. Ассистент: Баскаков Д.М.
              </p>
            </div>
          </div>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { computed, defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from 'stores/auth'

const linksList = [
  {
    caption: '',
    label: 'О Соломине В.И.',
    to: '/about-solomin',
    value: '1',
  },
  {
    caption: '',
    label: 'Программа конференции',
    to: '/program',
    value: '2',
  },
  {
    caption: '',
    label: 'О конференции',
    // to: "/about-conference",
    to: '/',
    value: '3',
  },
  {
    caption: '',
    label: 'Организаторы',
    to: '/organizers',
    value: '4',
  },
  {
    caption: '',
    label: 'Комитет',
    to: '/commettee',
    value: '5',
  },
  {
    caption: '',
    label: 'Публикация',
    to: '/publication',
    value: '6',
  },
  {
    caption: '',
    label: 'Контакты',
    to: '/contacts',
    value: '7',
  },
  {
    caption: '',
    label: 'Как пройти',
    to: '/path',
    value: '8',
  },
]

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const route = useRoute()
    const path = computed(() => route.path)
    const authStore = useAuthStore()

    onMounted(() => {
      // if (authStore.authorized) {
      // }
    })

    return {
      activeLink: ref(linksList.find((ll) => ll.to == path.value).value || '2'),
      authStore,
      essentialLinks: linksList,
    }
  },
})
</script>

<style lang="sass">
.header-bg
  background-size: contain
  background-repeat: no-repeat
  background-image: url("./../../public/header-bg.png")
  body.screen--xs &
    background-image: url("./../../public/header-bg-mobile.png")
.footer
  // border-top: 1px solid black
.restricted-width
  width: 100%
  max-width: 1920px
</style>
