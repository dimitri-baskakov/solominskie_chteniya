<template>
  <q-page class="relative-position">
    <div class="row q-ma-xl">
      <div class="col-xs-12 col-sm-3 col-md-2">
        <p class="text-mpsemibold text-h6">Секции:</p>
      </div>
      <div class="col-xs-12 col-sm-auto text-white text-body1">
        <ol class="q-pa-none">
          <li>Теория сооружений, конструкции, основания и фундаменты</li>
          <li>Материалы для современных конструкций и сооружений</li>
          <li>Организация и технология строительства</li>
          <li>Архитектура, градостроительство и дизайн</li>
          <li>Инженерные сети и системы</li>
        </ol>
        <q-btn
          class="q-mt-md q-px-xl q-py-md"
          color="black"
          label="Материалы докладов"
        ></q-btn>
        <q-btn
          class="q-mt-md q-ml-md q-px-xl q-py-md"
          color="black"
          label="Программа конференции"
        ></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProgramPage',
})
</script>

<style lang="sass"></style>
