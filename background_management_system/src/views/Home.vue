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
import { ref, reactive, onMounted, inject, computed } from '@vue/composition-api';
import aj from '@/api/login.js';
import { message } from 'element-ui';

//----------------------------------------------------------------------------Vue3.0-----------------------------------------------------------------------------------------
export default{
    setup( prop, context ){
    //-------------------------------------------------------------------------data-----------------------------------------------------------------------------------------
        // onMounted( () => {
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
        // });
       
        const isShow = ref(false);
        const isenabled = ref(true);
        const isSendEnabled = ref(false);
        const code = ref('发送验证码');
        const sure = ref('');
        const states_username = ref(false);
        const states_passwold = ref(false);
        const states_checkpsd = ref(false);
        const timer_delay = ref(null);
        let timerSend = ref(null);
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
    //---------------------------------------------------------------------------methods--------------------------------------------------------
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
                states_username.value = false;
                callback( new Error('请输入邮箱') );
            } else if( Rxg.gU( value ) ){
                states_username.value = false;
                callback( new Error('邮箱格式有误') );
            } else {
                states_username.value = true;
                callback()
            }
        } );
        let validatepswd = ( ( rule, value, callback ) => {
            if ( value === '' ) {
                states_passwold.value = false;
                callback( new Error('请输入密码') );
            } else if( Rxg.gP(value) ){
                states_passwold.value = true;
                callback(  )
            } else {
                states_passwold.value = false;
                callback( new Error('密码为6-20位或密码过于简单') );
            }
        } );
        let vaildatechps = ( ( rule, value, callback ) => {
            if( !isShow.value ){
                return callback();
            }
            if( value === ''){
                states_checkpsd.value = false
                callback( new Error('请再次输入密码') );
            } else if( ruleForm.password === value ){
                states_checkpsd.value = true
                callback()
            } else {
                states_checkpsd.value = false
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
        //  切换事件
        const isActive = ( (item) => {
            list.map (item => item.fig = false);
            item.fig = true;
            isShow.value = list[1].fig;
            isenabled.value = true;
            code.value = '发送验证码';
            clearTimeout(timer_delay.value);    
            clearInterval(timerSend.value);
            timer_delay.value = null;
            timerSend.value = null;
            isSendEnabled.value = false;
            context.refs['ruleForm'].resetFields(); //切换内容清空
        } );
        //  验证码事件
        const sendrule = ( () => {
            if( isShow.value ){
                if( !( states_username.value && states_passwold.value && states_checkpsd.value ) ){
                    return validates();
                }
                code.value = '发送中';
                timer_delay.value = setTimeout(() => {
                    const data = {
                        username: ruleForm.username,
                        password: ruleForm.password,
                        module: !isShow.value ? 'login' : 'register'
                    }
                    aj.get_code( 'post', '/getSms/',data).then( res => {
                        context.root.$message.success( res.data.message );
                        sure.value = res.data.message.substr(11);
                        isSendEnabled.value = !isSendEnabled.value;
                        let t = 60;
                        isenabled.value = false 
                        timerSend.value = setInterval(() => {
                            t--;
                            code.value = '重新发送('+t+')'
                            if( t <= 0 ){
                                code.value = '重新发送';
                                clearInterval(timerSend.value);
                                timerSend.value = null;
                                isSendEnabled.value = !isSendEnabled.value;
                            }
                        }, 1000);
                    } , rej => {
                        console.log( rej );
                        return false
                    }).catch( err => {
                        console.log( 'Its error',err);
                        return false
                    });
                    clearTimeout(timer_delay.value)
                }, 1200);
            }else{
                if( !(states_username.value && states_passwold.value) ){
                    return validates();
                }
                code.value = '发送中';
                isSendEnabled.value = !isSendEnabled.value;
                timer_delay.value = setTimeout(() => {
                    const data = {
                        username: ruleForm.username,
                        password: ruleForm.password,
                        module: !isShow.value ? 'login' : 'register'
                    }
                    aj.get_code( 'post', '/getSms/',data).then( res => {
                        context.root.$message.success( res.data.message );
                        sure.value = res.data.message.substr(11);
                        let t = 60;
                        isenabled.value = false 
                        timerSend.value = setInterval(() => {
                            t--;
                            code.value = '重新发送('+t+')'
                            if( t <= 0 ){
                                code.value = '重新发送';
                                clearInterval(timerSend.value);
                                timerSend.value = null;
                                isSendEnabled.value = !isSendEnabled.value;
                            }
                        }, 1000);
                    } , rej => {
                        console.log( rej );
                        // code.value = '重新发送';
                        // clearInterval(timerSendvalue.value);
                        // isSendEnabled.value = !isSendEnabled.value;
                        return false
                    }).catch( err => {
                        console.log( 'Its error',err);
                        return false
                    });
                clearTimeout(timer_delay.value)
                }, 1200);
            } 
        } )
        //  登录注册事件
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
                    aj.get_code( 'post', '/register/', data).then( res => {
                        context.root.$message.success( res.data.message );//注册成功
                        code.value = '发送验证码';
                        isActive( list[0] )
                        isenabled.value = false ;
                    } , rej => {
                        console.log( rej );
                        // context.root.$message.error( '账户已经存在' );
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
                        code: ruleForm.vilecode,//sure.value,
                    }
                    context.root.$store.dispatch('app/login',data).then( res => {
                        console.log( res );
                        context.root.$message.success( res.data.message );
                        let npage = context.root.$router.push({
                            path: '/home/Homepage',
                        })
                        isenabled.value = false;
                        window.open( npage.herf, '_self' );
                    }, rej => {
                        console.log( rej );
                        return false;
                    } ).catch( err => {
                        console.log( err );
                        return false;
                    } )
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
        
    //------------------------------------------------------------------------Auxiliary-------------------------------------------------------------
        // 获取验证码, 验证属性
        const validates = () =>{
            if( isShow.value ){
                const _filed = [
                    { filed: 'username',flag: states_username.value, alt:'用户名格式错误' },
                    { filed: 'password',flag: states_passwold.value, alt:'密码格式错误' },
                    { filed: 'checkpsw',flag: states_checkpsd.value, alt:'重复密码错误' }
                ].every( (item) => {
                    if( !item.flag ){
                        context.root.$message.error( item.alt );
                        return false;
                    }
                    return true
                })
                return _filed;
            }else{
                const _filed = [
                    { filed: 'username',flag: states_username.value, alt:'用户名格式错误' },
                    { filed: 'password',flag: states_passwold.value, alt:'密码格式错误' },
                ].every( (item) => {
                    if( !item.flag ){
                        context.root.$message.error( item.alt );
                        return false;
                    }
                    return true
                })
                return _filed;
            }
        }

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
    height: 78.5vh;
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
