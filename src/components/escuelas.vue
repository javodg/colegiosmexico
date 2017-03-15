<template>
<div class="layout-view">
  <q-parallax :src="'statics/escuela3.jpg'" :height="200" class="text-center">
    <div slot="loading">Loading...</div>
    <h2 class="text-white fit">Especial de Escuelas</h2>
    <h3 class="capitalize text-white">{{ $route.params.id }}</h3>
  </q-parallax>
  <div>
    <div class="row gutter justify-center sm-column">
      <div class="card card-busqueda">
        <div class="card-content">
          <h6><small>Categorias:</small></h6>
          <q-select type="list" v-model="categoria" @input="$router.push(categoria)" :options="selectOptions" class="fit"></q-select>
          <q-search v-model="searchModel"></q-search>
          <button class="primary small fit" @click="buscar(searchModel)"><i class="on-left">search</i>Buscar</button>
          <hr>
          <div class="categoria-component text-justify">
            <label v-for='ii in 5' class="block">
              <q-radio v-model="grade" :val="6-ii"></q-radio>
              <template v-for='i in 5'>
                <i v-if='6-i>=ii' class="text-yellow-9 big">grade</i>
                <i v-else class="text-black big">grade</i>
              </template>
              <span class="resultados text-right">({{ numeroEscuelas[ii-1] }})</span>
            </label>
          </div>
        </div>
      </div>
      <div class="card card-resultados no-padding">
        <div class="card-media mapa gt-sm">
          <img src="~assets/map.png">
          <button class="primary circular"><i>place</i></button>
        </div>
        <div class="card-content resultados">
          <template v-for="(escuela, id) in infoRender">
            <div v-if="escuela" class="card row resultado"> <!-- TODO Investigar por que generar datos vasios el query -->
              <div class="resultado-logo w20 ">
                <img class="logo" :src="'statics/logos/' + escuela.nombre.replace(' ', '').replace(' ', '').toLowerCase() +'.png'" alt="">
                <div class="calificacion vertical-bottom">
                  <template v-for="ii in 5">
                    <i v-if="ii<=escuela.rating" class="text-yellow-9">grade</i>
                    <i v-if="ii>escuela.rating" class="text-white">grade</i>
                  </template>
                </div>
              </div>
              <div class="card-content card-force-top-padding w80">
                <div class="toolbar orange titulo">
                  <div class="nombre">
                    {{ escuela.nombre }} - <small>{{ escuela.tipo }}</small>
                    <router-link :to="'/editarescuela/' + id">Go to Foo</router-link>
                  </div>
                  <div v-if="escuela.social" class="social">
                    <!-- TODO Primeros modificaciones a la parte social de la fiche tipo 1 -->
                    <!-- TODO Provar si funcionan adecuadamente, buscar errores -->
                    <a v-if="escuela.social.facebook" :href="escuela.social.facebook" class="text-white">
                      <icon name="facebook-square" scale="1.5"></icon>
                    </a>
                    <a v-if="escuela.social.twitter" :href="escuela.social.twitter" class="text-white">
                      <icon name="twitter-square" scale="1.5"></icon>
                    </a>
                    <a v-if="escuela.social.foursquare" :href="escuela.social.foursquare" class="text-white">
                      <icon label="foursquare" class="stalk">
                        <icon name="square" scale="1.5"></icon>
                        <icon name="foursquare" scale="1.1" class="text-orange"></icon>
                      </icon>
                    </a>
                  </div>
                </div>
                <div class="cuerpo">
                  <div class="descripcion">
                    {{ escuela.descripcion }}
                  </div>
                  <div class="datos-contacto" v-if="escuela.direccion">
                    <span>Direccion:</span>
                    <span>
                      <span v-if="typeof(escuela.direccion)==='string'">{{ escuela.direccion }}</span>
                      <span v-else v-for="dir in escuela.direccion">
                        {{ dir }}
                      </span>
                    </span>
                  </div>
                  <div class="datos-contacto" v-if="escuela.telefono">
                    <span>Telefono:</span>
                    <span>{{ escuela.telefono }}</span>
                  </div>
                  <div class="datos-contacto" v-if="escuela.web">
                    <span>Siio Web:</span>
                    <span>{{ escuela.web }}</span>
                  </div>
                  <div class="datos-contacto" v-if="escuela.mail">
                    <span>Correo:</span>
                    <span>{{ escuela.mail }}</span>
                  </div>
                  <div class="" v-if="escuela.fichaTipo==1">
                    {{ escuela.info }}
                  </div>
                </div>
              </div>
            </div>
          </template>
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
  // Firebase.database.enableLogging(function (message) {console.debug('[FIREBASE]', message)})
  let db = app.database()

  export default {
    methods: {
      cats (id) {
        // Toma informacion de la base de datos segun categoria
        var vm = this // ingresa la el objeto de VUE a la funcion
        // Ingresa el query segun categoria
        vm.categoria = this.$route.params.id
        // Query para todas las escuelas
        if (vm.categoria === 'todas') {
          db.ref('escuela').once('value').then(function (dataSnapshot) {
            // console.log(dataSnapshot.val())
            vm.infoRender = dataSnapshot.val() // pasa los resultados de la busqueda al objeto para hacer el Render
          })
        }
        else {
          db.ref('escuela').orderByChild('categoria/' + this.categoria).equalTo(true).once('value').then(function (dataSnapshot) {
            // console.log(dataSnapshot.val())
            vm.infoRender = dataSnapshot.val() // pasa los resultados de la busqueda al objeto para hacer el Render
          })
        }
      },
      buscar (query) {
        // TODO Falta hacer la funcion para busqueda de la base de datos y mostrar la informacion.
        console.log(query)
        db.ref('escuela').orderByChild('nombre/').endAt(query + '\uf8ff').once('value').then(function (dataSnapshot) {
          console.log(dataSnapshot.val())
          // vm.infoRender = dataSnapshot.val() // pasa los resultados de la busqueda al objeto para hacer el Render
        })
      }
    },
    created () {
      // fetch the data when the view is created and the data is
      this.cats()
    },
    watch: {
      // call again the method if the route changes
      '$route': 'cats'
    },
    data () {
      return {
        categoria: this.$route.params.id,
        searchModel: '',
        infoRender: [],
        selectOptions: [
          {
            label: 'Guarderias',
            value: 'guarderia'
          },
          {
            label: 'Kinder',
            value: 'kinder'
          },
          {
            label: 'Primarias',
            value: 'primaria'
          },
          {
            label: 'Secundarias',
            value: 'secundaria'
          },
          {
            label: 'Preparatorias',
            value: 'preparatoria'
          }
        ],
        numeroEscuelas: [
          '21',
          '23',
          '12',
          '4',
          '1'
        ],
        grade: '5'
      }
    }
  }
</script>

<style scoped>
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

.w80 {
  flex-basis: auto;
  width: 100%;
  padding: .4em !important;
}

.mapa {
  background-color: #ccc;
  margin: 0;
  padding: 0;
  height: 30vh;
  position: relative;
  overflow: hidden;
}

.mapa>button {
  margin: 0;
  position: absolute;
  bottom: 25px;
  right: 32px;
}

.resultados {
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: auto;
  height: inherit;
}

.card {
  margin: .4em;
  background-color: white;
}

.card-busqueda {
  flex-basis: 20em;
}

.card-resultados {
  flex-basis: 65em;
  height: 100vh;
}

.q-parallax {
  background-color: rgba(50, 50, 50, 0.5);
}

.big {
  font-size: 1.2em;
}

.categoria-component span {
  display: inline-block;
  width: 4em;
}

.categoria-component span.resultados {
  float: right;
}

button.primary.small {
  margin-top: .6em;
}

.q-picker-textfield {
  height: 38px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 2px;
  border: 0;
  outline: 0;
  margin-bottom: .4em;
  color: #222;
  padding-left: .4em;
}

.q-picker-textfield::after {
  right: .4em;
}

</style>
