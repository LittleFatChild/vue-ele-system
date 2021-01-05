import { reactive, ref } from '@vue/composition-api';
import { show_class } from '../api/info';
import axios from '@/utils/request';
export const common = () => {
    const category = reactive( {
        item: []
    } )
    const getCategoryAll = () => {
        show_class({ }).then( res => {
            category.item = res.data.data
        }).catch( err => {
            console.log( err )
        })
    }
    return {
        category,
        getCategoryAll
    }
}

//  //表格请求
export const loadTableData = (params) => {
    return axios.request({
        method: params.method,
        url: params.url,
        data: params.data
    })
}