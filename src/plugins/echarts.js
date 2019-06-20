import Vue from 'vue'
import echarts from 'echarts/lib/echarts' // refers to components/ECharts.vue in webpack

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/boxplot'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/dataZoom'
import 'echarts/extension/dataTool'

Vue.prototype.$echarts = echarts

export default Vue.prototype.$echarts;
