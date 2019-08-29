<template>

   <div class="framework-report" :style="{height:parentHeight + 'px'}">
     <div class="report-data">
       <el-row :gutter="20">
         <el-col :span="16">
           <div class="grid-content bg-purple">
             <div class="amount">
               <div class="amount-price">
                 <span>1234567</span>
                 <span>123456<i class="el-icon-top"></i></span>
               </div>
               <div class="amount-text">销售金额</div>
             </div>
           </div>
         </el-col>
         <el-col :span="8">
           <div class="grid-content bg-purple">
             <el-row>
               <el-col :span="8">
                 <div class="grid-content bg-purple">
                   <div class="volume list-item">
                     <div class="volume-num list-item-num">{{volume}}</div>
                     <div class="volume-text list-item-text">商品销量</div>
                   </div>
                </div>
               </el-col>
               <el-col :span="8">
                 <div class="grid-content bg-purple-light">
                   <div class="shipment list-item">
                     <div class="shipment-num list-item-num">{{shipment}}</div>
                     <div class="shipment-text list-item-text">出货量</div>
                   </div>
                 </div>
               </el-col>
               <el-col :span="8">
                 <div class="grid-content bg-purple">
                   <div class="cargo list-item">
                     <div class="cargo-num list-item-num">{{cargo}}</div>
                     <div class="cargo-text list-item-text">入货量</div>
                   </div>
                 </div>
               </el-col>
             </el-row>
           </div>
         </el-col>
       </el-row>
     </div>
      <line-chart :chartData="options" :height="parentHeight"/>
   </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import lineChart from './echarts/line-echarts.vue'
    export default {
        name: "",
        props:['parentHeight'],
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
               show:false,
               itemWidth: 15,
               itemHeight: 8,
               itemGap: 10,
               data: ['本月流量', '上月流量'],
               right: '20px',
               textStyle: {
                 fontSize: 12,
                 color: '#FFF',

               }
             },
             grid:{
               x: 80,
               y: 60,
               x2: 80,
               y2: 60,
               containLabel: true
             },
             xAxis: [{
               type: 'category',
               boundaryGap: false,
               axisLine: {
                 show: false
               },
               axisTick: {
                 show: true,
                 length: 10,
                 lineStyle: {
                   color: "#0c223d"
                 }
               },
               axisLabel: {
                 margin: 30,
                 color: '#ffffff'
               },
               splitLine: {
                 show: true,
                 lineStyle: {
                   color: '#0c223d'
                 }
               },
               data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
             }],
             yAxis: [{
               type: 'value',
               axisLine: {
                 show: false
               },
               axisTick: {
                 show: true,
                 length: 10,
                 lineStyle: {
                   color: "#0c223d"
                 }
               },
               splitLine: {
                 show: true,
                 lineStyle: {
                   color: '#0c223d'
                 }
               },
               axisLabel: {
                 margin: 30,
                 color: '#ffffff'
               },

             }],
             series: [{
               name: '本月流量',
               type: 'line',
               smooth: true,
               areaStyle: {
                 normal: {
                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                     { offset: 0.55,  color: 'rgba(176, 202, 234, 0.3)'},
                     { offset: 0.85,  color: 'rgb(165, 194, 230,0.02)'}], false),
                   shadowColor: 'rgba(94, 141, 197, 0.8)',
                   shadowBlur: 10,
                   shadowOffsetY:-15
                 }
               },
               itemStyle: {
                 normal: {
                   color: 'rgb(162, 192, 228,0.8)'
                 }
               },
               data: [15156, 10456, 15541, 1131, 13000, 2567, 3400, 12450, 3000, 3200, 12343, 13452]
             }]
           },
            volume:321,
            shipment:5000,
            cargo:1234
          }
        },
    }

</script>

<style scoped lang="less">
  .font(@size){
    font-size:@size;
  }
  .framework-report{
    padding:0 20px;
    .report-data{
      height: 120px;
      .amount{
        .font(30px);
        color: #FFF;
        .amount-price span:last-child{
          color: #30EB67;
          font-size: 15px;
        }
        .amount-text{
          font-size: 15px;
          color: #CCC;
        }
      }
      .list-item{
        .list-item-num{
          font-size:25px;
          &.volume-num{
            color: #30EB67;
          }
          &.shipment-num{
            color: #bf37e0;
          }
          &.cargo-num{
            color: #ec4646;
          }

        }
        .list-item-text{
          color: #ccc;
          font-size:13px;
        }
      }
    }
  }

</style>
