<template>

   <div class="framework-report" :style="{height:parentHeight + 'px'}">
     <el-row :gutter="20">
       <el-col :span="6">
         <div class="grid-content bg-purple">
           <i class="fr-card el-icon-user-solid grid-con-1"></i>
           <div class="fr-text">
             <div class="grid-mun">1234</div>
             <div>用户访问量</div>
           </div>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple">
           <i class="fr-card el-icon-message-solid grid-con-2"></i>
           <div class="fr-text">
             <div class="grid-mun">321</div>
             <div>系统消息</div>
           </div>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple">
           <i class="fr-card el-icon-goods grid-con-3"></i>
           <div class="fr-text">
             <div class="grid-mun">5000</div>
             <div>数量</div>
           </div>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple">
           <i class="fr-card el-icon-s-operation grid-con-4"></i>
           <div class="fr-text">
             <div class="grid-mun">100</div>
             <div>增加功能</div>
           </div>
         </div>
       </el-col>
     </el-row>
      <line-chart :chartData="options"/>
   </div>
</template>

<script>
  import lineChart from './echarts/line-echarts.vue'
    export default {
        name: "",
        props:['parentHeight'],
        mounted(){

        },
      components:{
          lineChart,
        },
        data(){
          return{
           options:{
             tooltip: {
               trigger: 'axis',
             },
             legend: {
               icon: 'rect',
               itemWidth: 15,
               itemHeight: 8,
               itemGap: 10,
               data: ['本月流量', '上月流量'],
               right: '20px',
               textStyle: {
                 fontSize: 12,
                 color: '#ccc'
               }
             },
             xAxis: [{
               type: 'category',
               boundaryGap: false,
               data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'],
             }],
             yAxis: [{
               type: 'value',
               splitLine: {
                 show: false
               }
             }],
             series: [{
               name: '本月流量',
               type: 'line',
               smooth: true,
               itemStyle: {normal: {areaStyle: {type: 'default', color: '#00d7bf', opacity: '0.2'}, color: '#00d7bf'}},
               lineStyle: {color: '#00d7df', opacity: 0.2},
               data: [12330, 12334, 13300, 13444, 13000, 12567, 13400, 12450, 13000, 13200, 12343, 13452, 12345, 12333, 12345, 12456, 13456]
             },
               {
                 name: '上月流量',
                 type: 'line',
                 smooth: true,
                 itemStyle: {normal: {areaStyle: {type: 'default', color: '#c4b03d', opacity: '0.2'}, color: '#c4b03d'}},
                 data: [11200, 16534, 10433, 10678, 11435, 10444, 11000, 11450, 11000, 10200, 11343, 10452, 11345, 10333, 11234, 10234, 10222]

               }]
           },
          }
        },
        methods: {

        }
    }

</script>

<style scoped lang="less">
  /*.echarts {*/
    /*border-radius: 10px;*/
    /*overflow: hidden;*/
  /*}*/
.grid-content{
  -webkit-box-shadow: 1px 0px 5px #ccc;
  -moz-box-shadow: 1px 0px 5px #ccc;
  box-shadow: 1px 0px 5px #ccc;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  align-items: center;
  .grid-con-1{
    background: #0078FF;
  }
  .grid-con-2{
    background: #64d572;
  }
  .grid-con-3{
    background: #f25e43;
  }
  .grid-con-4{
    background: #af2fd5;
  }
  .fr-card{
    text-align: center;
    font-size:50px;
    width:100px;
    height:100px;
    line-height:100px;
  }
  .fr-text{
    flex: 1;
    text-align: center;
    color: #999;
    .grid-mun{
      color: #0078FF;
      font-weight:700;
      font-size:30px;
    }

  }
}

</style>
