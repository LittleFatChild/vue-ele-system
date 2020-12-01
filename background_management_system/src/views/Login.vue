<template>
    <div class="login">
        <div class="content">
            <div class="nav">
                <router-link to="/login/sign" tag="el-button" type="primary" class="signbtn">登录</router-link>
                <router-link to="/login/register" tag="el-button" type="primary" class="signbtn">注册</router-link>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',

}
</script>

<style scoped lang="scss">
    .login{
        width: 100%;
        height: 100%;
        background-color: #344A5F;
    }

    .content{
        padding-top: 200px;
        width: 330px;
        margin: 0 auto;
    }

    .nav{
        text-align: center;
        padding-bottom: 15px;
    }

    .signbtn{
        width: 88px;
        height: 36px;
        background-color: #344A5F;
        color: #fff;
        border: none;
    }
    
    .router-link-exact-active {
    //   color: deeppink;
        width: 88px;
        height: 36px;
        background-color: #304256;
        color: #fff
    }
</style>
