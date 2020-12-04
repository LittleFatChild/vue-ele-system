<template>
    <div class="sign">
        <div class="content">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="330px" class="demo-ruleForm" :label-position="labelPosition">
                <el-form-item label="邮箱" prop="username">
                    <el-input type="test" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="vilecode">
                    <el-col :span="16">
                        <el-input v-model="ruleForm.vilecode" class="ruleofinp"></el-input>
                    </el-col>
                     <el-col :span="2">
                        <el-button type="primary" class="sendrule">发送验证码</el-button>
                        <span class="tishi">默认状态</span>
                    </el-col>
                </el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" class="signit">提交</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
import reg from '../../utils/validdate.js'
export default {
    name: 'Sign',
    data() {
        var validatevcde = ( rule, value, callback ) => {
            let reg = /^[a-z0-9]{6}$/;
            // this.ruleForm.vilecode = value = iVt(value);
            if (!value) {
                return callback(new Error('验证码不能为空'));
            }
            setTimeout(() => {
                if ( !reg.test(value) ) {
                    callback( new Error('验证码为六位字符') );
                } else {
                    callback();
                }
            }, 800);
        };
        var validateuser = (rule, value, callback) => {
            var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            // this.ruleForm.username = value = eVt(value);
            if ( value === '' ) {
                callback( new Error('请输入邮箱') );
            } else if( !reg.test( value ) ){
                callback( new Error('邮箱格式有误') );
            } else {
                callback()
            }
        };
        var validatepswd = (rule, value, callback) => {
            let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
            if ( value === '' ) {
                callback( new Error('请输入密码') );
            } else if( reg.test(value) ){
                callback(  )
            } else {
                callback( new Error('密码为6-20位或密码过于简单') );
            }
      };
        return {
            labelPosition: 'top',
            ruleForm: {
                username: '',
                password: '',
                vilecode: ''
            },
            rules: {
                username: [
                    { validator: validateuser, trigger: 'blur' }
                ],
                password: [
                    { validator: validatepswd, trigger: 'blur' }
                ],
                vilecode: [
                    { validator: validatevcde, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
        this.$refs[formName].validate( (valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="scss">
    .content{
        margin: 0 auto;
        width: 330px;
        .demo-ruleForm{
            width: 100%;
            height: 100%;
        }

        .ruleofinp{
            width: 212px;
        }

        .sendrule{
            width: 106px;
            height: 40px;
            // color: #fff;
            background-color: #67c239;
            border: none;
            margin-left: 3px;
            margin-top: 1px;
        }

        .el-form-item{
            height: 80px;
        }
        
        .el-form-item__label{
            color: #fff;
            font-size: 14px;
            height: 40px;
            padding-bottom: 15px;
        }

        .signit{
            width: 330px;
            height: 40px;
            background-color: #fab6b7;
            font-size: 14px;
            border: none;
            margin-top: 17px;
        }

        .el-form-item--feedback{
            margin: 15px 0;
            padding-top: 9px;
        }

        .tishi{
            position: absolute;
            top: 38px;
            right: 28px;
            font-size: 12px;
            color: #6e7c87;
        }
    }
</style>
