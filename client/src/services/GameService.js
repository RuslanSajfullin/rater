import Api from '@/services/Api'

export default {
  fetchGame () {
    return Api().get('game')
  },

  addGame (params) {
    return Api().post('add_game', params)
  },

  updateGame (params) {
    return Api().put('game/' + params.id, params)
  },

  getGame (params) {
    return Api().get('game/' + params.id)
  },

  deleteGame (id) {
    return Api().delete('game/' + id)
  }
}
