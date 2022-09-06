<template>
  <q-page class="relative-position">
    <div
      class="row"
      :class="{
        'q-col-gutter-xl q-ma-none q-pr-xl': $q.screen.gt.sm,
        'q-pa-md': $q.screen.lt.md,
      }"
    >
      <div
        class="col-xs-12 col-sm-12 col-md-3 col-lg-2 text-secondary text-mpsemibold text-h6"
      >
        <p>Сроки предоставления материалов и публикация трудов конференции</p>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-9 col-lg-10 text-body1">
        <ul class="q-pl-md q-my-none">
          <li>
            Прием заявок на участие (по электронной форме) – до 29 августа 2022
            г.
          </li>
          <li>
            Прием полных текстов докладов (по электронной форме) – до 26
            сентября 2022 г.
          </li>
        </ul>
      </div>
      <div class="col-xs-12 q-mt-lg lt-md"></div>
      <div
        class="col-xs-12 col-sm-12 col-md-3 col-lg-2 text-secondary text-mpsemibold text-h6"
      >
        <p>Языки конференции</p>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-9 col-lg-10 text-body1">
        <div>русский и английский</div>
      </div>
      <div class="col-xs-12 q-mt-lg lt-md"></div>
      <div
        class="col-xs-12 col-sm-12 col-md-3 col-lg-2 text-secondary text-mpsemibold text-h6"
      >
        <p>Для участия в конференции необходимо</p>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-9 col-lg-10 text-body1">
        <div>
          <ol class="q-pl-md q-my-none">
            <li>
              Направить регистрационную форму участника конференции по
              электронной форме: (<a
                href="https://aci.susu.ru/public/solominskie-chteniya/publication"
                >https://aci.susu.ru/public/solominskie-chteniya/publication</a
              >)
              <!-- <a href="mailto:potapov.alni@gmail.com">potapov.alni@gmail.com</a> -->
            </li>
            <li>
              Предоставить материалы для публикации доклада по итогам
              конференции по рекомендованной изданием форме
            </li>
          </ol>
        </div>
      </div>
      <div class="col-xs-12 q-mt-lg lt-md"></div>
      <div
        class="col-xs-12 col-sm-12 col-md-3 col-lg-2 text-secondary text-mpsemibold text-h6"
      >
        <p>
          Регистрационная форма участника конференции и вход в личный кабинет
        </p>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-9 col-lg-10 text-body1">
        <div class="bg-secondary q-pa-md rounded-borders text-white">
          <q-tabs
            v-model="tab"
            :breakpoint="0"
            align="justify"
            class="bg-primary text-white shadow-2"
            dense
          >
            <!-- :loading="authStore.authLoading" -->
            <q-tab
              :disable="!!authStore.authorized"
              label="Регистрация"
              name="register"
            />
            <q-tab
              :disable="!!authStore.authorized"
              label="Вход"
              name="login"
            />
            <q-tab
              :disable="!!authStore.authorized"
              label="Восстановление пароля"
              name="restore"
            />
            <q-tab
              :disable="!authStore.authorized"
              label="Личный кабинет"
              name="cabinet"
            />
            <q-tab
              v-if="authStore.member.role == 'администратор'"
              :disable="!authStore.authorized"
              label="Список участников"
              name="membersList"
            />
            <q-tab
              :disable="!authStore.authorized"
              label="Выход"
              name="logout"
              @click="logout"
            />
          </q-tabs>
          <q-tab-panels v-model="tab" class="bg-secondary" animated>
            <q-tab-panel name="register">
              <q-form
                ref="registerFormRef"
                class="q-gutter-md"
                @reset="onReset"
                @submit="onSubmit"
                @validation-error="onValidationError"
              >
                <div class="row justify-between">
                  <div class="col-xs-6 row">
                    <div class="col-auto">
                      ФИО участника
                      <span class="text-caption">(полностью)</span> *
                    </div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="registerForm.name"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Обязательное поле',
                    ]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  />
                  <div class="col-xs-6 row">
                    <div class="col-auto">Организация *</div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="registerForm.organization"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Обязательное поле',
                    ]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  />
                  <div class="col-xs-6 row">
                    <div class="col-auto">Должность *</div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="registerForm.position"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Обязательное поле',
                    ]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  />
                  <div class="col-xs-6 row">
                    <div class="col-auto">
                      Ученая степень
                      <span class="text-caption">(при наличии)</span>
                    </div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="registerForm.academicDegree"
                    :rules="[(val) => true]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  />
                  <div class="col-xs-6 row">
                    <div class="col-auto">
                      Ученое звание
                      <span class="text-caption">(при наличии)</span>
                    </div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="registerForm.academicRank"
                    :rules="[(val) => true]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  />
                  <!-- <div class="col-xs-6">
                    Категория членства в РААСН (академик РААСН, член-корреспондент
                    РААСН, почетный член РААСН, иностранный член РААСН, советник
                    РААСН; при наличии)
                  </div>
                  <q-input
                    :rules="[
                      (val) => (val && val.length > 0) || 'Обязательное поле',
                    ]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                    v-model="registerForm.RaasnMembership"
                  /> -->
                  <div class="col-xs-6 row">
                    <div class="col-auto">Адрес *</div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="registerForm.address"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Обязательное поле',
                    ]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  />
                  <div class="col-xs-6 row">
                    <div class="col-auto">Телефон *</div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="registerForm.phone"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Обязательное поле',
                    ]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  />
                  <div class="col-xs-6 row">
                    <div class="col-auto">Факс</div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="registerForm.fax"
                    :rules="[(val) => true]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  />
                  <div class="col-xs-6 row">
                    <div class="col-auto">E-mail *</div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="registerForm.email"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Обязательное поле',
                    ]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                    type="email"
                  />
                  <div class="col-xs-6 row">
                    <div class="col-auto">Форма участия *</div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-select
                    v-model="registerForm.participation"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Обязательное поле',
                    ]"
                    :options="[
                      'очная с докладом',
                      'очная без доклада',
                      'заочная с докладом',
                    ]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  />
                  <div class="col-xs-6 row">
                    <div class="col-auto">
                      Тема доклада
                      <span class="text-caption"
                        >(при форме участия с докладом)</span
                      >
                      *
                    </div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="registerForm.topic"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Обязательное поле',
                    ]"
                    :disable="
                      !registerForm.participation ||
                      (!!registerForm.participation &&
                        registerForm.participation.includes('без доклада'))
                    "
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  />
                </div>
                <div class="text-center">
                  <q-btn
                    :disable="!!authStore.authorized"
                    class="q-px-xl"
                    color="primary"
                    label="Отправить заявку"
                    type="submit"
                  />
                </div>
              </q-form>
            </q-tab-panel>

            <q-tab-panel name="login">
              <q-form
                ref="loginFormRef"
                class="q-gutter-md"
                @reset="onLoginFormReset"
                @submit="onLoginFormSubmit"
              >
                <div class="row justify-between">
                  <div class="col-xs-6 row">
                    <div class="col-auto">E-mail</div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="loginForm.email"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Обязательное поле',
                    ]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  />
                  <div class="col-xs-6 row">
                    <div class="col-auto">Пароль</div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="loginForm.password"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Обязательное поле',
                    ]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  />
                </div>
                <div class="text-center">
                  <q-btn
                    :disable="!!authStore.authorized"
                    class="q-px-xl"
                    color="primary"
                    label="Войти"
                    type="submit"
                  />
                </div>
              </q-form>
            </q-tab-panel>

            <q-tab-panel name="restore">
              <q-form
                ref="restoreFormRef"
                class="q-gutter-md"
                @reset="onRestoreFormReset"
                @submit="onRestoreFormSubmit"
              >
                <div class="row justify-between">
                  <div class="col-xs-12 row q-mb-xl">
                    <div class="col-auto">
                      Пароль от личного кабинета придет на указанный при
                      регистрации e-mail. <br />
                      Если Вы не можете найти пароль или забыли пароль,
                      воспользуйтесь формой ниже:
                    </div>
                  </div>
                  <div class="col-xs-6 row">
                    <div class="col-auto">E-mail</div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="restoreForm.email"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Обязательное поле',
                    ]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  />
                </div>
                <div class="text-center">
                  <q-btn
                    :disable="!!authStore.authorized"
                    class="q-px-xl"
                    color="primary"
                    label="Восстановить"
                    type="submit"
                  />
                </div>
              </q-form>
            </q-tab-panel>

            <q-tab-panel name="cabinet">
              <q-form
                ref="cabinetFormRef"
                class="q-gutter-md"
                @submit="onCabinetFormSubmit"
                @validation-error="onValidationError"
              >
                <div class="row justify-between">
                  <div class="col-xs-6 row">
                    <div class="col-auto">
                      ФИО участника
                      <span class="text-caption">(полностью)</span> *
                    </div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="authStore.member.name"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Обязательное поле',
                    ]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  />
                  <div class="col-xs-6 row">
                    <div class="col-auto">Организация *</div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="authStore.member.organization"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Обязательное поле',
                    ]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  />
                  <div class="col-xs-6 row">
                    <div class="col-auto">Должность *</div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="authStore.member.position"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Обязательное поле',
                    ]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  />
                  <div class="col-xs-6 row">
                    <div class="col-auto">
                      Ученая степень
                      <span class="text-caption">(при наличии)</span>
                    </div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="authStore.member.academicDegree"
                    :rules="[(val) => true]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  />
                  <div class="col-xs-6 row">
                    <div class="col-auto">
                      Ученое звание
                      <span class="text-caption">(при наличии)</span>
                    </div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="authStore.member.academicRank"
                    :rules="[(val) => true]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  />
                  <div class="col-xs-6 row">
                    <div class="col-auto">Адрес *</div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="authStore.member.address"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Обязательное поле',
                    ]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  />
                  <div class="col-xs-6 row">
                    <div class="col-auto">Телефон *</div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="authStore.member.phone"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Обязательное поле',
                    ]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  />
                  <div class="col-xs-6 row">
                    <div class="col-auto">Факс</div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="authStore.member.fax"
                    :rules="[(val) => true]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  />
                  <div class="col-xs-6 row">
                    <div class="col-auto">E-mail *</div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="authStore.member.email"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Обязательное поле',
                    ]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                    type="email"
                  />
                  <div class="col-xs-6 row">
                    <div class="col-auto">Форма участия *</div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-select
                    v-model="authStore.member.participation"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Обязательное поле',
                    ]"
                    :options="[
                      'очная с докладом',
                      'очная без доклада',
                      'заочная с докладом',
                    ]"
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  />
                  <!-- <div class="col-xs-6 row">
                    <div class="col-auto">
                      Тема доклада
                      <span class="text-caption"
                        >(при форме участия с докладом)</span
                      >
                      *
                    </div>
                    <div class="gt-xs col row arrow-block">
                      <div class="arrow-right"></div>
                      <div class="horizontal"></div>
                    </div>
                  </div>
                  <q-input
                    v-model="authStore.member.topic"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Обязательное поле',
                    ]"
                    :disable="
                      !authStore.member.participation ||
                      (!!authStore.member.participation &&
                        authStore.member.participation.includes('без доклада'))
                    "
                    bg-color="white"
                    borderless
                    class="col-xs-6"
                    dense
                    lazy-rules
                    outlined
                  /> -->
                  <div
                    v-for="(paper, index) in authStore.member.papers"
                    :key="paper.id"
                    class="col-xs-12 row"
                  >
                    <div class="col-xs-6 row">
                      <div class="col-auto">
                        Тема доклада
                        <span class="text-caption"
                          >(при форме участия с докладом)</span
                        >
                        *
                      </div>
                      <div class="gt-xs col row arrow-block">
                        <div class="arrow-right"></div>
                        <div class="horizontal"></div>
                      </div>
                    </div>
                    <q-input
                      v-model="paper.topic"
                      :rules="[
                        (val) => (val && val.length > 0) || 'Обязательное поле',
                      ]"
                      :disable="
                        !authStore.member.participation ||
                        (!!authStore.member.participation &&
                          authStore.member.participation.includes(
                            'без доклада'
                          ))
                      "
                      bg-color="white"
                      borderless
                      class="col-xs-6"
                      dense
                      lazy-rules
                      outlined
                    >
                      <template #append>
                        <q-btn
                          class="q-px-none"
                          flat
                          @click="authStore.removePaper({ paper, index })"
                        >
                          <q-icon name="delete_forever" />
                          <q-tooltip
                            >Удалить эту тему доклада и загруженный
                            файл</q-tooltip
                          >
                        </q-btn>
                      </template>
                    </q-input>
                    <div class="col-xs-6 row">
                      <div class="col-auto">Загрузка текста доклада *</div>
                      <div class="gt-xs col row arrow-block">
                        <div class="arrow-right"></div>
                        <div class="horizontal"></div>
                      </div>
                    </div>
                    <div v-if="!!paper.path" class="col-xs-6">
                      <!-- <q-input
                        :model-value="paper.path.split('/').pop()"
                        bg-color="white"
                        borderless
                        class=""
                        clear-icon="close"
                        clearable
                        dense
                        lazy-rules
                        outlined
                      /> -->
                      <!-- <a
                        :href="'https://aci.susu.ru/' + paper.path"
                        target="_blank"
                        class="text-no-decoration"
                      > -->
                      <!-- <q-btn
                        flat
                        dense
                        :href="'https://aci.susu.ru/' + paper.path"
                        target="_blank"
                        class="text-no-decoration q-pa-none q-ma-none full-width"
                        type="a"
                      > -->
                      <q-input
                        :model-value="paper.path && paper.path.split('/').pop()"
                        bg-color="white"
                        class="q-mb-md cursor-pointer all-pointer-events"
                        dense
                        outlined
                        readonly
                        standout
                      >
                        <template #prepend>
                          <q-btn
                            class="q-px-none"
                            flat
                            dense
                            :href="'https://aci.susu.ru/' + paper.path"
                            target="_blank"
                            type="a"
                            @click.stop
                          >
                            <q-icon name="file_open" />
                            <q-tooltip>Смотреть загруженный файл</q-tooltip>
                          </q-btn>
                        </template>
                        <template #append>
                          <q-btn
                            class="q-px-none"
                            flat
                            @click.prevent="
                              authStore.removePaperFile({ paper })
                            "
                          >
                            <q-icon name="close" />
                            <q-tooltip>Удалить загруженный файл</q-tooltip>
                          </q-btn>
                        </template>
                      </q-input>
                      <!-- </q-btn> -->
                      <!-- </a> -->
                    </div>
                    <div v-else class="col-xs-6">
                      <q-uploader
                        :auto-upload="true"
                        :no-thumbnails="true"
                        :disable="
                          !authStore.member.participation ||
                          (!!authStore.member.participation &&
                            authStore.member.participation.includes(
                              'без доклада'
                            ))
                        "
                        :form-fields="[
                          { name: 'memberId', value: authStore.member.id },
                          { name: 'paperId', value: paper.id },
                          { name: 'topic', value: paper.topic },
                        ]"
                        :headers="[
                          {
                            name: 'Authorization',
                            value: `Bearer ${authStore.memberToken}`,
                          },
                        ]"
                        :multiple="false"
                        :url="'https://aci.susu.ru/api/solominskie-chteniya/members/upload'"
                        class="full-width text-black q-mb-md"
                        @start="() => {}"
                        @uploaded="
                          (info) => {
                            paper.path =
                              info &&
                              info.xhr &&
                              info.xhr.response &&
                              JSON.parse(info.xhr.response).path
                            onUploadedPaper(info)
                          }
                        "
                      >
                        <template #header="scope">
                          <div
                            class="row no-wrap items-center q-pa-sm q-gutter-xs"
                          >
                            <q-btn
                              v-if="scope.queuedFiles.length > 0"
                              icon="clear_all"
                              round
                              dense
                              flat
                              @click="scope.removeQueuedFiles"
                            >
                              <q-tooltip>Очистить список загрузки</q-tooltip>
                            </q-btn>
                            <q-btn
                              v-if="scope.uploadedFiles.length > 0"
                              icon="done_all"
                              round
                              dense
                              flat
                              @click="scope.removeUploadedFiles"
                            >
                            </q-btn>
                            <q-spinner
                              v-if="scope.isUploading"
                              class="q-uploader__spinner"
                            />
                            <div class="col">
                              <div class="q-uploader__title">Выберите файл</div>
                              <div class="q-uploader__subtitle">
                                {{ scope.uploadSizeLabel }} /
                                {{ scope.uploadProgressLabel }}
                              </div>
                            </div>
                            <q-btn
                              v-if="scope.canAddFiles"
                              type="a"
                              icon="add_box"
                              round
                              dense
                              flat
                              @click="scope.pickFiles"
                            >
                              <q-uploader-add-trigger />
                              <q-tooltip>Обзор файлов</q-tooltip>
                            </q-btn>
                            <q-btn
                              v-if="scope.canUpload"
                              dense
                              flat
                              icon="cloud_upload"
                              label="Отправить"
                              @click="scope.upload"
                            >
                              <!-- <q-tooltip>Отправить</q-tooltip> -->
                            </q-btn>

                            <q-btn
                              v-if="scope.isUploading"
                              icon="clear"
                              round
                              dense
                              flat
                              @click="scope.abort"
                            >
                              <q-tooltip>Отменить отправку</q-tooltip>
                            </q-btn>
                          </div>
                        </template>
                      </q-uploader>
                    </div>
                  </div>
                  <div class="col-xs-6 offset-6">
                    <q-btn
                      :disable="!authStore.authorized"
                      class="q-px-xl full-width"
                      color="white"
                      flat
                      label="Добавить еще одну тему доклада"
                      @click="authStore.addNewPaper()"
                    />
                  </div>
                  <!-- <div class="col-xs-6 offset-6">
                    <q-list
                      v-if="authStore.member && authStore.member.papers"
                      dense
                      bordered
                      padding
                      class="q-mt-md rounded-borders"
                    >
                      <q-item
                        v-for="paper in (authStore.member &&
                          authStore.member.papers) ||
                        []"
                        :key="paper.id"
                        v-ripple
                        :href="'https://aci.susu.ru/' + paper.path"
                        clickable
                        target="_blank"
                      >
                        <q-item-section class="ellipsis">
                          {{ paper.path && paper.path.split('/').pop() }}
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div> -->
                </div>
                <div class="text-center">
                  <q-btn
                    :disable="!authStore.authorized"
                    class="q-px-xl"
                    color="primary"
                    label="Сохранить"
                    type="submit"
                  />
                </div>
              </q-form>
            </q-tab-panel>

            <q-tab-panel name="membersList">
              <div>
                <!-- :grid="$q.screen.xs" -->
                <q-table
                  :columns="authStore.membersListColumns"
                  :filter="filterMembers"
                  :pagination="initialPagination"
                  :rows="authStore.membersList"
                  :visible-columns="membersListColumnsVisible"
                  dense
                  row-key="id"
                  selection="single"
                  title="Участники и администраторы конференции"
                >
                  <template #top-right="props">
                    <q-select
                      v-model="membersListColumnsVisible"
                      :display-value="$q.lang.table.columns"
                      :options="authStore.membersListColumns"
                      color="secondary"
                      dense
                      emit-value
                      map-options
                      multiple
                      option-value="name"
                      options-cover
                      options-dense
                      outlined
                      style="min-width: 50px"
                    />
                    <q-input
                      v-model="filterMembers"
                      class="q-pl-sm"
                      clearable
                      debounce="300"
                      dense
                      outlined
                      placeholder="Поиск"
                    >
                      <template #append>
                        <q-icon name="search" />
                      </template>
                    </q-input>
                    <q-btn
                      :icon="
                        props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'
                      "
                      class="q-ml-md"
                      dense
                      flat
                      round
                      @click="props.toggleFullscreen"
                    />
                  </template>
                  <!-- <template #body-selection="scope">
                    <q-btn
                      :outline="scope.row.role != 'администратор'"
                      @click="
                        scope.row.role != 'администратор'
                          ? toggleAdmin(scope.row.id)
                          : confirmToggleAdmin(scope.row.id)
                      "
                      color="white"
                      round
                      size="sm"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="top middle"
                        transition-hide="scale"
                        transition-show="scale"
                        >{{ scope.row.role }}</q-tooltip
                      >
                      <q-icon
                        :color="
                          scope.row.role == 'администратор'
                            ? 'secondary'
                            : 'grey'
                        "
                        :name="
                          scope.row.role != 'администратор'
                            ? 'person_outline'
                            : 'manage_accounts'
                        "
                      />
                    </q-btn>
                  </template> -->
                  <template #body="props">
                    <q-tr :props="props">
                      <q-td auto-width>
                        <q-btn
                          :color="
                            props.row.papers && !props.row.papers.length
                              ? 'grey-3'
                              : 'grey'
                          "
                          :icon="props.expand ? 'remove' : 'description'"
                          dense
                          round
                          size="sm"
                          @click="props.expand = !props.expand"
                        />
                        <q-btn
                          color="white"
                          flat
                          round
                          size="sm"
                          @click="
                            props.row.role != 'администратор'
                              ? toggleAdmin(props.row.id)
                              : confirmToggleAdmin(props.row.id)
                          "
                        >
                          <q-tooltip
                            anchor="top middle"
                            self="top middle"
                            transition-hide="scale"
                            transition-show="scale"
                            >{{ props.row.role }}</q-tooltip
                          >
                          <q-icon
                            :color="
                              props.row.role == 'администратор'
                                ? 'secondary'
                                : 'grey'
                            "
                            :name="
                              props.row.role != 'администратор'
                                ? 'person_outline'
                                : 'manage_accounts'
                            "
                          />
                        </q-btn>
                      </q-td>
                      <q-td
                        v-for="col in props.cols"
                        :key="col.name"
                        :props="props"
                      >
                        {{ col.value }}
                      </q-td>
                    </q-tr>
                    <q-tr v-show="props.expand" :props="props">
                      <q-td colspan="100%">
                        <div class="text-left">
                          <q-list
                            v-if="props.row.papers && props.row.papers.length"
                            dense
                            bordered
                            padding
                            class="rounded-borders"
                          >
                            <q-item v-ripple clickable>
                              {{ props.row.name }}, {{ props.row.phone }},
                              {{ props.row.email }},
                              {{ props.row.organization }}:
                            </q-item>
                            <q-item
                              v-for="paper in props.row.papers || []"
                              :key="paper.id"
                              v-ripple
                              :href="
                                paper.path
                                  ? 'https://aci.susu.ru/' + paper.path
                                  : null
                              "
                              clickable
                              :tag="paper.path ? 'a' : 'div'"
                              :target="paper.path ? '_blank' : null"
                            >
                              <q-item-section class="ellipsis">
                                <div>
                                  <q-icon
                                    class="align-center"
                                    :name="
                                      paper.path
                                        ? 'check_circle'
                                        : 'radio_button_unchecked'
                                    "
                                  />
                                  {{ paper.topic }}
                                  <q-icon name="file_open" />
                                  {{
                                    paper.path && paper.path.split('/').pop()
                                  }}
                                </div>
                              </q-item-section>
                            </q-item>
                          </q-list>
                          <q-list
                            v-else
                            dense
                            bordered
                            padding
                            class="rounded-borders"
                          >
                            <q-item v-ripple clickable>
                              {{ props.row.name }}, {{ props.row.phone }},
                              {{ props.row.email }},
                              {{ props.row.organization }}:
                            </q-item>
                            <q-item v-ripple clickable>
                              {{
                                !registerForm.participation ||
                                (!!registerForm.participation &&
                                  registerForm.participation.includes(
                                    'без доклада'
                                  ))
                                  ? registerForm.participation ||
                                    'участие без доклада'
                                  : 'тексты не предоставлены'
                              }}
                            </q-item>
                          </q-list>
                        </div>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
      <div class="col-xs-12 q-mt-lg lt-md"></div>
      <div
        class="col-xs-12 col-sm-12 col-md-3 col-lg-2 text-secondary text-mpsemibold text-h6"
      >
        <p>Требования к оформлению докладов и образец доклада</p>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-9 col-lg-10 text-body1">
        <div>
          <div class="q-pl-md q-my-none">
            <div class="q-mb-md">
              <p class="q-my-none text-mpsemibold">Скачать / посмотреть</p>
            </div>
            <div class="q-mb-md">
              <a
                class="q-my-none"
                href="https://aci.susu.ru/documents/solominskie-chteniya/2022/Образец доклада.pdf"
                target="_blank"
              >
                Образец доклада.pdf
              </a>
            </div>
            <div class="q-mb-md">
              <a
                class="q-my-none"
                href="https://aci.susu.ru/documents/solominskie-chteniya/2022/Требования к оформлению.pdf"
                target="_blank"
              >
                Требования к оформлению.pdf
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 q-mt-lg lt-md"></div>
      <div
        class="col-xs-12 col-sm-12 col-md-3 col-lg-2 text-secondary text-mpsemibold text-h6"
      >
        <p>
          Избранные доклады по решению Программного комитета конференции будут
          рекомендованы для опубликования в следующих рецензируемых научных
          журналах (представленных в виде статей)
        </p>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-9 col-lg-10 text-body1">
        <div>
          <ol class="q-pl-md q-my-none">
            <li class="q-mb-md">
              <p class="q-my-none text-mpsemibold">
                Вестник ЮУрГУ. Серия «Строительство и архитектура».
              </p>
              <p class="q-my-none">
                Челябинск: Изд. центр ЮУрГУ. Издание включено в Перечень ВАК при
                Минобрнауки России по специальностям:
              </p>
              <p class="q-my-none">
                2.1.1 Строительные конструкции, здания и сооружения (технические
                науки)
              </p>
              <p class="q-my-none">
                2.1.2 Основания и фундаменты, подземные сооружения (технические
                науки)
              </p>
              <p class="q-my-none">
                2.1.5 Строительные материалы и изделия (технические науки)
              </p>
              <p class="q-my-none">
                2.1.7 Технология и организация строительства (технические науки)
              </p>
              <p class="q-my-none">
                2.1.9 Строительная механика (технические науки)
              </p>
            </li>

            <li class="q-mb-md">
              <p class="q-my-none text-mpsemibold">
                Известия высших учебных заведений. «Строительство».
              </p>
              <p class="q-my-none">
                Новосибирск: Изд. НГАСУ. Издание включено в Перечень ВАК при
                Минобрнауки России по специальностям:
              </p>
              <p class="q-my-none">
                2.1.1 Строительные конструкции, здания и сооружения (технические
                науки)
              </p>
              <p class="q-my-none">
                2.1.2 Основания и фундаменты, подземные сооружения (технические
                науки)
              </p>
              <p class="q-my-none">
                2.1.3 Теплоснабжение, вентиляция, кондиционирование воздуха,
                газоснабжение и освещение (технические науки)
              </p>
              <p class="q-my-none">
                2.1.4 Водоснабжение, канализация, строительные системы охраны
                водных ресурсов (технические науки)
              </p>
              <p class="q-my-none">
                2.1.5 Строительные материалы и изделия (технические науки)
              </p>
              <p class="q-my-none">
                2.1.6 Гидротехническое строительство, гидравлика и инженерная
                гидрология (технические науки)
              </p>
              <p class="q-my-none">
                2.1.7 Технология и организация строительства (технические науки)
              </p>
              <p class="q-my-none">
                2.1.9 Строительная механика (технические науки)
              </p>
              <p class="q-my-none">
                2.1.10 Экологическая безопасность строительства и городского
                хозяйства (технические науки)
              </p>
              <p class="q-my-none">
                2.1.11 Теория и истории архитектуры, реставрация и реконструкция
                историко-архитектурного наследия (технические науки)
              </p>
              <p class="q-my-none">
                2.1.12 Архитектура зданий и сооружений. Творческие концепции
                архитектурной деятельности (технические науки)
              </p>
              <p class="q-my-none">
                2.1.13 Градостроительство. Планировка сельских населенных
                пунктов (технические науки)
              </p>
            </li>

            <li class="q-mb-md">
              <p class="q-my-none text-mpsemibold">
                Эксперт: теория и практика.
              </p>
              <p class="q-my-none">
                Тольятти: Изд. АНО «ИССТЭ». Издание включено в Перечень ВАК при
                Минобрнауки России
              </p>
              <p class="q-my-none">
                1.1.8 Механика деформируемого твердого тела
                (физико-математические науки)
              </p>
              <p class="q-my-none">
                2.1.1 Строительные конструкции, здания и сооружения (технические
                науки)
              </p>
              <p class="q-my-none">
                2.1.5 Строительные материалы и изделия (технические науки)
              </p>
              <p class="q-my-none">
                2.1.9 Строительная механика (технические науки)
              </p>
            </li>
            <!-- <li class="q-mb-md">
              <p class="q-my-none text-mpsemibold">
                ??? International Journal for Computational Civil and Structural
                Engineering.
              </p>
              <p class="q-my-none">
                Международный журнал по расчету гражданских и строительных
                конструкций. Издатель: ООО «Издательство АСВ» (Россия, г.
                Москва). Издание включено в Перечень ВАК при Минобрнауки России
              </p>
              <p class="q-my-none">
                1.1.8 Механика деформируемого твердого тела (технические науки)
              </p>
              <p class="q-my-none">
                1.2.2 Математическое моделирование численные методы и комплексы
                программ (технические науки)
              </p>
              <p class="q-my-none">
                2.1.1 Строительные конструкции, здания и сооружения (технические
                науки)
              </p>
              <p class="q-my-none">
                2.1.2 Основания и фундаменты, подземные сооружения (технические
                науки)
              </p>
              <p class="q-my-none">
                2.1.5 Строительные материалы и изделия (технические науки)
              </p>
              <p class="q-my-none">
                2.1.6 Гидротехническое строительство, гидравлика и инженерная
                гидрология (технические науки)
              </p>
              <p class="q-my-none">
                2.1.9 Строительная механика (технические науки)
              </p>
            </li> -->
          </ol>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, watch, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'stores/auth'

export default defineComponent({
  name: 'PublicationPage',
  setup() {
    const authStore = useAuthStore()
    const $q = useQuasar()
    const registerForm = ref({})
    const loginForm = ref({})
    const restoreForm = ref({})
    const cabinetFormRef = ref(null)
    const registerFormRef = ref(null)
    const loginFormRef = ref(null)
    const restoreFormRef = ref(null)
    const tab = authStore.authorized ? ref('cabinet') : ref('register')
    const filterMembers = ref('')
    const membersListColumnsVisible = ref([
      authStore.membersListColumns.map((mlc) => mlc.name),
    ])
    const initialPagination = ref({
      // descending: false,
      page: 1,
      // rowsNumber: xx if getting data from a server
      rowsPerPage: 15,
      // sortBy: 'id',
    })

    onMounted(async () => {
      if (authStore.authorized) {
        await me()
        if (authStore.authMember.papers.length == 0) {
          authStore.addNewPaper()
        }
      }
    })

    const onLoginFormReset = () => {
      // loginForm.value.email = null;
      // loginForm.value.password = null;
      loginForm.value = { ...{} }
      loginFormRef.value.resetValidation()
    }

    const onRestoreFormReset = () => {
      // restoreForm.value.email = null;
      // restoreForm.value.password = null;
      restoreForm.value = { ...{} }
      restoreFormRef.value.resetValidation()
    }

    const onReset = () => {
      // registerForm.value.name = null;
      // registerForm.value.organization = null;
      // registerForm.value.position = null;
      // registerForm.value.academicDegree = null;
      // registerForm.value.academicRank = null;
      // registerForm.value.address = null;
      // registerForm.value.phone = null;
      // registerForm.value.fax = null;
      // registerForm.value.email = null;
      // registerForm.value.participation = null;
      // registerForm.value.topic = null;
      registerForm.value = { ...{} }
      registerFormRef.value.resetValidation()
    }

    const onValidationError = () => {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'error',
        message: 'Заполните все обязательные поля.',
      })
    }

    const onCabinetFormSubmit = async () => {
      let response = await authStore.updateMe()
      if (+response.status == 200) {
        $q.notify({
          color: 'green-7',
          textColor: 'white',
          icon: 'task',
          message:
            (response.data && response.data.message) || 'Данные сохранены.',
        })
        // tab.value = "cabinet";
      } else {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message:
            (response.data && response.data.message) ||
            'Данные сохранить не удалось. Попробуйте позже.',
        })
      }
    }

    const me = async () => {
      let response = await authStore.me()
      if (+response.status == 200) {
        // no actions
      } else {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message:
            (response.data && response.data.message) ||
            'Данные получить не удалось.',
        })
        tab.value = 'logout'
      }
    }

    const onLoginFormSubmit = async () => {
      let response = await authStore.login(loginForm.value)
      if (+response.status == 200) {
        $q.notify({
          color: 'green-7',
          textColor: 'white',
          icon: 'task',
          message:
            (response.data && response.data.message) ||
            'Вы вошли в личный кабинет участника конференции.',
        })
        onLoginFormReset()
        tab.value = 'cabinet'
      } else {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message:
            (response.data && response.data.message) ||
            'Вход не выполнен. Попробуйте позже.',
        })
      }
    }

    const onRestoreFormSubmit = async () => {
      let response = await authStore.restore(restoreForm.value)
      if (+response.status == 200) {
        $q.notify({
          color: 'green-7',
          textColor: 'white',
          icon: 'task',
          message:
            (response.data && response.data.message) ||
            'Запрос отправлен. Пароль придет на Ваш E-mail.',
        })
        loginForm.value.email = restoreForm.value.email
        onRestoreFormReset()
        tab.value = 'login'
      } else {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message:
            (response.data && response.data.message) ||
            'Запрос не выполнен. Попробуйте позже.',
        })
      }
    }

    const onSubmit = async () => {
      let response = await authStore.register(registerForm.value)
      // console.log("response", response);
      if (+response.status == 200) {
        $q.notify({
          color: 'green-7',
          textColor: 'white',
          icon: 'task',
          message:
            (response.data && response.data.message) ||
            'Заявка отправлена. Пароль придет на Ваш email.',
        })
        loginForm.value.email = registerForm.value.email
        onReset()
        tab.value = 'login'
      } else {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message:
            (response.data && response.data.message) ||
            'Заявка не отправлена. Попробуйте позже.',
        })
      }
    }

    const logout = async () => {
      let response = await authStore.logout()
      // console.log("response", response);
      if (+response.status == 200) {
        $q.notify({
          color: 'green-7',
          textColor: 'white',
          icon: 'task',
          message: response.message || 'Вы вышли из личного кабинета.',
        })
        tab.value = 'login'
      } else {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message:
            (response.data && response.data.message) ||
            'Операция не выполнена. Попробуйте позже.',
        })
      }
    }

    const getMembers = async () => {
      let response = await authStore.getMembers()
      if (+response.status == 200) {
        membersListColumnsVisible.value = authStore.membersListColumns.map(
          (mlc) => mlc.name
        )
      } else {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message:
            (response.data && response.data.message) ||
            'Данные получить не удалось.',
        })
        tab.value = 'cabinet'
      }
    }

    const confirmToggleAdmin = (adminId) => {
      $q.dialog({
        title: 'Подтверждение',
        message: 'Вы действительно хотите снять полномочия администратора?',
        cancel: true,
        persistent: true,
      })
        .onOk(async () => {
          await toggleAdmin(adminId)
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
    }

    const toggleAdmin = async (adminId) => {
      let response = await authStore.toggleAdmin(adminId)
      if (+response.status == 200 && response.data.toggleAdmin) {
        $q.notify({
          color: 'green-7',
          textColor: 'white',
          icon: 'task',
          message:
            (response.data && response.data.message) || 'Операция выполнена.',
        })
      } else {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message:
            (response.data && response.data.message) ||
            'Операция не выполнена.',
        })
      }
    }

    const onUploadedPaper = (info) => {
      const path =
        info &&
        info.xhr &&
        info.xhr.response &&
        JSON.parse(info.xhr.response).path
      // authStore.member.papers.push({ path })
      if (path) {
        $q.notify({
          color: 'green-7',
          textColor: 'white',
          icon: 'task',
          message: 'Файл загружен.',
        })
      }
    }

    watch(tab, (newVal /* oldVal */) => {
      if (newVal == 'cabinet' && authStore.authorized) {
        me()
      } else if (newVal == 'membersList' && authStore.authorized) {
        getMembers()
      }
    })

    return {
      authStore,
      cabinetFormRef,
      filterMembers,
      initialPagination,
      loginForm,
      loginFormRef,
      restoreForm,
      restoreFormRef,
      membersListColumnsVisible,
      registerForm,
      registerFormRef,
      tab,

      confirmToggleAdmin,
      getMembers,
      logout,
      me,
      onCabinetFormSubmit,
      onLoginFormReset,
      onLoginFormSubmit,
      onRestoreFormReset,
      onRestoreFormSubmit,
      onReset,
      onSubmit,
      onUploadedPaper,
      onValidationError,
      toggleAdmin,
    }
  },
})
</script>
