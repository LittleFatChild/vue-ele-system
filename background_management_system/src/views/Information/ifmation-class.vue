<template>
    <div class="ifmation-class">
        <div class="space-30"></div>
        <div class="header">
            <el-button type="danger" class="block">添加一级分类</el-button>
        </div>
        <hr class="thought">
        <div class="class-warp">
            <ul class="tree-list-tit">
                <li v-for="item in data" :key="item.title">
                    <p :class="item.fign? 'active' : '' " @click="openit(item)">{{ item.title }}</p>
                    <ul class="tree-list-count" v-show="item.fign">
                        <li v-for="itemchild in item.son_data" :key="itemchild.name">
                            {{ itemchild.name }}
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from '@vue/composition-api';

export default {
    components: {
    },
    setup( props, context ){
//------------------------------------------------------------------------onMounted------------------------------------------------------------
    //     onMounted( () => {
    //         aj.gD().then( res => {
    //             console.log( res )
    //         })
    //     } )
//------------------------------------------------------------------------data------------------------------------------------------------------
    const data = reactive( [
        {
            title: '新闻',
            fign: true,
            son_data: [
                { name: '国内' },
                { name: '国际' },
                { name: '数读' },
                { name: '军事' },
                { name: '航空' },
                { name: '无人机' }
            ],
        },
        {
            title: '科技',
            fign: false,
            son_data: [
                { name: '数学' },
                { name: '语文' },
                { name: '英语' },
                { name: '物理' },
                { name: '化学' },
                { name: '航天' }
            ],
        },
    ] )
//------------------------------------------------------------------------methods---------------------------------------------------------------
    const openit = reactive( ( item ) => {
        if( item.fign ){
            item.fign = false;
        }else{
            data.map( (item) => {
                item.fign = false
            } )
            item.fign = true;
        }
    })
        return {
            /////////////////////////////////////////////////////////////data////////////////////////////////////////////////////////////
            data,
            ////////////////////////////////////////////////////////////methods//////////////////////////////////////////////////////////
            openit
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
            border: 1px solid #e9e9e9;
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
    }
</style>