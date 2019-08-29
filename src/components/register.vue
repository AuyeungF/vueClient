<template>
  <div class="container-bg">
    <div class="register-container container">
      <div class="container-title">注册</div>
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2"  class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm2.username" autocomplete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <div class="register-btn">
          <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
          <div class="sign-in">
            <router-link to="/login">
              <i class="el-icon-back">登录</i>
            </router-link>
          </div>
        </div>
      </el-form>
    </div>
  </div>

</template>

<script>
    export default {
        name: "signIn",
        data () {
        var validateUsername = (rule, value, callback) => {
          if (value === '') {
            return callback(new Error('账号不能为空'));
          } else {
           callback();
          }
        };
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            callback();
          }
        };
        return {
          ruleForm2: {
            username:'',
            pass: '',
          },
          rules2: {
            username: [
              { validator: validateUsername, trigger: 'change' }
            ],
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ]
          }
        }
      },
        methods:{
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var param = {
                username:this.ruleForm2.username,
                password:this.ruleForm2.pass,
              };
              this.postRequest('/api/createAccount',param).then(res=>{
                this.$refs[formName].resetFields();
                this.$message({
                  message: res.message,
                  type: 'success'
                });
              })
            } else {
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped lang="less">
  .register-btn button{
    width:100%;
  }
  .sign-in{
    margin-top:10px;
    text-align: right;
    a{
      display: block;
      color: #FFF;
      &:hover{
        color: #0078FF;
      }
    }

  }
</style>
