<template>
    <div id="head-warp">
        <div class="pull-left header-icon" @click="toggleMenu">
            <svg-icon iconName="menu"></svg-icon>
        </div>
        <div class="pull-right">
            <div class="userinfo">
                <img src="../../assets/touxiang.jpg" alt="">
            </div>
            <div class="header-icon" @click="exit">
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
        const exit = ( () => {
            context.root.$store.dispatch('app/exit').then( res => {
                context.root.$router.push({
                    name: 'Home'
                })
            } )
            context.root.$router.push()
        } )
        return {
            toggleMenu,
            exit
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
            display: inline-block;
            padding: 22px 30px;
            svg{
                font-size: 20px;
            }
        }
        .userinfo{
            height: 100%;
            padding: 0 32px;
            border-right: 1px solid #ccc;
            float: left;
            margin-top: 20px;
            img{
                width: 35px;
                height: 35px;
                display: inline-block;
                margin-right: 20px;
                border-radius: 50%;
            }
        }
    }
</style>