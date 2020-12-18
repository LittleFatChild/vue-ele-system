import aj from '../../api/login.js';
import cookies from '../../utils/cookie';

const state = {
    isCollapse: JSON.parse( sessionStorage.getItem('isCollapse') ) || false,
    token: cookies.gT() ||'',
    username: cookies.gU || ''
}

const getters = {
    isCollapse: () => state.isCollapse
}

const mutations = {
    SET_COLLAPSE( state ){
        state.isCollapse = !state.isCollapse;
        sessionStorage.setItem('isCollapse',JSON.stringify( state.isCollapse ))
    },
    SET_TOKEN( state,value ){
        state.token = value;
    },
    SET_USERNAME( state, value ) {
        state.username = value;
    },
    EXIT( state ){
        state.token = '';
        state.username = '';
        cookies.rT();
        cookies.rU();
    }
}

const actions = {
    login( context, data ){
        return new Promise(( resolve, reject ) => {
            aj.get_login( data ).then( res => {
                let { username, token } = res.data.data;
                context.commit('SET_USERNAME',username);
                context.commit('SET_TOKEN',token);
                //  以cookie的方式存放到浏览器
                cookies.sU( username );
                cookies.sT( token );
                resolve( res );
            }, rej => {
                reject(rej);
            }).catch( error => {
                return console.log( error );
            })
        })
    },
    exit( context ){
        return new Promise( ( resolve ) => {
            cookies.rU();
            cookies.rT();
            context.commit('SET_USERNAME', '');
            context.commit('SET_TOKEN', '');
            resolve()
        } )
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}