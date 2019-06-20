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
             </div><template>

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
               <line-chart :chartData="options"/>
             </div>
           </template>

             <script>
               import echarts from 'echarts/lib/echarts'
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
                       xAxis: [{
                         type: 'category',
                         boundaryGap: false,
                         axisLabel: {
                           margin: 30,
                           color: '#ffffff'
                         },
                         data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'],
                       }],
                       yAxis: [{
                         type: 'value',
                         splitLine: {
                           show: false
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
                               { offset: 0.1,  color: 'rgba(255,255,255, 0.1)'},
                               { offset: 0.4,  color: 'rgba(255,255,255, 0)'}], false),
                             shadowColor: 'rgba(255,255,255, 0.9)',
                             shadowBlur: 2
                           }
                         },
                         itemStyle: {
                           normal: {
                             color: 'rgba(255,255,255, 0.9)',
                             shadowColor:'rgba(255,255,255 ,0.1)'
                           }
                         },
                         data: [12330, 12334, 13300, 13444, 13000, 12567, 13400, 12450, 13000, 13200, 12343, 13452, 12345, 12333, 12345, 12456, 13456]
                       }]
                     },
                     volume:321,
                     shipment:5000,
                     cargo:1234
                   }
                 },
                 computed:{

                 },
                 methods: {
                 }
               }

             </script>

             <style scoped lang="less">
               .report-data{
                 height: 60px;
                 .amount{
                   font-size:25px;
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

             </style>

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
