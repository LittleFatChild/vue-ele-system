import axios from '@/utils/request.js'

export const get_code = ( method, url, data ) => {
    return axios.request({
        method: method,//'get'
        url: url,//'user/login/',
        data: data//{ firstName: 'Fred',lastName: 'Flsas' }
    })
}