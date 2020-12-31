<template>
    <div class="details">
        这是详细编辑的地方
        <el-form :model="form" status-icon  ref="ruleForm" label-width="100px">

            <el-form-item label="分类:" placeholder="请选择">
                <el-select v-model="form.categoryId">
                    <el-option
                        v-for="cate in category.item"
                        :key="cate.id"
                        :label="cate.category_name"
                        :value="cate.id"
                        >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="标题:">
                <el-input v-model="form.title"></el-input>
            </el-form-item>

            <el-form-item label="缩略图:">
                缩略图
            </el-form-item>

            <el-form-item label="创建日期:">
                <el-date-picker
                    v-model="form.createDate"
                    type="date"
                    format="yyyy-MM-dd / HH:mm:ss "
                    placeholder="选择日期"
                    disabled
                    >

                </el-date-picker>
            </el-form-item>

            <el-form-item label="创建日期：">
                <quillEditor></quillEditor>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor'
import { ref , reactive, onActivated, onDeactivated, watch, onMounted } from '@vue/composition-api';
import { get_news } from '../../api/info';
import { formatDate } from '@/utils/formatdate';
import { common } from '../../api/common';
export default {
    components: {
        quillEditor
    },
    setup( props , context ){
        const id = ref('');
        const form = reactive({
            categoryId: '',
            title: '',
            content: '',
            createDate: '',
            imgUrl: ''
        })
        const category = reactive({
            item : []
        })
        const { category : cate , getCategoryAll } = common()
        const getInfo = () => {
            get_news({
                pageNumber: 1,
                pageSize: 1,
                id: id.value
            }).then( res => {
                const responseData = res.data.data.data[0];
                form.categoryId = responseData.categoryId;
                form.title = responseData.title;
                form.content = responseData.content;
                form.createDate = responseData.createDate;
                form.imgUrl = responseData.imgUrl
            } )
        }
        getCategoryAll();
        watch( () => {
            return cate.item;
        } , (value) => {
            category.item = value;
        } )
        onMounted( () => {
            getCategoryAll()
        } )
        onActivated( () => {
            id.value = context.root.$route.params.id || context.root.$store.getters['params/id'];
        } )
        onDeactivated( () => {
            console.log('离开');
        } )
        return {
            form,
            id,
            category
        }
    }
}
</script>

<style lang="scss" scoped>
    .details{
       list-style: none;
    }
</style>