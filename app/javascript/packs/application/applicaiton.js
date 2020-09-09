import Vue from 'vue'
Vue.config.productionTip = false
import App from './app.vue'
import 'bootstrap'
import './application.scss'
import router from './routes/index'
import store from './store/index'
import { rtdbPlugin } from 'vuefire'
Vue.use(rtdbPlugin)

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount()

  document.body.appendChild(app.$el)
})
