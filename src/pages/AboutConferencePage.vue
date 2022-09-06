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
        class="col-xs-12 col-sm-12 col-md-9 offset-md-3 text-secondary text-body1"
      >
        <p>
          I Международная научная конференция «Соломинские чтения» проводится в
          рамках Плана мероприятия по подготовке и проведению 70-летнего Юбилея
          Архитектурно-строительного института Южно-Уральского государственного
          университета (НИУ ЮУрГУ).
        </p>
      </div>
      <div
        class="col-xs-12 col-sm-12 col-md-3 text-secondary text-mpsemibold text-h6 q-pr-xl"
      >
        <p>Научное направление конференции «Соломинские чтения»</p>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-9 text-body1">
        <ol class="q-pl-md q-my-none">
          <li>
            Нелинейные модели материалов, конструкций зданий и сооружений,
            оснований и фундаментов.
          </li>
          <li>Материалы и конструкции при нестационарных процессах.</li>
          <li>
            Моделирование нелинейных задач при статических и динамических
            воздействиях.
          </li>
          <li>
            Численные и аналитические методы анализа конструкций, оснований и
            фундаментов.
          </li>
          <li>
            Возможности современных программных средств при анализе и
            проектировании строительных объектов.
          </li>
          <li>
            Информационное и математическое моделирование в строительстве.
          </li>
          <li>Опыт расчета и проектирования зданий и сооружений.</li>
          <li>
            Дискуссии. Методические аспекты применения научных исследований и
            современных программных комплексов в учебном процессе. Проблемы и
            перспективы математического и информационного моделирования
            вычислительных методов прикладной механики в подготовке будущих
            инженеров-строителей и научных работников.
          </li>
        </ol>
      </div>
      <div class="col-xs-12 q-mt-lg"></div>
      <div
        class="col-xs-12 col-sm-12 col-md-3 text-secondary text-mpsemibold text-h6 q-pr-lg"
      >
        <p>Информационное сопровождение</p>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-9 text-body1">
        <p class="q-ma-none">
          Официальный сайт Южно-Уральского государственного университета (НИУ
          ЮУрГУ)
        </p>
        <ul class="q-pl-md q-my-none">
          <li>
            Сайт университета:
            <a target="_blank" href="https://susu.ru">www.susu.ru</a>
          </li>
          <li>
            <!-- Почта университета: <a href="mailto:info@susu.ru">info@susu.ru</a> -->
            Почта конференции:
            <a href="mailto:aci_susu@mail.ru">aci_susu@mail.ru</a>
          </li>
        </ul>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutConferencePage',
})
</script>

<style lang="sass"></style>
