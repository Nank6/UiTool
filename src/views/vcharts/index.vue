<template>
  <div class="sys-page">
    <ve-line :data="chartData" :settings="chartSettings" />
    <ve-histogram :data="chartData" :settings="chartSettings" />
    <ve-pie :data="chartData" />
  </div>
</template>
<script>
/* eslint-disable*/
import Vue from 'vue'
import VeLine from 'v-charts/lib/line.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import VePie from 'v-charts/lib/pie.common'
Vue.component(VeLine.name, VeLine)
Vue.component(VeHistogram.name, VeHistogram)
Vue.component(VePie.name, VePie)

export default {
  name: 'Vcharts',
  data: function() {
    this.chartSettings = {
        dimension: ['日期'],
        metrics: ['下单用户','访问用户']
    }
    return {
      chartData: {
        columns: ['日期', '访问用户', '下单用户'],
          rows: [
            { '日期': '2018-05-22', '访问用户': 32371, '下单用户': 19810 },
            { '日期': '2018-05-23', '访问用户': 12328, '下单用户': 4398 },
            { '日期': '2018-05-24', '访问用户': 92381, '下单用户': 52910 }
          ]
      }
    }
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'changeSwitch') {
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'))
        }, 100)
      }
    })
  }
}
</script>