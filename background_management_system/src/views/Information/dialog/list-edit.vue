<template>
  <div id="dialog-info-list">
    <el-dialog ref="dialog" title="编辑" :visible.sync="soneditVisible" width="580px" :append-to-body="true" @close="close" @opened = "opened">
        <el-form :model="form">

            <el-form-item label="类型" :label-width="formLabelWidth" >
                <el-select v-model="form.category" placeholder="请选择">
                    <el-option label="区域一" value="shanghai" align="center"></el-option>
                    <el-option label="区域二" value="beijing" align="center"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="标题" :label-width="formLabelWidth">
                <el-input v-model="form.title" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item label="概况" :label-width="formLabelWidth">
                <el-input type="textarea" rows="6" resize="none" v-model="form.content" placeholder="请输入内容"></el-input>
            </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer" >
            <el-button @click="close" style="padding: 12px 55px;">取 消</el-button>
            <el-button type="danger" @click="submit( false )" style="padding: 12px 55px;" placeholder="请输入内容">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref , reactive , watch } from '@vue/composition-api';
import { get_news , edit_news } from '../../../api/info';
export default {
    props:{
        editVisible: {
            type: Boolean,
            default: false
        },
        category: {
            type: Array,
            default: []
        },
        id: {
            type: String,
            default: ''
        }
    },
    setup( props , context ){
//----------------------------------------------------------------------------data----------------------------------------------------------------------------
        
        const form = reactive( {
            category: '',
            title: '',
            content: ''
        } );
        const formLabelWidth = ref("60px");
        const soneditVisible = ref(false);

//---------------------------------------------------------------------------methods--------------------------------------------------------------------------
        
        const close = reactive( () => {
            context.emit('update:editVisible',false);
        } )
        const opened = ( () => {
            getinfo()
        })
        const submit = ( () => {
            edit_news({
                id: props.id,
                category: form.category,
                title: form.title,
                content: form.content
            }).then( res => {
                context.root.$message({
                    type: 'success',
                    message: res.data.message,
                    duration: 1000
                })
                close();
                emit( 'reload' )
            })
        } )
        const getinfo = () => {
            //  //  查询数据
            get_news({
                id: Number(props.id),
                pageSize: 2,
                pageNumber: 1
            }).then( res => {
                form.category = res.data.data.data[0].catecoryId;
                form.title = res.data.data.data[0].title;
                form.content = res.data.data.data[0].content;
            } )
        }
        watch( () => {
            return props.editVisible;
            }, ( newValue , oldValue)=> {
            soneditVisible.value = newValue;
        } )

        return {
            form,
            formLabelWidth,
            soneditVisible,
            close,
            opened,
            submit
        }
    }
}
</script>

<style lang="scss" scoped>
    // #dialog-info-list{
    // }
</style>