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
              <img src="../assets/logo.png" alt="">
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
                <el-menu-item :index="child.path">
                  <i :class="item.icon"></i>
                  <span slot="title">{{child.name}}</span>
                </el-menu-item>
              </template>
            </template>

          </el-menu>
        </div>
        <!-- 右边主题内容 -->
        <el-container>
          <!-- 头部 -->
          <el-header>
            <div class="frameHead-leftElement">
              <div class="frameHeader-toggle" @click="menuToggle">
                <i class="el-icon-s-fold" v-if="!isCollapse"></i>
                <i class="el-icon-s-unfold" v-if="isCollapse"></i>
              </div>
            </div>
            <div class="frameHead-rightElement">
              <!-- <img src="" alt="">-->
              {{username}}
              <div class="FRbox">
                <div class="fr-content">
                  <div class="frc-width">
                    账号设置
                  </div>
                </div>
                <div class="fr-content">
                  <div class="frc-width" @click=" logout">退出登录</div>
                </div>
              </div>
            </div>
            <div class="frameHead-rightElement" >
              <el-badge :value="value" :max="99" class="item" :hidden="value<=0 ? true:false">
               消息
              </el-badge>
            </div>
            <!--<div class="frameHead-rightElement-search">-->
              <!--<el-input placeholder="站内搜索" size="mini" clearable>-->
                <!--<i slot="prefix" class="el-input__icon el-icon-search"></i>-->
              <!--</el-input>-->
            <!--</div>-->

          </el-header>
          <el-main>
            <!--面包屑导航-->
            <div class="mainNavigation">
              <el-breadcrumb separator="/" style="display: inline-block">
                <template v-for="item in levelList">
                  <el-breadcrumb-item v-if="item.path !== '/dashboard'" :key="item.path" :to="'/'+item.path.replace('/','')">
                    {{item.meta.title}}
                  </el-breadcrumb-item>
                  <el-breadcrumb-item v-else  :to="'/'+item.path.replace('/','')">
                    {{item.name}}
                  </el-breadcrumb-item>
                </template>
              </el-breadcrumb>
            </div>
            <router-view :parentHeight="fullHeight - 140" class="top10"></router-view>
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
        logout(){
          this.$confirm('此操作将退出账号，是否继续?', '提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then( ()=>{
            //退出登录清除用户信息
            this.Cookies.remove('token');
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
          }

      }
    }
</script>

<style scoped lang="less">


  header{
    padding:0;
  }
  .menu-logo{
    text-align: center;
    height:60px;
    background: rgba(12, 34, 61, 0.46);
    img {
      height:inherit;
    }
  }
.el-menu-vertical-demo{
  border-right:2px solid rgba(6, 47, 97, 0.98);
  .el-menu-item:hover{
    background-color: transparent !important;
  }

}
  .frameHead-leftElement{
    width:100px;
    color: #FFF;
    text-align: center;
    line-height:55px;
    float: left;
    .frameHeader-toggle{
      height:inherit;
    }
    .frameHeader-toggle>i {
      font-size:30px;
      line-height:unset;
      &:hover{
        color: #409EFF;
      }
    }

  }
  .frameHead-rightElement{
    float: right;
    color: #ffffff;
    padding: 0px 20px;
    border-left: 1px #33373B solid;
    display: table-cell;
    cursor: pointer;
    line-height:60px;
    position: relative;
    .FRbox{
      min-width:100%;
      background: #000;
      position: absolute;
      top:60px;
      right:0;
      z-index:1000;
      display: none;
      text-align: center;
    }
    &:hover .FRbox{
      display: block;
    }
  }
  .frameHead-rightElement-search{
    float: right;
    color: #FFFFFF;
    padding:0px 20px;
    display: table-cell;
    cursor: pointer;
    height:60px;
    line-height:60px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
  .mainNavigation{
    border-bottom: .5px #D9DEE4 solid;
    line-height: 45px;
    height: 40px;
    text-align: left;
    padding-left: 10px;
  }
</style>
