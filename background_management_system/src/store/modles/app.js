const state = {
    isCollapse: false
}

const getters = {
    isCollapse: () => state.isCollapse
}

const mutations = {
    SET_COLLAPSE( state ){
        state.isCollapse = !state.isCollapse
    }
}

const actions = {
    
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}