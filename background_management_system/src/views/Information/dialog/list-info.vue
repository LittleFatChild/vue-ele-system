<template>
  <div id="dialog-info-list">
    <el-dialog ref="dialog" title="新增" :visible.sync="sonDialogFormVisible" width="580px" :append-to-body="true" @close="close">
        <el-form :model="form">

            <el-form-item label="类型" :label-width="formLabelWidth" >
                <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="区域一" value="shanghai" align="center"></el-option>
                    <el-option label="区域二" value="beijing" align="center"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="标题" :label-width="formLabelWidth">
                <el-input v-model="form.title"></el-input>
            </el-form-item>

            <el-form-item label="概况" :label-width="formLabelWidth">
                <el-input type="textarea" rows="6" resize="none" v-model="form.content" placeholder="请输入内容"></el-input>
            </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer" >
            <el-button @click="close" style="padding: 12px 55px;">取 消</el-button>
            <el-button type="danger" @click="handleEdit( false )" style="padding: 12px 55px;" placeholder="请输入内容">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref , reactive , watch } from '@vue/composition-api'
export default {
    props:{
        dialogFormVisible: {
            type: Boolean,
            default: false
        }
    },
    setup( props , context ){
//----------------------------------------------------------------------------data----------------------------------------------------------------------------
        const form = reactive( {
            region: '',
            title: '',
            content: ''
        } );
        const formLabelWidth = ref("60px");
        const sonDialogFormVisible = ref(false);
//---------------------------------------------------------------------------methods--------------------------------------------------------------------------
        
        const close = reactive( () => {
            context.emit('update:dialogFormVisible',false);
        } )

        watch( () => {
            return props.dialogFormVisible;
            }, ( newValue , oldValue)=> {
            sonDialogFormVisible.value = newValue;
        } )

        return {
            form,
            formLabelWidth,
            sonDialogFormVisible,
            close
        }
    }
}
</script>

<style lang="scss" scoped>
    // #dialog-info-list{
    // }
</style>