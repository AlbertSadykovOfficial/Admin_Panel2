import Vue from 'vue';
import App from './App.vue';
import './app.pcss';

// Self-made Vuex ^_^
import store from './store/index.js'
Vue.prototype.$store = store


Vue.config.productionTip = false;

Vue.directive('scroll', {
    inserted: function (el, binding) {
        let f = function (evt) {
            if (binding.value(evt, el)) {
                window.removeEventListener('scroll', f)
            }
        }
        window.addEventListener('scroll', f)
    }
})

const vueApp = new Vue({
    render: (h) => h(App)
}).$mount('#app')
