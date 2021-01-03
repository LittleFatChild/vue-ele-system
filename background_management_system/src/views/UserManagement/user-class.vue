<template>
    <div class="user-class" id="user-class">
        <div class="space-30"></div>
        <el-row :gutter="14">
            <el-col :span="16">
                <div class="label-warp keyword">
                    <label for="keyword">关键字:</label>
                    <el-row :gutter="12">
                        <el-col :span="4">
                            <selectVue 
                            :option="data.option"
                            :selectValue.sync="data.selectValue"
                            >

                            </selectVue>
                        </el-col>
                         <el-col :span="4">
                            <el-input type="danger">
                            </el-input>
                        </el-col>
                        <el-col :span="5">
                            <el-button type="danger">
                                搜索
                            </el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="label-warp newly">
                    <el-button type="danger" class="search_input" @click="handNewly( true )">新增</el-button>
                </div>
            </el-col>
        </el-row>
        <div class="space-30"></div>
        <el-row>
            <tableVue :tableConfig="data.tableConfig">
                <template #del='scopeData'>
                     <el-button type="danger" size="mini" @click="del(scopeData.data)">
                        删除
                    </el-button>
                </template>
                <template v-slot:update>
                    <el-button type="success" size="mini">
                        编辑
                    </el-button>
                </template>
                <template #footer>
                    <el-button type="info">
                        批量删除
                    </el-button>
                </template>
            </tableVue>
        </el-row>
        <div class="space-30"></div>

        <!-- <DialogNewly :ClassDialogVisible="ClassDialogVisible" @SonSend = "closing" /> -->
    </div>
</template>

<script>
// import aj from '../../api/login';
import DialogNewly from './dialog/user-class-info';
import selectVue from '../../components/select/index'
import { ref, reactive, onMounted } from '@vue/composition-api';
import tableVue from '../../components/table/index'
export default {
    components: {
        DialogNewly,
        selectVue,
        tableVue
    },
    setup( props, context ){
//------------------------------------------------------------------------onMounted-------------------------------------------------------

//--------------------------------------------------------------------data----------------------------------------------------------------
    const data = reactive({
        option: { init: ['name','phone'] },
        selectValue: {},
        tableConfig: {
            thead: [
                {
                    prop: 'username',
                    label: '邮箱/用户名',
                    width: '280'
                },
                {
                    prop: 'truename',
                    label: '真实姓名',
                    width: '180'
                },
                {
                    prop: 'phone',
                    label: '手机号',
                    width: ''
                },
                {
                    prop: 'region',
                    label: '地区',
                    width: ''
                },
                    {
                    prop: 'role',
                    label: '角色',
                    width: ''
                },
                {
                    prop: '',
                    label: '禁启用状态',
                    width: '',
                    type: 'slot',
                    slotName: "del"
                },
                {
                    prop: '',
                    label: '操作',
                    width: '',
                    type: 'slot',
                    slotName: "update"
                },
            ],
            showSelect: true,
            requestData: {
                url: '/user/getList/',
                method: 'post',
                data: {
                    pageNumber: 1,
                    pageSize: 2
                }
            },
            page: {
                layout: 'total,sizes,prev,pager,next',
                total: 0,
                current_page: 1,
                page_sizes: [2,4,5]
            }
        }
    })
    const ClassDialogVisible = ref(false);
    
//-------------------------------------------------------------------methods--------------------------------------------------------------
    const handNewly = reactive( (bool) =>{
        ClassDialogVisible.value = bool;
    } )
    const closing = reactive ( (value) =>{
        ClassDialogVisible.value = value;
    } )
    const del = (val) => {
        console.log(val)
    }

        return {
            /////////////////////////////////////////////////////////////data////////////////////////////////////////////////////////////
            data,
            ClassDialogVisible,
            ////////////////////////////////////////////////////////////methods//////////////////////////////////////////////////////////
            handNewly,
            closing,
            del
        }
    }
}
</script>

<style lang="scss" spoced>  
    #user-class{
        padding: 0 30px !important;
        .label-warp{
            &.keyword{ @include labelDom(60,center,40)}
        }
        .search_input{
            width: 100px;
        }
        .newly{
            width: 100px;
            float: right;
        }
    }
</style>