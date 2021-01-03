<template>
    <div>
        <el-table
        :data="data.tableData"
        style="width: 100%"
        border
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
                    :layout="data.tableConfig.page.layout"
                    :total="data.tableConfig.page.total"
                    :current-page="data.tableConfig.page.current_page"
                    :page-sizes='data.tableConfig.page.page_sizes'
                    @current-change='current_change'
                    @size-change='size_change'
                    class="pull-right">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { ref , reactive, onMounted } from '@vue/composition-api';
import { get_users , add_users } from '@/api/user';
import { loadTableData } from '@/api/common';
export default {
    props: {
        tableConfig: {
            type: Object,
            default: []
        }
    },
    setup( props , context ){
        const data = reactive( {
            tableConfig: {
                thead: [],
                showSelect: false,
                requestData: {},
                page: {}
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
        const loadData = () => {
            loadTableData(data.tableConfig.requestData).then( res => {
                data.tableData = res.data.data.data;
                data.tableConfig.page.total = res.data.data.total
            })
        }
        const current_change = ( (pagenumber) => {
            data.tableConfig.requestData.data.pageNumber = pagenumber;
            loadData()
        } )

        const size_change = ( (pagesize) => {
            data.tableConfig.requestData.data.pageSize = pagesize;
            loadData()
        } )
        onMounted( () => {
            initTable()
            loadData()
        } )
        return {
            data,
            current_change,
            size_change
        }
    }
}
</script>

