<template>
    <div class="ifmation-class">
        <div class="space-30"></div>
        <div class="header">
            <el-button type="danger" class="block" @click="addcategory">添加一级分类</el-button>
        </div>
        <hr class="thought">
        <div class="class-warp">
            <el-row :gutter="30">
                <el-col :span="10">
                    <ul class="tree-list-tit">
                        <li v-for="(item,index) in data.senior" :key="item.id">
                            <p :class="item.children? 'active': ''">
                                {{ item.category_name }}
                                <span class="par-button-grop">
                                    <el-button type="danger" round size="mini" @click="editdata( item,'parent' )">编辑</el-button>
                                    <el-button type="success" round size="mini" @click="addchild(item)">添加子集</el-button>
                                    <el-button round size="mini" @click="del(item,index)">删除</el-button>
                                </span>
                            </p>
                            <ul class="tree-list-count">
                                <li v-for="(itemchild,childindex) in item.children" :key="itemchild.id">
                                    {{ itemchild.category_name }}
                                    <div class="button-grop">
                                        <el-button size="mini"  @click="editdata( itemchild,'child' , item )" round>编辑</el-button>
                                        <el-button type="danger" size="mini" round @click="delchild(itemchild,item,childindex)">删除</el-button>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </el-col>
                <el-col :span="14">
                    <h4 class="menu-title">分类编辑</h4>
                    <el-form label-width="142px" class="from-wrap" ref="categoryFrom">
                        <el-form-item label="一级分类名称：" prop="categoryName" v-if='category_first_input'  >
                            <el-input v-model="form.categoryName" :disabled='is_disabled' ></el-input>
                        </el-form-item>
                        <el-form-item label="二级分类名称：" prop="secCategoryName" v-if='category_second_input'>
                            <el-input v-model="form.secCategoryName" ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" style='width:100px' @click='submit'>确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from '@vue/composition-api';
import { add_category , show_class , del_category , add_child , edit_category } from '../../api/info';
export default {
    components: {
    },
    setup( props, context ){
//------------------------------------------------------------------------onMounted------------------------------------------------------------
        onMounted( () => {
            show_class().then( res => {
                data.senior = res.data.data;
            } ).catch( err => {
                return console.log( err );
            } )
        } )
//------------------------------------------------------------------------data------------------------------------------------------------------
        console.log(props)
        const data = reactive({
            senior: [],
            stage: []
        });
        const is_disabled = ref(true);
        const category_first_input = ref(true);
        const category_second_input = ref(false);
        let edit = '编辑';
        const form = reactive( {
            categoryName: '',
            secCategoryName: ''
        } )
//------------------------------------------------------------------------methods---------------------------------------------------------------
        //  添加父类
        const addcategory = (() => {
            category_second_input.value = false;
            is_disabled.value = false;
            is_disabled.value = false;
            edit = '添加'
        })
        //  提交内容
        const submit = reactive( ()=>{
            if( edit == '编辑' ){
                editdatareal()
            }else{
                if( category_second_input.value ){
                    add_child({
                        categoryName: form.secCategoryName,
                        parentId: data.stage.id
                    }).then( res => {
                        data.senior.map( (item,index) =>{
                            if( item.children && item.id == data.stage.id){
                                console.log(item)
                                data.senior[index].children.push( { 
                                    category_name: res.data.data.category_name ,
                                    id: res.data.data.id,
                                    parentId: '' + data.stage.id
                                } );
                            }else if( !item.children ){
                                console.log( item )
                                data.senior[index].children = [];
                                data.senior[index].children.push( { 
                                    category_name: res.data.data.category_name ,
                                    id: res.data.data.id,
                                    parentId: '' + data.stage.id
                                } );
                            }
                        } )
                    }).catch( err => {
                        console.log(err)
                    } )
                    
                }else{
                    if( !form.categoryName ){
                        return context.root.$message({
                            type: 'error',
                            message: '一级分类不能为空',
                            duration: 1000
                        })
                    }
                    add_category( { categoryName: form.categoryName } ).then( res => {
                        data.senior.push(  { 
                                category_name: res.data.data.category_name,
                                children: [],
                                id: res.data.data.id
                        } )
                    } );
                }
            }
        } )
        //  删除父类
        const del = reactive( (item,index,type) => {
            del_category({ categoryId: item.id }).then( res => {
                data.senior.splice( index , 1 );
            } ).catch( err => {
                return console.log( err )
            } )
        } )
        //  添加子类
        const addchild = reactive( (item) => {
            form.categoryName = item.category_name;
            is_disabled.value = true;
            category_second_input.value =true;
            data.stage = item;
            edit = '添加'
        } )
        //  删除子类
        const delchild = reactive( (child,parent,childindex) => {
            del_category({ categoryId: child.id }).then( res => {
                parent.children.map( (item,index) => {
                    if(item.id == child.id){
                        parent.children.splice( index , 1 );
                    }
                } )
            } ).catch( err => {
                return console.log( err )
            } )
        })
        let fic_data = null;
        let fic_type = null;
        let fic_parent = null;
        const editdata = reactive( ( data , type , parent) => {
            edit = '编辑';
            fic_data = data;
            fic_type = type;
            if( type == 'child' ){
                form.categoryName = parent.category_name;
                is_disabled.value = true;
                category_second_input.value =true;
            }else{
                is_disabled.value = false;
            }
        } )
        //  编辑子类 父类
        const editdatareal = ( () => {
            edit_category({ 
                id: fic_data.id,
                categoryName: fic_type=='parent'? form.categoryName : form.secCategoryName
            } ).then( res => {
                if( fic_type == 'parent'){
                    data.senior.map( (item,i) => {
                        if( item.id == fic_data.id ){
                            data.senior[i].category_name = form.categoryName
                        }
                    } )
                }else{
                    data.senior.map( (item,i) => {
                        if( item.id == fic_data.parent_id ){
                            data.senior[i].children.map( (child,j) => {
                                if( child.id == fic_data.id ){
                                    console.log(  data.senior[i].children[j])
                                    data.senior[i].children[j].category_name = form.secCategoryName;
                                }
                            } )
                        }
                    } )
                }
                
            } ).catch( err => {

            } )
        } )
        return {
            /////////////////////////////////////////////////////////////data////////////////////////////////////////////////////////////
            data,
            form,
            is_disabled,
            category_first_input,
            category_second_input,
            ////////////////////////////////////////////////////////////methods//////////////////////////////////////////////////////////
            addcategory,
            submit,
            addchild,
            del,
            delchild,
            editdata
        }
    }
}
</script>

<style lang="scss" spoced>  
    .ifmation-class{
        .header{
            padding: 30px 30px !important;
            .block{
                width: 158px;
                height: 40px;
            }
        }
        
        .thought{
            border: none;
            border-bottom: 1px solid #e9e9e9;
            margin-bottom: 28px;
        }
        
        .class-warp{
            width: 100%;
            box-sizing: border-box;
            padding: 0 30px 0 30px!important;
            font-size: 13px;
            color: #33495e;
            .tree-list-tit>li p{
                position: relative;
                padding-left: 10px;
                height: 44px;
                line-height: 44px;
                font-weight: 700;
                padding-left: 38px;
            }
            .tree-list-tit>li p::before{
                position: absolute;
                content: '';
                display: block;
                width: 13px;
                height: 13px;
                border: 1px solid #7a7a7a;
                box-sizing: border-box;
                left: 10px;
                top: 15px;
            }
            .tree-list-tit>li p::after{
                position: absolute;
                content: '+';
                display: block;
                width: 13px;
                height: 13px;
                box-sizing: border-box;
                border-bottom: none;
                left: 12px;
                top: -1px;
            }
            .tree-list-tit>li p{
                &.active{
                    background-color: #f3f3f3;
                }
                &.active::after{
                     position: absolute;
                    content: '';
                    display: block;
                    width: 7px;
                    border-bottom: 1px solid #7a7a7a;
                    box-sizing: border-box;
                    left: 13px;
                    top: 9px;
                }
            }
            .tree-list-tit .tree-list-count li{
                position: relative;
                padding-left: 53px;
                height: 35px;
                line-height: 35px;
            }
            .tree-list-tit .tree-list-count li::before{
                position: absolute;
                content: '';
                width: 34px;
                height: 35px;
                box-sizing: border-box;
                display: block;
                border-left: 1px dotted #314a60;
                border-bottom: 1px dotted #314a60;
                left: 16px;
                top: -16px;
            }
            .tree-list-tit .tree-list-count li:last-child::after{
                position: absolute;
                content: '';
                width: 34px;
                height: 35px;
                box-sizing: border-box;
                display: block;
                border-right: 1px dotted #314a60;
                left: -17px;
                top: 14px;
            }
            .tree-list-tit li:last-child ul li:last-child::after{
                border: none;
            }
        }
        .menu-title{
            height: 44px;
            line-height: 44px;
            color: #33495e;
            background-color: #f3f3f3;
            text-indent: 2em;
        }
        .from-wrap{
            padding-top: 20px;
            input{
                max-width: 275px;
            }
        }
        .par-button-grop{
            float: right;
            margin-right: 30px;
            display: none;
        }
        .tree-list-tit>li>p:hover{
            background-color: #f3f3f3;
        }
        .tree-list-tit>li p:hover .par-button-grop{
            display: block;
        }
        .button-grop{
            float: right;
            margin-right: 40px;
            display: none;
        }
        .tree-list-count li:hover .button-grop{
            float: right;
            display: block;
        }
    }
</style>