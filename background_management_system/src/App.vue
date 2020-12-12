<template>
    <div id="app">
        <div id="nav">
            <!-- <router-link to="/home" >Home</router-link> 
            |
            <router-link to="/login">Login</router-link> -->
            <!-- | -->
            <!-- <router-link to="/index">vue3.0</router-link> -->
            <!-- |
            <router-link to="/Homepage">Homepage</router-link> -->
        </div>
        <router-view />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ref, reactive, onMounted, provide } from '@vue/composition-api'
export default({
    setup( prop, context){

        return {

        }
    }
})
</script>

<style lang="scss">
    #app {
        // font-family: Avenir, Helvetica, Arial, sans-serif;
        // width: 100%;
        // height: 100%;
        // overflow: hidden;
    }

    #nav {
        // background-color: #344A5F;
        // height: 0px;
        // // margin: 0 auto;
        // a {
        //     font-weight: bold;
        //     color: #F7FC4C;

        //     &.router-link-active {
        //         color: #42b983;
        //     }
        // }
    }
</style>
