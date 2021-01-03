<template>
    <div>
        <el-select v-model="data.defaultValue" placeholder="请选择" @change="select">
            <el-option v-for="item in data.option"
                :key="item.value"
                :value="item.value"
                :label="item.label"
            >

            </el-option>
        </el-select>
    </div>
</template>

<script>
import { ref , reactive , onMounted } from '@vue/composition-api';
export default {
    props: {
        option: {
            type: Object,
            default:{

            }
        },
        selectValue: {
            type: Object,
            defatule: {}
        }
    },
    setup( props , context ){
        const data = reactive({
            defaultValue: '无数据',
            option: [
                { value:'name' , label: '姓名' },
                { value:'id' , label: 'Id' },
                { value:'title' , label: '标题' },
                { value:'email' , label: '邮箱' },
                { value:'phone' , label: '电话' },
            ]
        })
        const initOPtion = () => {
            let option_arr = [];
            if(props.option.init.length == 0){
                context.root.$message({
                    type: 'error',
                    message: '初始化init未传入值'
                })
                return false
            }
            props.option.init.forEach( item => {
                let arr= data.option.filter( _item => {
                    return _item.value == item;
                })
                if(arr.length>0){
                    option_arr= [...option_arr,...arr]
                }
            } )
            if( option_arr.length ==0 ){
                context.root.$message({
                    type: 'error',
                    message: 'select初始化传值未匹配'
                })
                return false
            }
            data.option = option_arr;
            data.defaultValue = option_arr.length > 0 ? option_arr[0].value : data.defaultValue;
            select( data.defaultValue )
        }
        const select = ( (value) => {
            let _select = data.option.filter( item => item.value == value )[0];
            context.emit('update:selectValue',_select);
        })
        onMounted( () => {
            initOPtion()
        } )

        return {
            data,
            select
        }
    }
}
</script>

<style>

</style>