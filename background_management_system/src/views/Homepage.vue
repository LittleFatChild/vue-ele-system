<template>
    <div class="homepage">
        <div class="left">
            <div class='top'>
                <img src="../assets/main.jpg" alt="">
            </div>
            <div class="context">
                <ul>
                    <li v-for="item in list" :key="item.id" :class="item.ac? 'ac': ''" @click="tapit(item)">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { ref, reactive, onMounted } from '@vue/composition-api';
import { get_code } from '@/api/login.js';
export default {
    setup( prop, context ){
    //------------------------------------------------data-------------------------------------------
        let list = reactive([
            { 
                id: new Date().getTime(),
                name: '控制台',
                ac: true
            },
            {
                id: new Date().getTime()+1,
                name: '信息管理',
                ac: false
            },
            {
                id: new Date().getTime()+2,
                name: '用户管理',
                ac: false
            }
        ])
    //------------------------------------------------methods-------------------------------------------
        const tapit = reactive( (item) => {
            list.map ( item => {
                item.ac = false;
            } )
            item.ac = true;
            get_code( 'post','/uploadImgToken/',{
                categoryId: 1,
                startTiem: '2019-12-12 12:00:00',
                endTime: '2019-12-12 12:00:00',
                title: '手把手撸码前端',
                id: 12,
                pageNumber: 1,
                pageSize: 10
            }).then( res => {
                console.log( res );
            },rej =>{
                console.log( rej );
                return false;
            }).catch( err => {
                console.log( err );
                return false;
            })
        } )

        return {
            list,
            tapit
        }
    }
};
</script>

<style scoped lang="scss">
    .homepage{
        width: 100%;
        height: 100%;
        // background-color: blue;
        .left{
            width: 250px;
            height: 100%;
            background-color: #344a5f;
            .top{
                height: 113px;
                text-align: center;
                line-height: 113px;
                img{
                    width: 71px;
                    height: 60px;
                    vertical-align: middle;
                }
            }
        }
        .context{
            height: 100%;
            li{
                height: 50px;
                color: #fff;
                font-size: 14px;
                text-align: center;
                line-height: 50px;
                box-sizing: border-box;
                border-bottom: 1px solid #32475a;
            }
            .ac{
                background-color: #f66c6c;
            }
        }
    }
</style>
