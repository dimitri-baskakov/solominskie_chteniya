<template>
  <q-page class="relative-position">
    <div
      class="row"
      :class="{
        'q-col-gutter-xl q-pa-xl': $q.screen.gt.sm,
        'q-pa-md': $q.screen.lt.md,
      }"
    >
      <div
        class="col-xs-12 col-sm-3 col-md-2 text-black text-mpsemibold text-h6 gt-sm"
      >
        <q-img src="/solomin-1.jpg"></q-img>
        <div>
          Соломин <br />
          Виталий Иванович
        </div>
        <div>(16.07.1928 – 26.04.2020)</div>
      </div>
      <div
        class="col-xs-12 row col-sm-12 col-md-2 text-black text-mpsemibold text-h6 justify-between items-center lt-md q-mb-lg"
      >
        <div class="col-xs-4 col-sm-3">
          <q-img src="/solomin-1.jpg"></q-img>
        </div>
        <div class="col-xs-8 col-sm-8 q-pa-sm">
          <div>
            Соломин <br />
            Виталий Иванович
          </div>
          <div>(16.07.1928 – 26.04.2020)</div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-10 text-white">
        <p
          class="text-body1 text-justify"
          :class="{ 'text-about': $q.screen.gt.sm }"
        >
          Российский специалист в области строительной механики зданий и
          сооружений, представитель Пижемской отрасли древнего северно-русского
          рода Соломиных. После окончания Уральского индустриального института
          работает в Челябинском политехническом институте (ныне — ЮУрГУ (НИУ)).
          С 1966 года заведующий кафедрой строительной механики, декан
          инженерно-строительного факультета (1965—68), проректор по научной
          работе (1978—83). Доктор технических наук (1976), профессор (1977),
          лауреат Государственной премии СССР (1987), почетный строитель России
          (1999), почетный строитель Урала (2012), заслуженный деятель науки и
          техники РСФСР (1991), действительный член РААСН (1993), РАЕН (1996),
          почетный гражданин Челябинска (2000), кавалер ордена «Знак Почета».
          Легенда для современных строителей Челябинска, многие из которых
          считают себя его учениками.
        </p>
        <div class="justify-between q-mt-xl row">
          <figure
            v-for="pp in authStore.personPhotos"
            :key="pp.id"
            class="col-auto q-ma-none"
          >
            <img
              :class="{
                mini: $q.screen.lt.md,
              }"
              :src="pp.src"
              class="photo-person"
              fit="cover"
              @click="openCarouselDialog(pp.id)"
            />
            <figcaption>{{ pp.description }}</figcaption>
          </figure>
        </div>
        <div class="q-mt-xl row">
          <div class="col-12 q-mt-lg">
            <p
              class="text-body1 text-justify"
              :class="{ 'text-about': $q.screen.gt.sm }"
            >
              Эти здания и сооружения стоят на фундаментных плитах, расчет и
              проектирование которых выполнены на кафедре строительной механики
              ЮУрГУ
            </p>
          </div>
        </div>
        <div class="justify-between row">
          <figure
            v-for="pp in authStore.projectPhotos"
            :key="pp.id"
            class="col-auto q-ma-none"
          >
            <!-- <div class="te xt-center"> -->
            <img
              :class="{
                mini: $q.screen.lt.md,
              }"
              :src="pp.src"
              class="photo-project"
              @click="openCarouselDialog(pp.id)"
            />
            <!-- eslint-disable vue/no-v-html -->
            <figcaption v-html="pp.description"></figcaption>
            <!-- eslint-enable -->
            <!-- </div> -->
          </figure>
        </div>
      </div>
      <q-dialog v-model="carouselDialog" full-width full-height>
        <q-carousel
          v-model="slide"
          :autoplay="4000"
          animated
          arrows
          class="bg-secondary shadow-1 rounded-borders full-width overflow-hidden"
          control-color="white"
          height="90vh"
          navigation
          navigation-icon="radio_button_unchecked"
          padding
          swipeable
          transition-next="slide-left"
          transition-prev="slide-right"
          width="100vw"
        >
          <q-carousel-slide
            v-for="image in images"
            :key="image.id"
            :name="image.id"
            class="column no-wrap flex-center"
          >
            <q-img fit="contain" :src="image.src"></q-img>
            <div class="q-mt-md text-center"></div>
          </q-carousel-slide>
          <template #control>
            <q-carousel-control
              position="top-right"
              :offset="[18, 18]"
              class="text-white rounded-borders"
            >
              <q-btn v-close-popup icon="close" flat round dense />
            </q-carousel-control>
          </template>
        </q-carousel>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useAuthStore } from 'stores/auth'

export default defineComponent({
  name: 'AboutSolominPage',
  setup() {
    const authStore = useAuthStore()
    const carouselDialog = ref(false)
    const images = ref([
      // {
      //   id: 1,
      //   src: "solomin-1.jpg",
      // },
      {
        id: 2,
        src: 'solomin-2.jpg',
      },
      {
        id: 3,
        src: 'solomin-3.jpg',
      },
      {
        id: 4,
        src: 'solomin-4.jpg',
      },
      {
        id: 5,
        src: 'project-1.jpg',
      },
      {
        id: 6,
        src: 'project-3.jpg',
      },
      {
        id: 7,
        src: 'project-2.jpg',
      },
      {
        id: 8,
        src: 'project-4.jpg',
      },
    ])
    const slide = ref(1)
    const openCarouselDialog = (s) => {
      slide.value = s
      carouselDialog.value = true
    }
    return {
      authStore,
      carouselDialog,
      images,
      slide,

      openCarouselDialog,
    }
  },
})
</script>

<style lang="sass">
.photo-person
  height: 24vw
  max-height: 490px
  width: auto
  min-height: 120px
  &.mini
    height: 29vw
.photo-project
  height: 13.5vw
  max-height: 280px
  width: auto
  &.mini
    height: 16vw
.text-about
  // width: 66vw
  max-width: 1550px
// .text-person-2
//   width: 16vw
// .text-person-3
//   width: 20vw
.text-person-4
  max-width: 40vw
  // width: 20vw
.text-project-5
  width: 18vw
.text-project-6
  width: 10vw
.text-project-7
  width: 16vw
.text-project-8
  width: 17vw
img.photo-person, img.photo-project
  cursor: pointer
figure
  display: table
figcaption
  display: table-caption
  caption-side: bottom
  vertical-align: top
</style>
