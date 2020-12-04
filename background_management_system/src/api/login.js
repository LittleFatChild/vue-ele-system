import axios from '@/utils/request.js'

export const get_code = ( method, data ) => {
    return axios.request({
        method: method,//'get'
        url: 'user/login/',
        params: data//{ firstName: 'Fred',lastName: 'Flsas' }
    })
}