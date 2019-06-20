<template>
   <div class="line-chart top10">
     <div id="charts" :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart" />
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
          type:String,
          default:'400px'
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

<style scoped>
  .line-chart{
    box-shadow: 1px 0px 10px #ccc;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }
</style>
