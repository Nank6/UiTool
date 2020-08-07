// 组件全局自动注册
import Vue from 'vue'

function registerAllComponents(requireContext) {
  return requireContext.keys().forEach(comp => {
    // console.log(comp)
    // console.log(comp.match(/(\/=?)(\S*)(?=.vue)/)[2])
    const vueComp = requireContext(comp)
    // console.log(vueComp)
    const compName = vueComp.default.name ? vueComp.default.name : comp.match(/(\/=?)(\S*)(?=.vue)/)[2]
    // console.log(compName)
    Vue.component(compName, vueComp.default)
  })
}

registerAllComponents(require.context('./', false, /\.vue$/))
