<template>
    <div id="nav-warp">
        <div class="logo">
            <img src="../../assets/main.jpg" alt="" />
        </div>
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;"> -->
            <!-- <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button> -->
        <!-- </el-radio-group> -->
        <el-menu default-active="1-4-1" 
            class="el-menu-vertical-demo" 
            @open="handleOpen" 
            @close="handleClose" 
            :collapse="isCollapse" 
            background-color="#344a5f" 
            text-color="#ffffff" 
            router
            >
            <template v-for="(item,index) in routes">
                <el-submenu :index="item.path"  :key="index" v-if="!item.hidden">
                    <template slot="title" >
                        <svg-icon :iconName='item.mate.icon'/>
                        <span slot="title">{{ item.mate.name }}</span>
                    </template>
                    <!-- 二级路由 -->
                    <template v-for="itemChild in item.children">
                        <el-menu-item :index="itemChild.path" v-if="!itemChild.hidden" :key="itemChild.mate.id">
                            <!-- <span @click="rjoin( itemChild )"> -->
                                {{ itemChild.mate.name }}
                            <!-- </span> -->
                        </el-menu-item>
                    </template>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { ref, reactive, computed } from '@vue/composition-api';
import SvgIcon from '../../icons/components/Svgicon';

export default {
    components: {
        SvgIcon
    },
    setup( props, context ){
        //-------------------------------------------------------------------------------data-------------------------------------------------------------------
        const isCollapse = computed( () => {
            return context.root.$store.getters['app/isCollapse']
        } );
        const routes = reactive(context.root.$router.options.routes);
        //------------------------------------------------------------------------------methods-----------------------------------------------------------------
        const handleOpen = reactive( (key, keyPath) => {
                context.root.$router.push( key )
            // }
        } )
        const handleClose = reactive((key, keyPath) => {
            // console.log(key, keyPath);
        })

        const rjoin = reactive( (item) => {
            console.log(111);
            console.log(item);
        } )

        return {
            isCollapse,
            handleOpen,
            handleClose,
            routes,
            rjoin
        }
    }
    
}

</script>

<style lang="scss" scoped>
#nav-warp {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: $Navwidth;
    background-color: #344a5f;
    @include webkit( 'transition',all 0.3s ease 0s );
    .logo {
        padding: 28px;
        text-align: center;
        @include webkit( 'transition',all 0.3s ease 0s )
    }
    ul{
        border: 0;
    }
}
</style>