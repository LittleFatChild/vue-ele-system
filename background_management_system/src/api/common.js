import { reactive, ref } from '@vue/composition-api';
import { show_class } from '../api/info';
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