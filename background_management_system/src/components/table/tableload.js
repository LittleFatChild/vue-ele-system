import { reactive , ref } from '@vue/composition-api';
import { loadTableData } from '@/api/common'
//  //表格组件加载的数据业务
export const loadData = () => {
    const tableData = reactive({
        item: [],   //数据
        total: 0    //数据条数
    })
    const tableLoadData = ( requestData ) => {
        loadTableData(requestData).then( res => {
            tableData.item = res.data.data.data;
            tableData.total = res.data.data.total
        }).catch( err => {
            console.log( err )
        })
    }
    return {
        tableData,
        tableLoadData
    }
}