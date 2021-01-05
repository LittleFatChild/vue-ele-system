import { reactive } from '@vue/composition-api';
//  //表格组件加载的数据业务
export const page = () => {
    const pageData = reactive({
        // layout: 'total,sizes,prev,pager,next',
        total: 0,
        page_sizes: [2, 4, 5],
        page_size: 2,
        current_page: 1,
    })
    const setTotal = total => pageData.total = total;
    const current_change = current_page => pageData.current_page = current_page;
    const size_change = page_size => pageData.page_size = page_size
    return {
        pageData,
        setTotal,
        current_change,
        size_change
    }
}