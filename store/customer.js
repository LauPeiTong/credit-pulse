export const state = () => ({
  customer: null
})

export const getters = {
  getCustomer (state) {
    return state.customer
  }
}

export const mutations = {
  updateCustomer (state, customer) {
    state.customer = customer
    console.log(state.customer)
  }
}

export const actions = {
  viewCustomer ({ commit }, customer) {
    commit('updateCustomer', customer)
  }
}
