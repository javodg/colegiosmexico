<template lang="html">
  <div class="layout-padding full-height">
    <div class="row md-column justify-center items-stretch">
      <div class="card formulario">
        <div class="card-title bg-white">
          Formulario
          <button class="primary small float-right" @click="actualizarInfo()">Actualizar</button>
        </div>
        <div v-if="escuela[id]" class="card-content bg-white">
          <div class="list">
            <div class="item multiple-lines">
              <div class="item-content">
                <div class="stacked-label">
                  <input class="full-width" v-model="escuela[id].nombre">
                  <label>Nombre</label>
                </div>
              </div>
            </div>
            <hr>
            <div class="row wrap justify-between">
              <label class="width-1of3"><q-checkbox v-model="escuela[id].categoria.estancia"></q-checkbox>Estancias</label>
              <label class="width-1of3"><q-checkbox v-model="escuela[id].categoria.kinder"></q-checkbox>Kinder</label>
              <label class="width-1of3"><q-checkbox v-model="escuela[id].categoria.primaria"></q-checkbox>Primaria</label>
              <label class="width-1of3"><q-checkbox v-model="escuela[id].categoria.secundaria"></q-checkbox>Secundaria</label>
              <label class="width-1of3"><q-checkbox v-model="escuela[id].categoria.preperatoria"></q-checkbox>Preparatoria</label>
              <label class="width-1of3"><q-checkbox v-model="escuela[id].categoria.universidad"></q-checkbox>Universidad</label>
            </div>
            <hr>
            <div class="item multiple-lines">
              <div class="item-content">
                <div class="stacked-label">
                  <textarea class="full-width" v-model="escuela[id].direccion"></textarea>
                  <label>Direccion:</label>
                </div>
                <div class="stacked-label">
                  <input class="full-width" v-model="escuela[id].telefono">
                  <label>Telefono:</label>
                </div>
                <div class="stacked-label">
                  <input class="full-width" v-model="escuela[id].mail">
                  <label>Correo:</label>
                </div>
                <div class="stacked-label">
                  <input class="full-width" v-model="escuela[id].web">
                  <label>Sitio web:</label>
                </div>
              </div>
            </div>
            <hr>
            <div class="item multiple-lines">
              <div class="item-content">
                <div class="stacked-label">
                  <textarea class="full-width descripcion" v-model="escuela[id].descripcion"></textarea>
                  <label>Descripcion:</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card ejemplo">
        <div class="card-title bg-orange text-white">
          Ficha ejemplo
        </div>
        <div class="card-content bg-white">
              <div v-if="escuela[id]" class="card row resultado">
                <div class="resultado-logo w20 ">
                  <img class="logo" :src="'statics/logos/' + escuela[id].nombre.replace(' ', '').replace(' ', '').toLowerCase() +'.png'" alt="">
                  <div class="calificacion vertical-bottom">
                    <template v-for="ii in 5">
                      <i v-if="ii<=escuela[id].rating" class="text-yellow-9">grade</i>
                      <i v-if="ii>escuela[id].rating" class="text-white">grade</i>
                    </template>
                  </div>
                </div>
                <div class="card-content w80 no-padding">
                  <div class="toolbar orange titulo">
                    <div class="nombre">
                      {{ escuela[id].nombre }} - <small>{{ escuela[id].tipo }}</small>
                    </div>
                    <div v-if="escuela[id].social" class="social">
                      <!-- TODO Primeros modificaciones a la parte social de la fiche tipo 1 -->
                      <!-- TODO Provar si funcionan adecuadamente, buscar errores -->
                      <a v-if="escuela[id].social.facebook" :href="escuela[id].social.facebook" class="text-white">
                        <icon name="facebook-square" scale="1.5"></icon>
                      </a>
                      <a v-if="escuela[id].social.twitter" :href="escuela[id].social.twitter" class="text-white">
                        <icon name="twitter-square" scale="1.5"></icon>
                      </a>
                      <a v-if="escuela[id].social.foursquare" :href="escuela[id].social.foursquare" class="text-white">
                        <icon label="foursquare" class="stalk">
                          <icon name="square" scale="1.5"></icon>
                          <icon name="foursquare" scale="1.1" class="text-orange"></icon>
                        </icon>
                      </a>
                    </div>
                  </div>
                  <div class="cuerpo">
                    <div class="descripcion">
                      {{ escuela[id].descripcion }}
                    </div>
                    <div class="datos-contacto" v-if="escuela[id].direccion">
                      <span>Direccion:</span>
                      <span>
                        <span v-if="typeof(escuela[id].direccion)==='string'">{{ escuela[id].direccion }}</span>
                        <span v-else v-for="dir in escuela[id].direccion">
                          {{ dir }}
                        </span>
                      </span>
                    </div>
                    <div class="datos-contacto" v-if="escuela[id].telefono">
                      <span>Telefono:</span>
                      <span>{{ escuela[id].telefono }}</span>
                    </div>
                    <div class="datos-contacto" v-if="escuela[id].web">
                      <span>Siio Web:</span>
                      <span>{{ escuela[id].web }}</span>
                    </div>
                    <div class="datos-contacto" v-if="escuela[id].mail">
                      <span>Correo:</span>
                      <span>{{ escuela[id].mail }}</span>
                    </div>
                    <div class="" v-if="escuela[id].fichaTipo==1">
                      {{ escuela[id].info }}
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyAnhW4JuxrRahLlnRUU2FVmGTa_3HoWZgQ',
  authDomain: 'colegiosmexico.firebaseapp.com',
  databaseURL: 'https://colegiosmexico.firebaseio.com',
  storageBucket: 'colegiosmexico.appspot.com',
  messagingSenderId: '868558740161'
}

let app = Firebase.initializeApp(config)
Firebase.database.enableLogging(function (message) { console.debug('[FIREBASE]', message) })
let db = app.database()

export default {
  methods: {
    query () {
      var vm = this // ingresa la el objeto de VUE a la funcion
      vm.id = this.$route.params.id
      db.ref('escuela').orderByKey().equalTo(vm.id).on('value', function (dataSnapshot) {
        // console.log(dataSnapshot.val())
        vm.escuela = dataSnapshot.exportVal() // pasa los resultados de la busqueda al objeto para hacer el Render
        console.log(vm.escuela[vm.id])
      })
    },
    actualizarInfo () {
      var vm = this // ingresa la el objeto de VUE a la funcion
      vm.id = this.$route.params.id
      console.log(vm.escuela[vm.id])
      db.ref('escuela/' + vm.id).set(vm.escuela[vm.id])
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    this.query()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'query'
  },
  data () {
    return {
      id: this.$route.params.id,
      escuela: {}
    }
  }
}
</script>

<style lang="css">
.card {
  margin: auto .5em;
  min-height: 75vh;
}
.ejemplo {
  flex-basis: 60em;
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
  height: 14em;
}
.resultado-logo .logo {
  height: 12.5em;
  margin: 0 auto;
  padding: .4em;
  text-align: center;
  display: block;
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
  width: 35em;
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
