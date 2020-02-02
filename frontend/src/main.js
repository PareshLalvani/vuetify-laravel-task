import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)


// VeeValidate
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

// Theme Configurations
import '../themeConfig.js'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css'

// Responsive css style
import '@/assets/css/responsive.css'


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

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)


// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'


// Feather font icon
require('./assets/css/iconfont.css')

//use axios
import './axios'

//Mixin
import "./mixins/mixin";

// Vue select
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

// Vue select css
// Note: In latest version you have to add it separately
 import 'vue-select/dist/vue-select.css';


Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
