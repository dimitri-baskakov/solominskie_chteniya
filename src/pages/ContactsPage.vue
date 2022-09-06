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
        class="col-xs-12 col-sm-12 col-md-2 text-secondary text-mpsemibold text-h6 q-pr-xl"
      >
        <p>Контактная информация</p>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-10 text-body1">
        <p class="q-my-none">
          Южно-Уральский государственный университет (НИУ ЮУрГУ):
        </p>
        <ul class="q-pl-md q-my-none">
          <li>
            Директор Архитектурно-строительного института (АСИ)
            <p class="q-my-none text-mpsemibold">Ульрих Дмитрий Владимирович</p>
            тел. <a href="tel:+73512679171">+7 (351) 267-91-71</a>, e-mail:
            <a href="mailto:ulrikhdv@susu.ru">ulrikhdv@susu.ru</a>
          </li>
          <li>
            Профессор кафедры «СПТС» НИУ ЮУрГУ
            <p class="q-my-none text-mpsemibold">
              Потапов Александр Николаевич
            </p>
            тел. <a href="tel:=79193437129">+7 (919) 343-71-29</a>, e-mail:
            <a href="mailto:potapov.alni@gmail.com">potapov.alni@gmail.com</a>,
            <a href="mailto:potapovan@susu.ru">potapovan@susu.ru</a>
          </li>
        </ul>
      </div>
      <div class="col-xs-12 q-mt-lg"></div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ContactsPage',
  setup() {
    return {}
  },
})
</script>

<style lang="sass"></style>
