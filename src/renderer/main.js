import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App';
import router from './router';
import store from './store';
// import db from '../database/base';

Vue.prototype.avatarBasic = 'https://img.soulapp.cn/heads/';
Vue.prototype.postImgBasic = 'https://img.soulapp.cn/';
Vue.use(ElementUI);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

setTimeout(() => {
  console.log(store, 6666)
  store.dispatch('addFavorite')
  console.log(666666)
}, 3000)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
