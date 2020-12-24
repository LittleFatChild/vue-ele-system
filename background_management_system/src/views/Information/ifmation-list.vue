<template>
  <div id="wrap">
    <div class="space-30"></div>
    <el-row :gutter="14">
        <el-col :span="4">
            <div class="label-warp category">
                <label for="category">分类:</label>
                <div class="warp-content">
                    <el-select id="category" v-model="formInline.region" placeholder="请选择" >
                        <el-option  v-for="cate in categorya.item" :key="cate.id"  :value="cate.category_name" align="center" :label="cate.category_name"></el-option>
                    </el-select>
                </div>
            </div>
        </el-col>
        <el-col :span="7">
            <div class="label-warp date">
                <label for="data">日期:</label>
                <div class="warp-content">
                    <el-date-picker style="width: 100%" id="date" v-model="formInline.date" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
                    </el-date-picker>
                </div>
            </div>
        </el-col>
        <el-col :span="4">
            <div class="label-warp key-word">
                <label for="key-word">关键字:</label>
                <div class="warp-content">
                    <el-select id="key-word" v-model="formInline.key_word">
                        <el-option  v-for="item in formInline.options" :key="item.value" :label="item.label" :value="item.value"  align="center"></el-option>
                    </el-select>
                </div>
            </div>
        </el-col>
        <el-col :span="3">
            <el-input v-model="formInline.search_input" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="4">
            <el-button type="danger" class="nbtnss" @click="getNews">搜索</el-button>
        </el-col>
        <el-col :span="2">
            <el-button type="danger" class="nbtns" @click="handleEdit(true)">新增</el-button>
        </el-col>
    </el-row>
    <el-row>
        <el-table :border="true" ref="multipleTable" :data="tableData.item" tooltip-effect="dark" style="width: 100%; font-size: 13px; margin-top: 30px;" @selection-change="handleSelectionChange" >
            <el-table-column align="center" type="selection">
            </el-table-column>
            <el-table-column align="center" prop="title" label="标题" min-width="6">
            </el-table-column>
            <el-table-column align="center" prop="categoryId" label="类别" :formatter="_cate" min-width="2">
            </el-table-column>
            <el-table-column align="center" prop="createDate" label="日期" :formatter='_date' min-width="1">
            </el-table-column>
            <el-table-column align="center" prop="admin" label="管理人" min-width="1">
            </el-table-column>
            <el-table-column align="center" prop="opration" label="操作" min-width="2">
                <template slot-scope="scope">
                    <el-button type="danger" @click="handleDelete( scope.$index, scope.row )" class="btns">
                        删除
                    </el-button>
                    <el-button type="success" @click="edit( true , scope.row.id )" class="btns">
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-row>
    <!-- dialog -->
    <DialogNewly_list :dialogFormVisible.sync="dialogFormVisible"  :category="categorya.item" @loadNews="getNews" />
    <DialongEdit :editVisible.sync="editVisible" :category="categorya.item" :id="editid"/>
    <div class="bottom">
        <el-button size="medium" class="delete_num pull-left" @reload="getNews" @click="delAll(tableData.item)">批量删除</el-button>
        <el-pagination 
            class="page pull-right" 
            background 
            layout="sizes , total , prev, pager, next" 
            :current-page="1" 
            @size-change="size_change" 
            @current-change="current_change"
            :page-sizes="[5,10,20]"
            :total="total" >
        </el-pagination>
    </div>
  </div>
</template>

<script>
import { ref , reactive , onMounted, watch } from "@vue/composition-api";
import AJAX from '../../api/login';
import DialogNewly_list from './dialog/list-info';
import DialongEdit from './dialog/list-edit';
import confirm from '../../utils/helper';
import global from '../../utils/global_3.0';
import { common } from '../../api/common';
import { get_news , delete_news } from '../../api/info';
import { formatDate } from '../../utils/formatdate'
export default {
    components: {
        DialogNewly_list,
        DialongEdit
    },
    setup( props, { root , refs } ) {
        const { str , confirm } = global()
        const { category , getCategoryAll } = common()
//------------------------------------------------------------------------onMounted------------------------------------------------------------------------
        watch( () => category.item, (value) => {
            categorya.item = value;
        } )
        onMounted( () => {
            getCategoryAll();
            getNews();
        } )
//----------------------------------------------------------------------------data-------------------------------------------------------------------------
        const total = ref(0)
        const categorya = reactive ({
            item: []
        })
        const inline = ref(true);
        const formInline = reactive({
            region: "",
            date: "",
            key_word: "ID",
            options: [
                { value: '选项一' , label: '黄金糕' },
                { value: '选项二' , label: '双皮奶' }
            ],
            search_input: ''
        });
        const input = ref( "" );
        const tableData = reactive({
            item: []
        });
        const multipleSelection = reactive([]);
        const dialogFormVisible = ref(false);
        const editVisible = ref(false);
        const page = reactive({
            pageNumber: 1,
            pageSize: 10
        })
        let selected_data = reactive([]);
        const editid = ref('')
//----------------------------------------------------------------------------methods--------------------------------------------------------------------
        const toggleSelection = (rows) => {
            if ( rows ) {
                rows.forEach((row) => {
                    refs.multipleTable.toggleRowSelection(row);
                    console.log(row)
                });
            }else {
                refs.multipleTable.clearSelection();
            }
        };
        const handleSelectionChange = (val) => {
            multipleSelection.value = val;
        };
        const handleDelete = ( index , row ) => {
            selected_data = reactive[Number(row.id)]
            // console.log( index , row );
            const callback = () =>{
                // let data = {
                // id: [row.id]
                // }
                // delete_news( data ).then( res => {
                //     getNews();
                // } ).catch( err => {
                //     console.log( err )
                // } )
            }
            // confirm.confirm({
            //     content: "此操作将永久删除该文件, 是否继续?",
            //     top: "提示",
            //     type: "warning",
            //     center: true,
            //     callback: callback
            // })
            // confirm.ProConfirm( {
            //     content: "此操作将永久删除该文件, 是否继续?",
            //     top: "提示",
            //     type: "warning",
            //     center: true,
            //     callback: callback
            // } ).then( res => {
            //     return console.log( res );
            // } ).catch( rej => {
            //     return console.log( rej );
            // })
            // root.$confirm = ( {
            //     content: "此操作将永久删除该文件, 是否继续?",
            //     top: "提示",
            //     type: "warning",
            //     center: true,
            //     callback: callback
            // } )
            //  //全局注入3.0方法
            confirm( { 
                content: "此操作将永久删除该文件, 是否继续?",
                top: "提示",
                type: "warning",
                center: true,
                callback: callback
            } )
            // watch( () => str.value ,(value) => {
            //     console.log('===>',value)
            // } )
        };
        const delAll = reactive( (rows) => {
           if( selected_data.length == 0 ){
              return false;
           }else{
               console.log( 'oo' )
           }
        } )
        const handleEdit = (bool) => {
            dialogFormVisible.value = bool;
        };
        const edit = reactive( (bool,id) => {
            editVisible.value = bool;
            console.log( id )
            editid.value = id;
        })
        const _date = ((row) => {
            return formatDate(row.createDate);
        })
        //  点击页码
        const current_change = ( (currentPage) => {
            page.pageNumber = currentPage;
            getNews()
        } )
        //  点击页大小
        const size_change = ( pageSize ) => {
            page.pageSize = pageSize;
            getNews()
        }
        const _cate = (row) => {
            let id = row.categoryId;
            let tmp = category.item.filter( cate => cate.id === id );
            if( tmp.length==0){
                return '无'
            }else{
                return tmp[0].category_name;
            }
        }
        const search = () => {
            let data = {
                pageNumber: page.pageNumber,
                pageSize: page.pageSize
            }
            //  //处理类别
            if( formInline.region ){
                data.category = formInline.region;
            }
            if( Array.isArray(formInline.date) && formInline.date.length > 0 ){
                data.startTime = formInline.date[0];
                data.endTime = formInline.date[1]
            }
            return data;
        }
//--------------------------------------------------------------------onMounted---------------------------------------------------------------
        const getNews = () => {
            let data = search()
            get_news( data ).then( res => {
                tableData.item = res.data.data.data;
                total.value = res.data.data.total;
            } ).catch( err => {
                return console.log( err )
            })
        }
        return {
                inline,
                formInline,
                input,
                tableData,
                toggleSelection,
                handleSelectionChange,
                handleDelete,
                handleEdit,
                dialogFormVisible,
                editVisible,
                edit,
                categorya,
                _cate,
                _date,
                getNews,
                current_change,
                size_change,
                total,
                delAll,
                editid
            };
        },
    };
</script>
<style lang="scss" scoped>
    #wrap {
        padding: 0 30px;
        .label-warp{
            &.category{ @include labelDom(60,center,40) }
            &.date{ @include labelDom(60,center,40) }
            &.key-word{ @include labelDom(60,center,40) }
        }
        .btns{
            padding: 8px 17px;
        }

        .nbtnss{
            width: 80%;
            height: 40px;
        }
        
        .nbtns{
            width: 100%;
            height: 40px;
        }

        .bottom {
            overflow: hidden;
            margin-top: 30px;
            .delete_num {
                margin-left: 0;
                padding: 12px 18px;
            }
        }
    }
</style>