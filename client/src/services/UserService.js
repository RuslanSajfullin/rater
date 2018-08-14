import Api from '@/services/Api';

export default {
  fetchUser() {
    return Api().get('user')
  },

  addUser (params) {
    return Api().post('user_add', params)
  },

  signIn (params) {
    return Api().post('signin', params)
  }
}
