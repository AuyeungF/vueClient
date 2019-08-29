<template>
  <div class="container-bg">
    <div class="login-container container">
      <div class="container-title">登录中心</div>
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2"  class="demo-ruleForm">
        <el-form-item prop="username" ref="username">
          <el-input type="text" v-model="ruleForm2.username" autocomplete="off" placeholder="账号" @keypress.enter.native ="submitForm('ruleForm')">
          </el-input>
        </el-form-item>
        <el-form-item prop="pass" ref="password">
          <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" placeholder="请输入密码" @keypress.enter.native ="submitForm('ruleForm')">
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
          <div class="sign-in">
            <router-link to="/register">
              <i class="el-icon-back">注册</i>
            </router-link>
          </div>
        </div>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      ruleForm2: {
        username:'',
        pass: '',
      },
      rules2: {
        username : [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pass  : [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
    }
  },
  created() {
  },
  methods:{
    submitForm(formName) {
      let that =this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var param = {
            username:this.ruleForm2.username,
            password:this.ruleForm2.pass
          };
          this.postRequest('/api/login',param)
            .then(res=>{
              if(res.code == 5) {
                this.$alert(res.message, '提示', {
                  confirmButtonText: '确定',
                  callback:action => {
                    this.ruleForm2.pass = '';
                    this.resetForm('password');
                  }
                })
              }else if(res.code == 4){
                this.$alert(res.message, '提示', {
                  confirmButtonText: '确定',
                  callback:action => {
                    this.ruleForm2.username = '';
                    this.ruleForm2.pass = '';
                    this.resetForm('ruleForm2');
                  }
                })
              } else {
                that.$store.dispatch('setToken',param.username);
                const loading = this.$loading({
                  lock: true,
                  text: res.message,
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                  loading.close();
                  this.$router.push("/dashboard");
                }, 2000);

              }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].clearValidate();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .container-bg{
    background: linear-gradient(180deg, #0c223d 10px, #061220 50%);
    .login-container{
       .login-btn button{
         width:100%;
       }
       .sign-in{
         margin-top:10px;
         text-align: right;
         a{
           color: #FFF;
           &:hover{
             color: #0078FF;
           }
         }
       }
     }
  }
</style>
