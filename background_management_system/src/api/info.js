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