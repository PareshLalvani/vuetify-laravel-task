import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import '@/assets/css/main.css'
// Vue Router
import router from './router'
// Vuex Store
import store from './store/store'

if(localStorage.getItem('authToken')) {
  store.dispatch('updateAuthToken', localStorage.getItem('authToken'))
}
if(localStorage.getItem('user')) {
  store.dispatch('updateUser', JSON.parse(localStorage.getItem('user')))
}

// i18n
import i18n from './i18n/i18n'

//use axios
import './axios'

//Mixin
import "./mixin";

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
