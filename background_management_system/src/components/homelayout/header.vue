<template>
    <div id="head-warp">
        <div class="pull-left header-icon" @click="toggleMenu">
            <svg-icon iconName="menu"></svg-icon>
        </div>
        <div class="pull-right">
            <div class="uerinfo">
                <!-- <img src="../../../assets" alt=""> -->
            </div>
            <div class="header-icon">
                <svg-icon iconName="exit" className="exit"></svg-icon>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    setup( props, context ){
        const toggleMenu = ( () => { 
            context.root.$store.commit('app/SET_COLLAPSE');
         } )
         return {
            toggleMenu
         }
    }
}
</script>

<style lang="scss" scoped>
    #head-warp{
        position: fixed;
        top: 0;
        left:$Navwidth;
        right: 0;
        height: $LayoutHeader;
        .header-icon{
            padding: 22px 30px;
            svg{
                font-size: 20px;
            }
        }
        .userinfo{
            height: 100%;
            padding: 0 32px;
            border-right: 1px solid #ccc;
            background-color: red;
            img{
                width: 35px;
                height: 35px;
                display: inline-block;
                margin-top: 20px;
                margin-right: 20px;
                border-radius: 50%;
            }
        }
    }
</style>