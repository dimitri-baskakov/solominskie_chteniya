import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import {
  // Loading,
  // Notify,
  LocalStorage,
} from 'quasar'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      eventDate: '8-9 ноября 2022',
      // loading: false,
      member: {},
      memberToken: LocalStorage.getItem('memberToken'),
      members: [],
      membersColumns: [],
      personPhotos: [
        // {
        //   id: 1,
        //   src: 'solomin-1.jpg',
        //   description: 'Соломин В. И.',
        // },
        {
          id: 2,
          src: 'solomin-2.jpg',
          description: '1995 г.',
        },
        {
          id: 3,
          src: 'solomin-3.jpg',
          description: '2009 г.',
        },
        {
          id: 4,
          src: 'solomin-4.jpg',
          description: 'Соломин В.И. с аспирантами, 1987 г.',
        },
      ],
      projectPhotos: [
        {
          id: 5,
          src: 'project-1.jpg',
          description: 'Здание гостиницы Аэрофлота, Москва',
        },
        {
          id: 6,
          src: 'project-3.jpg',
          description:
            'Дымовая труба Экбастуз<span class="xs">-</span>ской ГРЭС (Н = 440 м)',
        },
        // {
        //   id: 7,
        //   src: 'project-2.jpg',
        //   description: 'Здание гостиницы «Интурист», на ул. М.Горького, Москва',
        // },
        {
          id: 7,
          src: 'project-2.jpg',
          description: 'Здание по ул. Сони Кривой, 26, Челябинск',
        },
        {
          id: 8,
          src: 'project-4.jpg',
          description: 'Гостиницы–близнецы на Смоленской площади, Москва',
        },
      ],
    }
  },
  getters: {
    // authLoading: (state) => state.loading,
    authMember: (state) => state.member,
    authorized: (state) => !!state.memberToken,
    membersList: (state) => state.members,
    membersListColumns: (state) => state.membersColumns,
  },
  actions: {
    async login(loginForm) {
      let response = {}
      try {
        response = await api({
          data: loginForm,
          method: 'post',
          url: '/login',
        })
      } catch (error) {
        console.log('error', error)
        response = {
          status: 207,
          data: {
            message: error || 'Вход не выполнен.',
          },
        }
      }
      return response
    },

    async me() {
      let response = {}
      try {
        response = await api({
          method: 'get',
          url: '/members/me',
        })
        if (response.data && response.data.member) {
          this.member = { ...response.data.member }
        }
      } catch (error) {
        console.log('error', error)
        response = {
          status: 207,
          data: {
            message: error || 'Получить данные не удалось.',
          },
        }
      }
      return response
    },

    async updateMe() {
      let response = {}
      try {
        response = await api({
          data: this.member,
          method: 'put',
          url: '/members/me',
        })
      } catch (error) {
        console.log('error', error)
        response = {
          status: 207,
          data: {
            message: error || 'Изменить данные не удалось.',
          },
        }
      }
      return response
    },

    async register(registerForm) {
      let response = {}
      try {
        response = await api({
          data: registerForm,
          method: 'post',
          url: '/register',
        })
      } catch (error) {
        console.log('error', error)
        response = {
          status: 207,
          data: {
            message: error || 'Заявка не отправлена. Попробуйте позже.',
          },
        }
      }
      return response
    },

    async restore(restoreForm) {
      let response = {}
      try {
        response = await api({
          data: restoreForm,
          method: 'post',
          url: '/restore',
        })
      } catch (error) {
        console.log('error', error)
        response = {
          status: 207,
          data: {
            message: error || 'Запрос не отправлен. Попробуйте позже.',
          },
        }
      }
      return response
    },

    async logout() {
      let response = {}
      try {
        response = await api({
          method: 'post',
          url: '/logout',
        })
      } catch (error) {
        response = {
          status: 207,
          data: {
            message: error || 'Операция не выполнена.',
          },
        }
      }
      LocalStorage.remove('memberToken')
      this.memberToken = null
      this.member = { ...{} }
      return response
    },

    async getMembers() {
      let response = {}
      try {
        response = await api({
          method: 'get',
          url: '/members',
        })
        if (response.data && response.data.membersList) {
          this.members = [...response.data.membersList]
          this.membersColumns = [...response.data.membersListColumns]
        }
      } catch (error) {
        console.log('error', error)
        response = {
          status: 207,
          data: {
            message: error || 'Получить данные не удалось.',
          },
        }
      }
      return response
    },

    async toggleAdmin(adminId) {
      let response = {}
      try {
        response = await api({
          data: { adminId },
          method: 'post',
          url: '/members/toggle-admin',
        })
        if (response.data && response.data.toggleAdmin) {
          this.members.map((m) => {
            if (m.id === response.data.toggleAdmin.id) {
              m.role = response.data.toggleAdmin.role
            }
          })
        }
      } catch (error) {
        console.log('error', error)
        response = {
          status: 207,
          data: {
            message: error || 'Операция не выполнена.',
          },
        }
      }
      return response
    },

    addNewPaper() {
      this.member.papers.push({
        topic: '',
        path: '',
      })
    },

    async removePaper({ paper, index }) {
      let response = {}
      if (!paper.id) {
        this.member.papers.splice(index, 1)
        return response
      }
      try {
        response = await api({
          method: 'delete',
          url: `/members/remove-paper/${paper.id}`,
        })
        // if (response.data && response.data.removeId) {
        //   this.members.map((m) => {
        //     if (m.id === response.data.removeId) {
        //       m.role = response.data.toggleAdmin.role
        //     }
        //   })
        // }
        this.member.papers.splice(index, 1)
      } catch (error) {
        console.log('error', error)
        response = {
          status: 207,
          data: {
            message: error || 'Операция не выполнена.',
          },
        }
      }
      return response
    },

    async removePaperFile({ paper }) {
      let response = {}
      try {
        response = await api({
          data: { paper },
          method: 'post',
          url: '/members/remove-paper-file',
        })
        if (response.data) {
          this.member.papers.map((p) => {
            if (+p.id == +paper.id) {
              p.path = null
            }
          })
        }
      } catch (error) {
        console.log('error', error)
        response = {
          status: 207,
          data: {
            message: error || 'Операция не выполнена.',
          },
        }
      }
      return response
    },
  },
})
