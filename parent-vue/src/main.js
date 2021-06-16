import Vue from 'vue'
import App from './App.vue'
import router from './router'
import  {registerApplication,start} from 'single-spa'

Vue.config.productionTip = false

async function loadScript(url){
  return new Promise((resolve,reject)=>{
    let script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  })
}

//singleSpa 缺陷 不够灵活 不能动态加载js文件、
//样式不能隔离 没有js沙箱机制


//myVueApp自定义名字
registerApplication('myVueApp',async()=>{
    console.log('加载模块')
    //systemJS 动态创建一个script 把chunk-vendors文件引入进来
    await loadScript('http://localhost:10001/js/chunk-vendors.js')
    await loadScript('http://localhost:10001/js/app.js')
    return window.singleVue; // bootstrap mount unmount

},
 location =>location.pathname.startsWith('/vue')//用户切换到/vue的路径下，我们需要加载刚才定义的子应用
)
start()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
