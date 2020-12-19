<template>
  <div id="wrap">
    <div class="space-30"></div>
    <el-row :gutter="14">
        <el-col :span="4">
            <div class="label-warp category">
                <label for="category">类型:</label>
                <div class="warp-content">
                    <el-select id="category" v-model="formInline.region" placeholder="请选择" >
                        <el-option label="区域一" value="shanghai" align="center"></el-option>
                        <el-option label="区域二" value="beijing"  align="center"></el-option>
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
            <el-button type="danger" class="nbtnss">搜索</el-button>
        </el-col>
        <el-col :span="2">
            <el-button type="danger" class="nbtns" @click="handleEdit(true)">新增</el-button>
        </el-col>
    </el-row>
    <el-row>
        <el-table :border="true" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%; font-size: 13px; margin-top: 30px;" @selection-change="handleSelectionChange" >
            <el-table-column align="center" type="selection">
            </el-table-column>
            <el-table-column align="center" label="标题" min-width="4">
                <template slot-scope="scope">
                    {{ scope.row.tit }}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="date" label="日期" min-width="1">
            </el-table-column>
            <el-table-column align="center" prop="category" label="类别" min-width="2">
            </el-table-column>
            <el-table-column align="center" prop="admin" label="管理人" min-width="1">
            </el-table-column>
            <el-table-column align="center" prop="opration" label="操作" min-width="2">
                <template slot-scope="scope">
                    <el-button type="danger" @click="handleDelete( scope.$index, scope.row )" class="btns">
                        删除
                    </el-button>
                    <el-button type="success" @click="edit( true )" class="btns">
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-row>
    <!-- dialog -->
    <DialogNewly_list :dialogFormVisible.sync="dialogFormVisible"/>
    <DialongEdit :editVisible.sync="editVisible"/>
    <div class="bottom">
        <el-button size="medium" class="delete_num pull-left">批量删除</el-button>
        <el-pagination class="page pull-right" background layout="prev, pager, next" :total="1000" >
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
import global from '../../utils/global_3.0'
export default {
    components: {
        DialogNewly_list,
        DialongEdit
    },
    setup( props, { root , refs } ) {
//------------------------------------------------------------------------onMounted------------------------------------------------------------------------
        // let data = {
        //     categoryId: 1,
        //     startTiem: '2019-12-12 12:00:00',
        //     endTime: '2019-12-12 12:00:00',
        //     title: '手把手撸码前端',
        //     id: 12,
        //     pageNumber: 1,
        //     pageSize: 10
        // }
        // onMounted( () => {
        //     AJAX.gL( data ).then( res  => {
        //         console.log( data )
        //     } )
        // } )
//----------------------------------------------------------------------------data-------------------------------------------------------------------------
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
        const value1 = reactive( [ new Date( 2016, 12, 14 ), new Date( 2016, 12, 15) ] );
        const input = ref( "" );
        const tableData = reactive([
            {
                tit: "纽约市长白思豪宣布退出总统竞选 特朗普发推回应",
                category: "国内信息",
                date: "2019-09-10 19:31:31",
                admin: "管理员",
                opration: {},
            },
            {
                tit:
                "习近平在中央政协工作会议暨庆祝中国人民政治协商会议成立70周年大会上发表重要讲话",
                category: "国内信息",
                date: "2019-09-10 19:31:31",
                admin: "张三",
                opration: {},
            },
            {
                tit: "基里巴斯与台当局 “断交” 系蔡当局上台后断交第7国 ",
                category: "国内信息",
                date: "2019-09-10 19:31:31",
                admin: "李四",
                opration: {},
            },
            {
                tit: "不选了！纽约市长白思豪宣布退出2020美国大选",
                category: "国内信息",
                date: "2019-09-10 19:31:31",
                admin: "李四",
                opration: {},
            },
        ]);
        const multipleSelection = reactive([]);
        const dialogFormVisible = ref(false);
        const editVisible = ref(false);
//----------------------------------------------------------------------------methods--------------------------------------------------------------------
        const toggleSelection = (rows) => {
            if ( rows ) {
                rows.forEach((row) => {
                    refs.multipleTable.toggleRowSelection(row);
                });
            }else {
                    refs.multipleTable.clearSelection();
            }
        };
        const handleSelectionChange = (val) => {
            multipleSelection.value = val;
        };
        const handleDelete = ( index , row ) => {
            const callback = () =>{
                console.log(111)
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
            const { str , confirm } = global()
            confirm( { 
                content: "此操作将永久删除该文件, 是否继续?",
                top: "提示",
                type: "warning",
                center: true,
                callback: callback
            } )
            watch( () => str.value ,(value) => {
                console.log('===>',value)
            } )
        };
        const handleEdit = (bool) => {
            dialogFormVisible.value = bool;
        };
        const edit = reactive((bool) => {
            editVisible.value = bool;
        })
        return {
                inline,
                formInline,
                value1,
                input,
                tableData,
                toggleSelection,
                handleSelectionChange,
                handleDelete,
                handleEdit,
                dialogFormVisible,
                editVisible,
                edit
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