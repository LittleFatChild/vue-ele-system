<template>
    <div id="main-warp">
        <router-view></router-view>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    #main-warp{
        position: fixed;
        left: $Navwidth;
        top: $LayoutHeader;
        right: 0;
        bottom: 0;
        border: 30px solid #f7f7f7;
        font-size: 16px;
    }
</style>