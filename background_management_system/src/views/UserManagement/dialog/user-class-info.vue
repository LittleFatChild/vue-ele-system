<template>
  <div id="dialog-info">
    <el-dialog ref="dialog" title="新增" :visible="sonClassDialogVisible" :append-to-body="true" @close="close" width="540px">
        <el-form :model="form">
            <el-form-item label="类型" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="区域一" value="shanghai" align="center"></el-option>
                    <el-option label="区域二" value="beijing" align="center"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题" :label-width="formLabelWidth">
                <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="概况" :label-width="formLabelWidth">
                <el-input type="textarea" rows="6" resize="none" v-model="form.content" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleEdit( false )" style="padding: 12px 55px;">取 消</el-button>
            <el-button type="danger" @click="handleEdit( false )" style="padding: 12px 55px;">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref , reactive , watch } from '@vue/composition-api'
export default {
    props:{
        ClassDialogVisible: {
            type: Boolean,
            default: false
        }
    },
    setup( props , context ){
//-------------------------------------------------------------------------data------------------------------------------------------------------
        const form = reactive( {
            region: '',
            title: '',
            content: ''
        } );
        const sonClassDialogVisible = ref(false)
        const formLabelWidth = ref("60px");
//------------------------------------------------------------------------methods----------------------------------------------------------------
        watch( () => {
            return props.ClassDialogVisible;
        } , ( newValue , oldValue ) => {
            sonClassDialogVisible.value = newValue;
        } )

        const close = reactive( () => {
            context.emit( 'SonSend', false )
        } )

        return {
            form,
            formLabelWidth,
            sonClassDialogVisible,
            close
        }
    }
}
</script>

<style lang="scss" scoped>
    // #dialog-info{
    //     color: blue;
    // }
</style>