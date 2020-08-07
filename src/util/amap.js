export default {
  load(callback) {
    if (window.AMap) {
      callback()
    } else {
      // 载入高德地图和UI组件
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = 'https://webapi.amap.com/maps?v=1.4.6&key=2bf98c9a2f97db6ee635b033804ebdd3&callback=initAmap'
      document.body.appendChild(script)
      window.initAmap = () => {
        callback()
      }
    }
  },
  defaultOption: {
    center: [116.397428, 39.90923],
    resizeEnable: true,
    gridMapForeign: true,
    vectorMapForeign: 'English',
    zoom: 10
  }
}
