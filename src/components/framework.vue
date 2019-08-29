<template>
  <div>
    <el-container>
        <!-- 左边导航栏-->
         <div class="asidemenu" :width="menuWidth">
          <el-menu
            :router="true"
            :default-active="$route.path"
            backgroundColor="transparent"
            textColor="#FFF"
            class="el-menu-vertical-demo"
            :collapse-transition=collapseTransition
            :collapse=isCollapse
            ref="elemenuref"
            :unique-opened=uniqueOpen
            :style="{height:fullHeight+'px'}"
          >
            <div class="menu-logo">
              <img src="../assets/logo2.png" alt="">
            </div>
            <template v-for="(item,index) in $store.getters.routers" v-if="!item.hidden">
              <el-submenu :index="item.path" v-if="!item.leaf">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span slot="title">{{item.meta.title}}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path">
                    {{child.meta.title}}
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <template v-else v-for="(child,num) in item.children">
                <el-menu-item :index="child.path" class="dashboard">
                  <i :class="item.icon"></i>
                  <span slot="title">{{child.name}}</span>
                </el-menu-item>
              </template>
            </template>
          </el-menu>
        </div>
        <!-- 右边主题内容 -->
        <el-container>
          <!--</el-header>-->
          <el-main style="width: 100%;">
            <!--面包屑导航-->
            <div class="mainNavigation clearfix">
              <i class="status"></i>
              <el-breadcrumb separator="/" style="display: inline-block;">
                <template v-for="item in levelList">
                  <el-breadcrumb-item v-if="item.path !== '/dashboard'" :key="item.path" :to="'/'+item.path.replace('/','')">
                    {{item.meta.title}}
                  </el-breadcrumb-item>
                  <el-breadcrumb-item class="breadcrumb-item" v-else  :to="'/'+item.path.replace('/','')">
                    {{item.name}}
                  </el-breadcrumb-item>
                </template>
              </el-breadcrumb>
              <div class="main-tool" @click="logOut()">
                <i class="el-icon-switch-button"></i>
              </div>
            </div>
            <router-view :parentHeight="fullHeight-58"></router-view>
          </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>

  export default {
        name: "",
        data(){
          return{
            value:100,
            isCollapse:false,
            menuWidth:'200px',
            collapseTransition: true,
            uniqueOpen:true,
            fullHeight: document.documentElement.clientHeight,
            username:"",
            levelList:[]
          }
        },
        mounted(){
        let vm = this;
        // 自适应屏幕高度
        window.onresize = () => {
          return (() => {
            window.fullHeight = document.documentElement.clientHeight;
            vm.fullHeight = window.fullHeight;
          })()
        };
        vm.queryLoginUserInfo();
          vm.getBreadcrumb();
      },
        watch: {
          $route() {
            this.getBreadcrumb()
          }
        },
        methods:{
        menuToggle(){
          let vm = this;
          vm.isCollapse = !vm.isCollapse;

          //改变menu的宽度
          vm.menuWdithToggle();

        },
        menuWdithToggle(){
          let vm = this;
          if(vm.isCollapse) {
            vm.menuWidth = '65px'
          } else {
            vm.menuWidth = '201px'
          }
        },
        queryLoginUserInfo(){
          let vm = this;
          vm.username = this.$store.getters.token;
        },
        logOut(){
          this.$confirm('此操作将退出账号，是否继续?', '提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then( ()=>{
            //退出登录清除用户信息
            // this.Cookies.remove('token');
            localStorage.removeItem('token')
            this.$store.dispatch('setToken','');
            this.$store.dispatch('setRole','');
            this.$router.push('/login');
          })

        },
          // 初始化面包屑数据
        getBreadcrumb() {
            let me = this;
            let matched;
            if(this.$route.path == '/dashboard'){
              matched = this.$route.matched.filter(item=>item.name);
            } else {
              matched = this.$route.matched.filter(item=>item.meta);
            }
            if(matched&&matched.length>0){
              me.levelList = matched;
            }
          },

      }
    }
</script>

<style scoped lang="less">

  @-webkit-keyframes rotation{
    from {-webkit-transform: rotateY(0deg);}
    to {-webkit-transform: rotateY(360deg);}
  }

  .menu-logo{
    margin-top:10px;
    text-align: center;
    height:65px;
    background: rgba(12, 34, 61, 0.46);
    img {
      -webkit-transform: rotate(360deg);
      animation: rotation 10s linear infinite;
      -moz-animation: rotation 10s linear infinite;
      -webkit-animation: rotation 10s linear infinite;
      -o-animation: rotation 10s linear infinite;
    }
  }
  .el-menu-vertical-demo{
  border-right:2px solid rgba(6, 47, 97, 0.98);
  background: #05172d !important;
  .el-menu-item:hover{
    background-color: transparent !important;
  }

}

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
  .mainNavigation{
    line-height: 45px;
    height: 40px;
    text-align: left;
    padding-left: 10px;
    .status {
      display: inline-block;
      width:10px;
      height:10px;
      border-radius: 10px;
      background: #30EB67;
    }
  }
  .main-tool{
    display: inline-block;
    float: right;
    color: #FFF;
    cursor: pointer;
    font-size: 20px;
  }
</style>
