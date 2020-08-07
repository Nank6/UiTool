<template>
  <div class="sys-page">
    <v-title title="图表"/>
    <v-notes>图表使用echarts组件，详细配置请参考echarts官网文档。</v-notes>
    <v-section title="线形图">
      <v-toolbar>
        <el-button type="primary" @click="getChartData">刷新数据</el-button>
      </v-toolbar>
      <chart1 :chart-data="chartData"/>
    </v-section>
  </div>
</template>

<script>
import Chart1 from './Chart1'

export default {
  name: 'Charts',
  components: { Chart1 },
  data() {
    return {
      chartData: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getChartData()
    })
  },
  methods: {
    getChartData() {
      this.request('get', '/charts', {}).then((res) => {
        this.chartData = res.data
      })
    }
  }
}
</script>
