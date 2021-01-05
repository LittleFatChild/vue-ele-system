<template>
    <div>
        <el-table
        :data="data.tableData"
        style="width: 100%"
        border
        @select='select'
        @select-all='select'
        >
            <el-table-column type="selection" width="55" v-if="data.tableConfig.showSelect" align="center">

            </el-table-column>
            <template  v-for="item in data.tableConfig.thead">
                <el-table-column v-if="item.type!='slot'" :prop="item.prop" :label="item.label" :width="item.width" :key="item.label" align="center">
                </el-table-column>
                <el-table-column v-if="item.type=='slot'" :prop="item.prop" :label="item.label" :width="item.width" :key="item.label" align="center">
                    <template v-slot='scope'>
                        <slot :name="item.slotName" :data='scope.row'></slot>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <div class="space-30"></div>
        <el-row>
            <el-col :span='4'>
                <slot name="footer"></slot>
            </el-col>
            <el-col :span="20">
                <el-pagination
                    background
                    :layout="data.tableConfig.pageData"
                    :total="pageData.total"
                    :current-page="pageData.current_page"
                    :page-sizes='pageData.page_sizes'
                    :page-size='pageData.page_size'
                    @current-change='current_change'
                    @size-change='size_change'
                    class="pull-right">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { ref , reactive, onMounted, watch } from '@vue/composition-api';
import { get_users , add_users } from '@/api/user';
// import { loadTableData } from '@/api/common';
import { loadData } from './tableload';
import { page } from './page';
export default {
    props: {
        tableConfig: {
            type: Object,
            default: []
        },
        tableSelect: {
            type: Array,
            default: []
        }
    },
    setup( props , context ){
        const data = reactive( {
            tableConfig: {
                thead: [],
                showSelect: false,
                requestData: {},
                // page: {},
                pageData: 'total,sizes,prev,pager,next'
            },
            tableData: []
        })
        //  // 初始化表格样式
        const initTable = () => {
            // data.tableConfig.thead = props.tableConfig.thead;
            // data.tableConfig.showSelect = props.tableConfig.showSelect;
            const tableConfigKeys = Object.keys(data.tableConfig);
            for(let key in props.tableConfig){
                if(tableConfigKeys.includes(key)){
                    data.tableConfig[key] = props.tableConfig[key];
                }else{
                    context.root.$message({
                        type: 'error',
                        message: key+'属性未定义'
                    })
                }
            }
        }
        //  // 请求数据
        const { tableData , tableLoadData } = loadData();
        const { pageData , setTotal , current_change , size_change } = page();
        // const loadData = () => {
        //     loadTableData(data.tableConfig.requestData).then( res => {
        //         data.tableData = res.data.data.data;
        //         data.tableConfig.page.total = res.data.data.total
        //     })
        // }
        //  // 监听表格数据
        watch( [
                () => tableData.item , 
                () => tableData.total
            ] , ( [ newData , newtotal ] ) => {
            data.tableData = newData;
            // data.tableConfig.page.total = newtotal;
            setTotal(newtotal)
        } )

        //  // 分页处理

        watch( [
            () => pageData.current_page,
            () => pageData.page_size
        ] , ([currentPage,pageSize]) => {
            data.tableConfig.requestData.data.pageNumber = currentPage;
            data.tableConfig.requestData.data.pageSize = pageSize;
            tableLoadData(data.tableConfig.requestData)
        })
        
        // const current_change = ( (pagenumber) => {
        //     data.tableConfig.requestData.data.pageNumber = pagenumber;
        //     // loadData()
        // } )

        // const size_change = ( (pagesize) => {
        //     data.tableConfig.requestData.data.pageSize = pagesize;
        //     // loadData()
        // } )
        const select = (value) => {
            const ids = [];
            value.map( item => ids.push(item.id) )
            context.emit( 'update:tableSelect', ids )
        }

        const refresh = () => {
            tableLoadData(data.tableConfig.requestData)
        }
        
        const refreshWithParams = (params) => {
            const requestData = Object.assign( params , {
                pageNumber: 1,
                pageSize: 5
            } );
            data.tableConfig.requestData.data = requestData;
            tableLoadData(data.tableConfig.requestData)
        }

        onMounted( () => {
            initTable()
            // loadData()
            tableLoadData(data.tableConfig.requestData)
        } )
        return {
            data,
            current_change,
            size_change,
            pageData,
            select,
            refresh,
            refreshWithParams
        }
    }
}
</script>

