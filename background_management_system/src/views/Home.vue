<template>
    <div class="home">
        <div class="nav">
            <ul >
                <li v-for="item in list" :key="item.id" :class="{ 'active': item.fig }" @click="isActive(item)"> {{ item.name }} </li>
            </ul>
        </div>
        <div class="content">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" >
                <el-form-item prop="username" class="form-item first">
                    <label for="emil">邮箱</label>
                    <el-input id="emil" type="test" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password" class="form-item">
                    <label for="pass">密码</label>
                    <el-input id="pass" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>  
                <el-form-item prop="checkpsw" class="form-item" v-show="isShow">
                    <label for="regckps">确认密码</label>
                    <el-input id="regckps" type="password" v-model="ruleForm.checkpsw" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="vilecode" class="form-item">
                    <label for="code">验证码</label>
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <el-input id="code" v-model="ruleForm.vilecode" class="ruleofinp"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="primary" class="sendrule" @click="sendrule" :disabled="isSendEnabled">{{ code }}</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="signit" :disabled="isenabled" >{{ !isShow ? '登录':'注册'}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Rxg from '../utils/validdate.js';
import { ref, reactive, onMounted, inject } from '@vue/composition-api';
import { get_code } from '@/api/login.js';
import { message } from 'element-ui';

//----------------------------------------------------------------------------Vue3.0-----------------------------------------------------------------------------------------
export default{
    setup( prop, context ){
    //------------------------------------------------data-------------------------------------------
        onMounted( () => {
        //     // console.log('====>>>>',process.env.NODE_ENV)
        //     get_code( 
        //         'post', 
        //         'url',
        //         {
        //         firstName: 'Fred',
        //         lastName: 'Flsas'
        //     }).then( res => {

        //     }).catch( err => {
        //         //console.log('====>>>>',err)
        //     })
        });
       
        const isShow = ref(false);
        const isenabled = ref(true);
        const isSendEnabled = ref(false);
        const code = ref('发送验证码');
        const sure = ref('');
        const timer_delay = ref(null)
        const list = reactive([
            { id: 232526, name: '登录', fig: true, type: 'login'},
            { id: 232527, name: '注册', fig: false, type: 'register'}
        ]);
        
        const ruleForm = reactive( {
            username: '',
            password: '',
            vilecode: '',
            checkpsw: '',
        });

        
    //------------------------------------------------methods-------------------------------------------
        let validatevcde = ( ( rule, value, callback ) => {
            value = Rxg.iVp( value );
            ruleForm.vilecode = value;
            if (!value) {
                return callback(new Error('验证码不能为空'));
            }else{
                setTimeout( () => {
                    if ( Rxg.gC(value) ) {
                        callback( new Error('验证码为六位字符') );
                    } else if( sure.value !== ruleForm.vilecode ){
                        context.root.$message.error( '验证码错误' );
                        callback( new Error('验证码错误') );
                    } else {
                        callback();
                    }
                }, 800);
            }
        });
        let validateuser = ( (rule, value, callback) => {
            value = Rxg.iVp( value, 'email' );
            ruleForm.username = value;
            if ( value === '' ) {
                callback( new Error('请输入邮箱') );
            } else if( Rxg.gU( value ) ){
                callback( new Error('邮箱格式有误') );
            } else {
                callback()
            }
        } );
        let validatepswd = ( ( rule, value, callback ) => {
            if ( value === '' ) {
                callback( new Error('请输入密码') );
            } else if( Rxg.gP(value) ){
                callback(  )
            } else {
                callback( new Error('密码为6-20位或密码过于简单') );
            }
        } );
        let vaildatechps = ( ( rule, value, callback ) => {
            if( !isShow.value ){
                return callback();
            }
            if( value === ''){
                callback( new Error('请再次输入密码') );
            } else if( ruleForm.password === value ){
                callback()
            } else {
                callback( new Error('两次输入的密码不一致') )
            }
        } );
        const rules = reactive({
            username: [
                { validator: validateuser, trigger: 'blur' }
            ],
            password: [
                { validator: validatepswd, trigger: 'blur' }
            ],
            checkpsw: [
                { validator: vaildatechps, trigger: 'blur' }
            ],
            vilecode: [
                { validator: validatevcde, trigger: 'blur' }
            ]
        })

        const isActive = ( (item) => {
            list.map (item => item.fig = false);
            item.fig = true;
            isShow.value = list[1].fig;
            isenabled.value = true;
            code.value = '发送验证码'
            context.refs['ruleForm'].resetFields(); //切换内容清空
        } );

        const sendrule = ( () => {
            if( isShow.value ){
                if( ruleForm.username == '' || ruleForm.password == '' || ruleForm.checkpsw == '' ){
                    context.root.$message.error( '邮箱或密码为空' );
                    return false;
                }
                code.value = '发送中';
                timer_delay.value = setTimeout(() => {
                    const data = {
                        username: ruleForm.username,
                        password: ruleForm.password,
                        module: !isShow.value ? 'login' : 'register'
                    }
                    get_code( 'post', '/getSms/',data).then( res => {
                        context.root.$message.success( res.data.message );
                        sure.value = res.data.message.substr(11);
                        isSendEnabled.value = !isSendEnabled.value;
                        let timerSend = null;
                        let t = 5;
                        isenabled.value = false 
                        timerSend = setInterval(() => {
                            t--;
                            code.value = '重新发送('+t+')'
                            if( t <= 0 ){
                                code.value = '重新发送';
                                clearInterval(timerSend);
                                timerSend = null;
                                isSendEnabled.value = !isSendEnabled.value;
                            }
                        }, 1000);
                    } , rej => {
                        console.log( rej );
                        context.root.$message.error( '邮箱不存在' );
                        return false
                    }).catch( err => {
                        console.log( 'Its error',err);
                        return false
                    });
                    clearTimeout(timer_delay.value)
                }, 1200);
            }else{
                if( ruleForm.username == '' || ruleForm.password == '' ){
                    context.root.$message.error( '邮箱或密码为空' );
                    return false;
                }
                code.value = '发送中';
                isSendEnabled.value = !isSendEnabled.value;
                timer_delay.value = setTimeout(() => {
                    const data = {
                        username: ruleForm.username,
                        password: ruleForm.password,
                        module: !isShow.value ? 'login' : 'register'
                    }
                    get_code( 'post', '/getSms/',data).then( res => {
                        context.root.$message.success( res.data.message );
                        sure.value = res.data.message.substr(11);
                        let timerSend = null;
                        let t = 5
                        isenabled.value = false 
                        timerSend = setInterval(() => {
                            t--;
                            code.value = '重新发送('+t+')'
                            if( t <= 0 ){
                                code.value = '重新发送';
                                clearInterval(timerSend);
                                timerSend = null;
                                isSendEnabled.value = !isSendEnabled.value;
                            }
                        }, 1000);
                    } , rej => {
                        console.log( rej );
                        context.root.$message.error( '邮箱已存在' );
                        return false
                    }).catch( err => {
                        console.log( 'Its error',err);
                        return false
                    });
                clearTimeout(timer_delay.value)
                }, 1200);
            } 
        } )

        const submitForm = ( (formName) => {
            if( isShow.value ){
                context.refs[formName].validate( (valid) => {
                if( valid ){
                    isenabled.value = true;
                    let data = {
                        username: ruleForm.username,
                        password: ruleForm.password,
                        code: ruleForm.vilecode,
                    }
                    get_code( 'post', '/register/', data).then( res => {
                        context.root.$message.success( '注册成功' );
                        code.value = '发送验证码'
                        isenabled.value = false 
                    } , rej => {
                        console.log( rej );
                        context.root.$message.error( '账户已经存在' );
                        return false
                    }).catch( err => {
                        console.log( 'Its error',err);
                        return false
                    });
                    context.refs['ruleForm'].resetFields();
                } else {
                        console.log('error register');
                        console.log(valid);
                        return false
                    }
                })
            }else{
                context.refs[formName].validate( (valid) => {
                    if (valid) {
                        isenabled.value = true;
                    let data = {
                        username: ruleForm.username,
                        password: ruleForm.password,
                        code: ruleForm.vilecode,
                    }
                    get_code( 'post', '/login/', data).then( res => {
                        console.log(res)
                        context.root.$message.success( '登录成功' );
                        context.parent.$el.children[0].style.display = 'none';
                        let npage = context.root.$router.push({
                            path: 'Homepage',
                        })
                        window.open( npage.herf, '_self' );
                        isenabled.value = false;
                    } , rej => {
                        context.root.$message.error( '用户名或密码错误' );
                        console.log( rej );
                        return false
                    }).catch( err => {
                        console.log( 'Its error',err);
                        return false
                    });
                    context.refs['ruleForm'].resetFields();
                    } else {
                        console.log('error submit!!');
                        console.log(valid)
                        return false;
                    }
                    context.refs['ruleForm'].resetFields();
                });
            }
        } )
        
        
        return {
            isShow,
            list,
            ruleForm,
            rules,
            isActive,
            submitForm,
            sendrule,
            isenabled,
            isSendEnabled,
            code
        }
    }
}

//----------------------------------------------------------------------------Vue2.0-----------------------------------------------------------------------------------------
// export default {
//     name: "Home",
//     components: {

//     },
//     data () {
//         var validatevcde = ( rule, value, callback ) => {
//             value = Rxg.iVp( value );
//             this.ruleForm.vilecode = value;
//             if (!value) {
//                 return callback(new Error('验证码不能为空'));
//             }else{
//                 setTimeout( () => {
//                     if ( Rxg.gC(value) ) {
//                         callback( new Error('验证码为六位字符') );
//                     } else {
//                         callback();
//                     }
//                 }, 800);
//             }
//         };
//         var validateuser = (rule, value, callback) => {
//             if ( value === '' ) {
//                 callback( new Error('请输入邮箱') );
//             } else if( Rxg.gU( value ) ){
//                 callback( new Error('邮箱格式有误') );
//             } else {
//                 callback()
//             }
//         };
//         var validatepswd = ( rule, value, callback ) => {
//             if ( value === '' ) {
//                 callback( new Error('请输入密码') );
//             } else if( Rxg.gP(value) ){
//                 callback(  )
//             } else {
//                 callback( new Error('密码为6-20位或密码过于简单') );
//             }
//         };
//         var vaildatechps = ( rule, value, callback ) => {
//             if( !this.isShow){
//                 return callback();
//             }
//             console.log('执行');
//             if( value === ''){
//                 callback( new Error('请再次输入密码') );
//             } else if( this.ruleForm.password === value ){
//                 callback()
//             } else {
//                 callback( new Error('两次输入的密码不一致') )
//             }
//         }
//         return {
//             list: [
//                 { id: 232526, name: '登录', fig: true, type: 'login'},
//                 { id: 232527, name: '注册', fig: false, type: 'register'}
//             ],
//             isShow: false,
//             ruleForm: {
//                 username: '',
//                 password: '',
//                 vilecode: '',
//                 checkpsw: ''
//             },
//             rules: {
//                 username: [
//                     { validator: validateuser, trigger: 'blur' }
//                 ],
//                 password: [
//                     { validator: validatepswd, trigger: 'blur' }
//                 ],
//                 checkpsw: [
//                     { validator: vaildatechps, trigger: 'blur' }
//                 ],
//                 vilecode: [
//                     { validator: validatevcde, trigger: 'blur' }
//                 ]
//             }
//         }
//     },
//     methods: {
//         isActive(item){
//             this.list.map (item => item.fig = false);
//             item.fig = true;
//             this.isShow = this.list[1].fig;
//         },
//         submitForm(formName) {
//             if( this.isShow ){
//                 this.$refs[formName].validate( (valid) => {
//                 if( valid ){
//                     alert('register');
//                     let obj = {
//                         id: new Date().getTime(),
//                         username: this.ruleForm.username,
//                         password: this.ruleForm.password,
//                     }
//                     this.$store.commit('increment',obj);
//                     } else {
//                         console.log('error register');
//                         return false
//                     }
//                 })
//             }else{
//                 this.$refs[formName].validate( (valid) => {
//                     if (valid) {
//                         alert('submit!');
//                     } else {
//                         console.log('error submit!!');
//                         console.log(valid)
//                         return false;
//                     }
//                 });
//             }
//         }
//     }
// };
</script>

<style lang="scss" scoped>
.home{
    height: 100vh;
    width: 100%;
    background-color: #344A5F;
    padding-top: 200px;
    .nav{
        margin: 0 auto;
        width: 330px;
        height: 40px;
        .active{
            background-color:rgba(0, 0, 0, 0.1);
        }
        ul{
            text-align: center; 
            li{
                display: inline-block;
                font-size: 14px;
                width: 88px;
                line-height: 36px;
                color: #fff;
                border-radius: 2px;
            }
        }
    }
    .content{
        width: 330px;
        margin: 0 auto;
        label{
            width: 330px;
            display: block;
            font-size: 14px;
            color: #fff;
            margin-bottom: 3px;
        }
        .form-item{
            margin-bottom: 13px;
        }
        .signit{
            display: block;
            width: 100%;
            margin-top: 26px;
            height: 40px;
        }
        .sendrule{
            display: block;
            height: 40px;
            width: 100%;
            margin-top: 1px;
        }
        .first{
            margin-top: 22px;
        }
    }
}
</style>
