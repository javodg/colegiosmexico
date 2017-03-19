<template>
<div class="layout-padding full-height">
  <div class="row md-column justify-center items-stretch">
    <div class="card formulario">
      <div class="card-title bg-white">
        Formulario
        <button class="primary small float-right" @click="ingresarEscuela()">Terminar</button>
        <button class="primary small float-right" @click="$refs.mapa.panBy(10,10)">prueba mapa</button>
      </div>
      <div class="card-content bg-white">
        <div class="list">
          <div class="item multiple-lines">
            <div class="item-content">
              <div class="stacked-label">
                <input class="full-width" v-model="nuevaEscuela.nombre">
                <label>Nombre</label>
              </div>
            </div>
          </div>
          <div class="row wrap justify-between">
            <label class="width-1of3"><q-checkbox v-model="nuevaEscuela.categoria.estancia"></q-checkbox>Estancias</label>
            <label class="width-1of3"><q-checkbox v-model="nuevaEscuela.categoria.kinder"></q-checkbox>Kinder</label>
            <label class="width-1of3"><q-checkbox v-model="nuevaEscuela.categoria.primaria"></q-checkbox>Primaria</label>
            <label class="width-1of3"><q-checkbox v-model="nuevaEscuela.categoria.secundaria"></q-checkbox>Secundaria</label>
            <label class="width-1of3"><q-checkbox v-model="nuevaEscuela.categoria.preparatoria"></q-checkbox>Preparatoria</label>
            <label class="width-1of3"><q-checkbox v-model="nuevaEscuela.categoria.universidad"></q-checkbox>Universidad</label>
          </div>
          <div class="item multiple-lines">
            <div class="item-content">
              <div class="stacked-label">
                <textarea class="full-width" v-model="nuevaEscuela.direccion"></textarea>
                <label>Direccion:</label>
              </div>
              <div class="stacked-label">
                <input class="full-width" v-model="nuevaEscuela.telefono">
                <label>Telefono:</label>
              </div>
              <div class="stacked-label">
                <input class="full-width" v-model="nuevaEscuela.mail">
                <label>Correo:</label>
              </div>
              <div class="stacked-label">
                <input class="full-width" v-model="nuevaEscuela.web">
                <label>Sitio web:</label>
              </div>
              <div class="stacked-label">
                <input class="full-width" v-model="nuevaEscuela.social.facebook">
                <label>Facebook:</label>
              </div>
            </div>
          </div>
          <div class="item multiple-lines">
            <div class="item-content">
              <div class="stacked-label">
                <textarea class="full-width descripcion" v-model="nuevaEscuela.descripcion"></textarea>
                <label>Descripcion:</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card ejemplo bg-white">
      <div class="card-title bg-orange text-white">
        Ficha ejemplo
      </div>
      <div class="card-content bg-white">
        <fichaescuela v-if="nuevaEscuela" :escuela="nuevaEscuela" fichatipo="1"></fichaescuela>
        <!-- TODO Pendiente eliminar cuando se compruebe quye no hay errores -->
        <!--
          <div v-if="nuevaEscuela" class="card row resultado">
          <div class="resultado-logo w20 ">
            <img class="logo" :src="'statics/logos/colegiovallarta.png'" alt="">
            <div class="calificacion vertical-bottom">
              <template v-for="ii in 5">
                <i v-if="ii<=nuevaEscuela.rating" class="text-yellow-9">grade</i>
                <i v-if="ii>nuevaEscuela.rating" class="text-white">grade</i>
              </template>
            </div>
                </div>
                <div class="card-content w80 no-padding">
                  <div class="toolbar orange titulo">
                    <div class="nombre">
                      {{ nuevaEscuela.nombre }} - <small>{{ nuevaEscuela.tipo }}</small>
                    </div>
                    <div v-if="nuevaEscuela.social" class="social">
                      <a v-if="nuevaEscuela.social.facebook" :href="nuevaEscuela.social.facebook" class="text-white">
                        <icon name="facebook-square" scale="1.5"></icon>
                      </a>
                      <a v-if="nuevaEscuela.social.twitter" :href="nuevaEscuela.social.twitter" class="text-white">
                        <icon name="twitter-square" scale="1.5"></icon>
                      </a>
                      <a v-if="nuevaEscuela.social.foursquare" :href="nuevaEscuela.social.foursquare" class="text-white">
                        <icon label="foursquare" class="stalk">
                          <icon name="square" scale="1.5"></icon>
                          <icon name="foursquare" scale="1.1" class="text-orange"></icon>
                        </icon>
                      </a>
                    </div>
                  </div>
                  <div class="cuerpo">
                    <div class="descripcion">
                      {{ nuevaEscuela.descripcion }}
                    </div>
                    <div class="datos-contacto" v-if="nuevaEscuela.direccion">
                      <span>Direccion:</span>
                      <span>
                        <span v-if="typeof(nuevaEscuela.direccion)==='string'">{{ nuevaEscuela.direccion }}</span>
                        <span v-else v-for="dir in nuevaEscuela.direccion">
                          {{ dir }}
                        </span>
                      </span>
                    </div>
                    <div class="datos-contacto" v-if="nuevaEscuela.telefono">
                      <span>Telefono:</span>
                      <span>{{ nuevaEscuela.telefono }}</span>
                    </div>
                    <div class="datos-contacto" v-if="nuevaEscuela.web">
                      <span>Siio Web:</span>
                      <span>{{ nuevaEscuela.web }}</span>
                    </div>
                    <div class="datos-contacto" v-if="nuevaEscuela.mail">
                      <span>Correo:</span>
                      <span>{{ nuevaEscuela.mail }}</span>
                    </div>
                    <div class="" v-if="nuevaEscuela.fichaTipo==1">
                      {{ nuevaEscuela.info }}
                    </div>
                  </div>
                </div>
              </div>
            -->
        </div>

        <div class="card ">
          {{ mark }}<br>
          <gmap-map
            ref="mapa"
            :center="center"
            :zoom="15"
            style="width: 100%; height: 40vh"
            @click="clicklog">
            <gmap-marker v-if="mark.position.lat" :position="mark.position" :key="mark.id">
            </gmap-marker>
          </gmap-map>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'
import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDnqNEymj4RcippDywy4G4r_Iu9j40sjHA',
    v: '3'
  }
})

let config = {
  apiKey: 'AIzaSyAnhW4JuxrRahLlnRUU2FVmGTa_3HoWZgQ',
  authDomain: 'colegiosmexico.firebaseapp.com',
  databaseURL: 'https://colegiosmexico.firebaseio.com',
  storageBucket: 'colegiosmexico.appspot.com',
  messagingSenderId: '868558740161'
}

let app = Firebase.initializeApp(config, 'nuevaEscuela')
Firebase.database.enableLogging(function (message) { console.debug('[FIREBASE]', message) })
let db = app.database()

export default {
  methods: {
    ingresarEscuela () {
      var vm = this // ingresa la el objeto de VUE a la funcion
      var newKey = db.ref('escuela').push().key
      console.log(vm.nuevaEscuela.nombre)
      console.log(newKey)
      var update = {}
      update['/' + newKey] = vm.nuevaEscuela
      return db.ref('escuela').update(update, function (error) {
        if (error) console.log('fallo' + error)
        else {
          window.history.go(-1)
        }
      })
    },
    clicklog (mouseArgs) {
      this.mark = {
        id: 'location',
        position: {
          lat: mouseArgs.latLng.lat(),
          lng: mouseArgs.latLng.lng()
        }
      }
      this.nuevaEscuela.lat = mouseArgs.latLng.lat()
      this.nuevaEscuela.lng = mouseArgs.latLng.lng()
      console.log(mouseArgs.latLng.lat())
      console.log(mouseArgs.latLng.lng())
    }
  },
  created () {
    // fetch the data when the view is created and the data is
  },
  watch: {
    // call again the method if the route changes
  },
  data () {
    return {
      mark: { 'id': 'location', 'position': { 'lat': '', 'lng': '' } },
      center: {lat: 19.6723463, lng: -99.017131},
      nuevaEscuela: {
        categoria: {
          estancia: false,
          kinder: false,
          preparatoria: false,
          primaria: false,
          secundaria: false,
          universidad: false
        },
        descripcion: '',
        direccion: '',
        mail: '',
        nombre: 'dsa',
        rating: '',
        social: {
          facebook: '',
          foursquare: ''
        },
        telefono: '',
        web: '',
        lat: 'a',
        lng: 'a'
      }
    }
  }
}
</script>

<style scoped>
.card.ejemplo {
  margin: auto .5em;
  min-height: 75vh;
}
.card-content {
  width: 100%;
}
.ejemplo {
  flex-basis: 65em;
}

.card.formulario {
  flex-basis: 30em;
}

.card-content {
  height: 100%;
}

.resultado {
  height: 15em;
}

.resultado-logo {
  width: 20em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .5);
  height: 15em;
  display: flex;
  flex-direction: column;
}
.resultado-logo .logo {
  flex-basis: 1;
  box-sizing: border-box;
  height: 13.5em;
  margin: 0 auto;
  padding: .4em;
  text-align: center;
}

.resultado-logo .calificacion {
  height: 1.5em;
  background-color: #333;
  text-align: center;
  display: block;
}

.resultado .titulo {
  width: 100%;
  min-height: 0;
}

.resultado .titulo small {
  font-size: .8em;
  font-style: italic;
}

.resultado .cuerpo {
  width: 100%;
  padding: .8em;
}

.resultado .cuerpo .descripcion {
  margin-bottom: .8em;
  text-align: justify;
}
.resultado .cuerpo .datos-contacto {
  width: 100%;
}
.resultado .cuerpo .datos-contacto span {
  display: inline-block;
  width: 30em;
}
.resultado .cuerpo .datos-contacto > span:first-child {
  vertical-align: top;
  font-weight: bold;
  width: 5.5em;
}
.resultado .titulo>.nombre {
  font-size: 1.2em;
  font-weight: bold;
  float: left;
}

.resultado .titulo>.social {
  float: right;
  height: 1.4em;
}


textarea.descripcion {
  height: 6em;
}
</style>
