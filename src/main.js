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

// Inicio de caja de busqueda autocompletable
// TODO pendiente terminar funcion de busqueda y visualizacion de resultados
import busqueda from './components/busqueda'
Vue.component('busqueda', busqueda)

// Inicio de base de datos
import Firebase from 'firebase'
let config = {
  apiKey: 'AIzaSyAnhW4JuxrRahLlnRUU2FVmGTa_3HoWZgQ',
  authDomain: 'colegiosmexico.firebaseapp.com',
  databaseURL: 'https://colegiosmexico.firebaseio.com',
  storageBucket: 'colegiosmexico.appspot.com',
  messagingSenderId: '868558740161'
}
var appInit = Firebase.initializeApp(config, 'database')
// TODO quitar las funciones de debug del resto de componentes.
// Firebase.database.enableLogging(function (message) {console.debug('[FIREBASE]', message)})
var appDB = appInit.database()
var bus = appInit.database()

// Inicio de mapas
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDnqNEymj4RcippDywy4G4r_Iu9j40sjHA',
    v: '3'
  }
})

// Mis componenets
import fichaescuela from 'components/fichaescuela'
Vue.component('fichaescuela', fichaescuela)

// FontAwesome icons
import Icon from 'vue-awesome/components/Icon.vue'
Vue.component('icon', Icon)

Vue.use(Quasar) // Install Quasar Framework
var mainAPP

Quasar.start(() => {
  /* eslint-disable no-new */
  mainAPP = new Vue({ // eslint-disable
    el: '#q-app',
    data () {
      return {
        algo: 'asdasd',
        database: appDB
      }
    },
    router,
    render: h => h(require('./App'))
  })

})

export const _root =  {
  database: appInit.database()
}
