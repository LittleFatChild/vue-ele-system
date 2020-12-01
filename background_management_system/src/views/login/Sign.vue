<template>
    <div class="sign">
        <div class="content">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="330px" class="demo-ruleForm" :label-position="labelPosition">
                <el-form-item label="用户名" prop="pass">
                    <el-input type="test" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="age">
                    <el-col :span="16">
                        <el-input v-model.number="ruleForm.age" class="ruleofinp"></el-input>
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
export default {
    name: 'Sign',
    data() {
        var checkAge = ( rule, value, callback ) => {
            if (!value) {
                return callback(new Error('验证码不能为空'));
            }
            setTimeout(() => {
                if ( !Number.isInteger(value) ) {
                    callback( new Error('请输入数字值') );
                } else {
                if ( value < 18 ) {
                    callback( new Error('必须年满18岁') );
                } else {
                    callback();
                }
                }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if ( value === '' ) {
                callback(new Error('请输入用户名'));
            } else {
                if ( this.ruleForm.checkPass !== '' ) {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if ( value === '' ) {
                callback( new Error('请输入密码') );
            } else {
                callback();
            }
      };
        return {
            labelPosition: 'top',
            ruleForm: {
                pass: '',
                checkPass: '',
                age: ''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                age: [
                    { validator: checkAge, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>

<style lang="scss">
    .content{
        margin: 0 auto;
        width: 330px;
        height: 365px;
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
