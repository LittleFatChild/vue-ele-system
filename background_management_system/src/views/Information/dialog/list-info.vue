<template>
  <div id="dialog-info-list">
    <el-dialog ref="dialog" title="新增" :visible.sync="sonDialogFormVisible" width="580px" :append-to-body="true" @close="close" @opened = "opened">
        <el-form :model="form">

            <el-form-item label="类型" :label-width="formLabelWidth" >
                <el-select v-model="form.category" placeholder="请选择">
                    <el-option v-for="cate in category" :label="cate.category_name" :value="cate.id" :key="cate.id" align="center"></el-option>
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
            <el-button  style="padding: 12px 55px;">取 消</el-button>
            <el-button type="danger" @click="handleEdit" style="padding: 12px 55px;" placeholder="请输入内容">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref , reactive , watch } from '@vue/composition-api';
import { add_news } from '../../../api/info'
export default {
    props:{
        dialogFormVisible: {
            type: Boolean,
            default: false
        },
        category: {
            type: Array,
            default: []
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
        const sonDialogFormVisible = ref(false);
        const category = reactive({
            item: []
        })
//---------------------------------------------------------------------------methods--------------------------------------------------------------------------
        const opened = ( () => {
            category.item = props.category;
            console.log(props.category)
        })
        const close = reactive( () => {
            context.emit('update:dialogFormVisible',false);
            // form.category = '';
            // form.title = '';
            // form.content = '';
        } )
        const handleEdit = reactive ( () => {
            console.log(form)
            if( !form.category ){
                context.root.$message( {
                    type: 'error',
                    message: '分类必须填写',
                    duration: 1000
                } )
                return false;
            }
            const data = {
                categoryId: form.category,
                title: form.title,
                content: form.content
            }
            add_news(data).then( res =>{
                context.root.$message({
                    type: 'success',
                    message: '信息添加成功',
                    duration: 1000
                })
                close()
            }).catch( err => {
                console.log(err)
            })
        })

        watch( () => {
            return props.dialogFormVisible;
            }, ( newValue , oldValue)=> {
            sonDialogFormVisible.value = newValue;
        } )

        return {
            form,
            formLabelWidth,
            sonDialogFormVisible,
            close,
            handleEdit,
            opened
        }
    }
}
</script>

<style lang="scss" scoped>
    // #dialog-info-list{
    // }
</style>