import axios from 'axios'
import { Loading, LocalStorage } from 'quasar'
import { boot } from 'quasar/wrappers'
import { useAuthStore } from 'stores/auth'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const api = axios.create({
  baseURL: 'https://aci.susu.ru/api/solominskie-chteniya',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 5000,
})
// const api = axios.create({ baseURL: 'https://api.example.com' })

api.interceptors.request.use(
  (config) => {
    let token = LocalStorage.getItem('memberToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default boot(({ app, store }) => {
  // api.defaults.headers.common["Authorization"] = `Bearer ${store.token}`;
  // api.defaults.headers.common["Authorization"] = `Bearer ${LocalStorage.getItem('memberToken')}`;

  const authStore = useAuthStore(store)
  api.interceptors.request.use(
    function (config) {
      // authStore.loading = true
      Loading.show()
      // Do something before request is sent
      return config
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )
  api.interceptors.response.use(
    (response) => {
      // authStore.loading = false
      Loading.hide()
      if (response.data && response.data.access_token) {
        LocalStorage.set('memberToken', response.data.access_token)
        authStore.memberToken = response.data.access_token
      }
      return response
    },
    (error) => {
      // authStore.loading = false
      Loading.hide()
      let message = error.message
      if (
        error.message &&
        error.message.includes('401') &&
        LocalStorage.getItem('memberToken')
      ) {
        message = 'Вы не авторизованы. Сеанс завершен.'
        // Notify.create({
        //   color: "red-5",
        //   textColor: "white",
        //   icon: "error",
        //   message: "Выход из личного кабинета.",
        // });
        LocalStorage.remove('memberToken')
        authStore.memberToken = null
        // redirect({ path: "/" });
      } else if (error.message && error.message.includes('401')) {
        message = 'Неверный логин или пароль.'
      } else if (error.message && error.message.includes('50')) {
        message = 'Действие не выполнено. Попробуйте позднее.'
      }
      return Promise.reject(message)
    }
  )

  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { axios, api }
