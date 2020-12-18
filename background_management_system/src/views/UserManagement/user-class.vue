<template>
    <div class="user-class" id="user-class">
        <div class="space-30"></div>
        <el-row :gutter="14">
            <el-col :span="4">
                <div class="label-warp keyword">
                    <label for="keyword">关键字</label>
                    <div class="warp-content">
                        <el-select id="keyword" v-model="formInHere.keyword">
                            <el-option v-for="item in formInHere.options" :key="item.value" :label="item.label" :value="item.value" align="center"></el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="label-warp search">
                    <el-input v-model="formInHere.search" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="label-warp search">
                    <el-button type="danger" class="search_input">搜索</el-button>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="label-warp newly">
                    <el-button type="danger" class="search_input" @click="handNewly( true )">新增</el-button>
                </div>
            </el-col>
        </el-row>
        <DialogNewly :ClassDialogVisible="ClassDialogVisible" @SonSend = "closing" />
    </div>
</template>

<script>
import aj from '../../api/login';
import DialogNewly from './dialog/user-class-info'
import { ref, reactive, onMounted } from '@vue/composition-api';

export default {
    components: {
        DialogNewly
    },
    setup( props, context ){
//------------------------------------------------------------------------onMounted------------------------------------------------------------
    //     onMounted( () => {
    //         aj.gD().then( res => {
    //             console.log( res )
    //         })
    //     } )
//--------------------------------------------------------------------data----------------------------------------------------------------
    const formInHere = reactive({
        keyword: '',
        options: [
            { label: '选项一', value:"内容一" },
            { label: '选项二', value:"内容二" }
        ],
        search: ''
    })
    const ClassDialogVisible = ref(false);
    
//-------------------------------------------------------------------methods--------------------------------------------------------------
    const handNewly = reactive( (bool) =>{
        ClassDialogVisible.value = bool;
    } )
    const closing = reactive ( (value) =>{
        ClassDialogVisible.value = value;
    } )

        return {
            /////////////////////////////////////////////////////////////data////////////////////////////////////////////////////////////
            formInHere,
            ClassDialogVisible,
            ////////////////////////////////////////////////////////////methods//////////////////////////////////////////////////////////
            handNewly,
            closing
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