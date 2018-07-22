import Api from '@/services/Api'

export default {
  fetchGirlTypes () {
    return Api().get('girlType')
  },

  addGame (params) {
    return Api().post('add_game', params)
  },

  updateGame (params) {
    return Api().put('game/' + params.id, params)
  },

  deleteGame (id) {
    return Api().delete('game/' + id)
  }
}
