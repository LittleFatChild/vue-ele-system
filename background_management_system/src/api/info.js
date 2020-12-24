import axios from '../utils/request';
export const show_class = (data) => {
    return axios.request({
        method: 'post',//'get'
        url: '/news/getCategoryAll/',//'user/login/',/news/getCategoryAll/ 
        data: data
    })
}

export const add_category = (data) => {
    return axios.request({
        method: 'post',//'get'
        url: '/news/addFirstCategory/',//'user/login/',/news/getCategoryAll/ 
        data: data
    })
}

export const del_category = (data) => {
    return axios.request({
        method: 'post',//'get'
        url: '/news/deleteCategory/',//'user/login/',/news/getCategoryAll/ 
        data: data
    })
}

export const add_child = (data) => {
    return axios.request({
        method: 'post',//'get'
        url: '/news/addChildrenCategory/',//'user/login/',/news/getCategoryAll/ 
        data: data
    })
}

export const edit_category = (data) => {
    return axios.request({
        method: 'post',
        url: '/news/editCategory/',
        data: data
    })
}

export const get_news = (data) => {
    return axios.request({
        method: 'post',
        url: '/news/getList/',
        data: data
    })
}

export const add_news = (data) => {
    return axios.request({
        method: 'post',
        url: '/news/add/',
        data: data
    })
}

export const delete_news = (data) => {
    return axios.request({
        method: 'post',
        url: '/news/deleteInfo/',
        data: data
    })
}

export const edit_news = (data) => {
    return axios.request({
        method: 'post',
        url: '/news/editInfo/',
        data: data
    })
}