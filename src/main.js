// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import Vuex from 'vuex'
import Firebase from 'firebase'
import 'normalize.css'

// Inicio de coneccion con firebase
const config = {
  apiKey: 'AIzaSyAnhW4JuxrRahLlnRUU2FVmGTa_3HoWZgQ',
  authDomain: 'colegiosmexico.firebaseapp.com',
  databaseURL: 'https://colegiosmexico.firebaseio.com',
  storageBucket: 'colegiosmexico.appspot.com',
  messagingSenderId: '868558740161'
}
var appInit = Firebase.initializeApp(config, 'database')

// Inicio de store general
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0,
    database: appInit.database(), // Inicio de database
    hosting: appInit.storage() // inicio de storage
  },
  mutations: {
  	increment: state => state.count++,
    decrement: state => state.count--
  }
})

// Inicio de caja de busqueda autocompletable
// TODO pendiente terminar funcion de busqueda y visualizacion de resultados
import busqueda from './components/busqueda'
Vue.component('busqueda', busqueda)

// TODO buscar toas la referencias de estas variable para eliminarlas. Estas variables ya son inservibles
var appDB = appInit.database()
// var bus = appInit.database()
// TODO quitar las funciones de debug del resto de componentes.
// Firebase.database.enableLogging(function (message) {console.debug('[FIREBASE]', message)})

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
// import Icon from 'vue-awesome/components/Icon.vue'
// Vue.component('icon', Icon)

Vue.use(Quasar) // Install Quasar Framework
// var mainAPP

export const _root =  { // constantes sin reactividad
  database: appInit.database(), // Inicio de database
  storage: appInit.storage(), // inicio de storage
  catEscuelas: [
    { label: 'Estancias', value: 'estancias' },
    { label: 'Kinder', value: 'kinder' },
    { label: 'Primarias', value: 'primarias' },
    { label: 'Secundarias', value: 'secundarias' },
    { label: 'Preparatorias', value: 'preparatoria' }
  ]
}

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({ // eslint-disable
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
