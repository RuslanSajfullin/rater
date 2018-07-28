import Api from '@/services/Api'

export default {
  fetchGirlTypes () {
    return Api().get('girlTypes')
  },

  fetchGirls () {
    return Api().get('girls')
  },

  addGirl (params) {
    return Api().post('addGirl', params)
  },

  updateGirl (id) {
    return Api().put('girl/' + id)
  },

  deleteGirl (id) {
    return Api().delete('girl/' + id)
  }
}
