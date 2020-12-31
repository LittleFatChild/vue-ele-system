const state = {
    id: '' || sessionStorage.getItem('id'),
    content: '' || sessionStorage.getItem('content')
}

const mutations = {
    CACHE_PARAMS( state ,payload ){
        for (let item in payload){
            state[item] = payload[item].value;
            payload[item].session && sessionStorage.setItem( payload[item].key, payload[item].value )
        }
    }

}

const getters = {
    id: state => state.id,
    content: state => state.content
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