import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import singleSpaVue from 'single-spa-vue'

Vue.config.productionTip = false


const appOptions = {
  el:'#vue',//要挂载父应用中的id为vue 标签中
  router,
  render: h => h(App)
}

const vueLifeCycle = singleSpaVue({
  Vue,
  appOptions
})
//如果是父应用引用我   
if(window.singleSpaNavigate){
  __webpack_public_path__= 'http://localhost:10001/' //webpack 打包的时候加上这个目录 发请求 会把路径拼到前面  这个路径就变成了绝对路径
}
//如果是子应用  单独访问子应用
//这样自应用可以独立 开发 最后在挂到父应用上
if(!window.singleSpaNavigate){
  delete appOptions.el;
  new Vue(appOptions).$mount('#app')
}


//协议介入  定义好协议 父应用会调用这些方法
export const bootstrap = vueLifeCycle.bootstrap;
export const mount = vueLifeCycle.mount;
export const unmount = vueLifeCycle.unmount;

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

//我们需要父应用加载子应用,将自应用打包成一个个lib 给父应用使用

//bootstrap mount unmount
//single-spa //single-spa-vue
