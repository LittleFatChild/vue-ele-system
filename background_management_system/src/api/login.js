import axios from '@/utils/request.js'

const get_code = ( method, url, data ) => {
    return axios.request({
        method: method,//'get'
        url: url,//'user/login/',
        data: data//{ firstName: 'Fred',lastName: 'Flsas' }
    })
}

const get_login = ( data ) => {
    return axios.request({
        method: "post",//'get'
        url: "/login/",//'user/login/',
        data: data//{ firstName: 'Fred',lastName: 'Flsas' }
    })
}

export default {
    get_code,
    get_login
}