// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import VueFire from 'vuefire'
import Quasar from 'quasar'
import router from './router'
import 'vue-awesome/icons'
import 'normalize.css'

// Mis componenets
  import fichaescuela from 'components/fichaescuela'
Vue.component('fichaescuela', fichaescuela)

// FontAwesome icons
import Icon from 'vue-awesome/components/Icon.vue'
Vue.component('icon', Icon)

Vue.use(Quasar) // Install Quasar Framework
Vue.use(VueFire) // Instalar Binding de Firebase

var vm

Quasar.start(() => {
  /* eslint-disable no-new */
  vm = new Vue({ // eslint-disable
    el: '#q-app',
    router,
    render: h => h(require('./App'))
  })

})
console.log(vm)
