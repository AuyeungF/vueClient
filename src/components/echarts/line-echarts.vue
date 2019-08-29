<template>
   <div class="line-chart top10">
     <div class="charts-title">
       <el-row type="flex" class="row-bg" justify="space-between">
         <el-col :span="9">
           <div class="grid-content bg-purple">
             <div>本月报表</div>
           </div>
         </el-col>
         <el-col :span="9">
           <div class="grid-content bg-purple ">
             <div style="text-align: right;color: #CCC;">上月报表</div>
           </div>
         </el-col>
       </el-row>
     </div>
     <div class="charts-canvas">
       <div id="charts" :class="className" :id="id" :style="{height:height-190 + 'px',width:width}" ref="myEchart" />
     </div>
   </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
    export default {

      props: {
        className: {
          type:String,
          default:'yourClassName'
        },
        id:{
          type:String,
          default:'yourID'
        },
        width:{
          type:String,
          default:'100%'
        },
        height:{
          type:Number,
          default:'390'
        },
        chartData:{
          type:Object,
          default:()=>{}
      }
      },
      data() {
        return {

        }
      },
      mounted() {
      
        this.initChart();
        window.addEventListener('resize', this.init, 20);
      },
      methods: {
        initChart() {

          this.chart = this.$echarts.init(this.$refs.myEchart);
          // 把配置和数据放这里
          this.chart.setOption(this.chartData);
        },
        //echarts自适应
        init() {
          const self = this;
          self.chart = echarts.init(self.$refs.myEchart);
          self.chart.resize();
        }
      },
      destroyed(){
        //销毁echart自适应
        window.removeEventListener('resize', this.init, 20)
      }
    }
</script>

<style  scoped lang="less">
  @color:#FFF;

  .color(@color) {
    color: @color;
  }
  .border-style(@background){
    background:@background;
    font-size:15px;
    padding:5px 15px;
    border:2px transparent solid;
    border-image:linear-gradient(to right,rgba(6, 47, 97, 0.98),#061220) 1 10;
  }
  .charts-title{
    height:40px;
    line-height:40px;
    color: @color;
    .border-style(#05172d);

  }
  .charts-canvas{
    .border-style(transparent);
    border-top:none;
  }
</style>
