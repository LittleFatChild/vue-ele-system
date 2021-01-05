import axios from '@/utils/request.js'

export const get_users = (data) => {
    return axios.request({
        method: 'post',
        url: '/user/getList/',
        data: data.data
    })
}

export const add_users = (data) => {
    return axios.request({
        method: 'post',
        url: '/user/add/',
        data: data
    })
}

export const del_users = (data) => {
    return axios.request({
        method: 'post',
        url: '/user/delete/',
        data: data
    })
}