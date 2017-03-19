<template lang="html">
    <div class="card row resultado">
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
        <div class="toolbar orange titulo" :style="'height:3em'">
          <div class="nombre" :style="'font-size:1.5em'">
            {{ escuela.nombre }} -
            <small v-for="categoria in enumerar(escuela)" class="capitalize" :style="'font-size:.7em'">
              {{ categoria }}
            </small>
          </div>
          <div class="social">
            <!-- TODO Primeros modificaciones a la parte social de la fiche tipo 1 -->
            <!-- TODO Provar si funcionan adecuadamente, buscar errores -->
            <router-link :to="'/editarescuela/' + id" class="text-white">
              <icon name="cog" scale="1.5"></icon>
            </router-link>
            <template v-if="escuela.social" >
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
            </template>
          </div>
        </div>
        <div class="cuerpo row">
          <div class="descripcion">
            {{ escuela.descripcion }}
          </div>
          <div class="datos-contacto">
            <div v-if="escuela.direccion">
              <span>Direccion:</span>
              <span v-if="typeof(escuela.direccion)==='string'">{{ escuela.direccion }}</span>
              <span v-else v-for="dir in escuela.direccion">
                  {{ dir }}
              </span>
            </div>
            <div v-if="escuela.telefono">
              <span>Telefono:</span>
              <span>{{ escuela.telefono }}</span>
            </div>
            <div v-if="escuela.web">
              <span>Siio Web:</span>
              <span>{{ escuela.web }}</span>
            </div>
            <div v-if="escuela.mail">
              <span>Correo:</span>
              <span>{{ escuela.mail }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  methods: {
    enumerar (escuela) {
      let cats = escuela.categoria
      let temp = []
      for (var key in cats) {
        if (cats[key]) {
          temp.push(key)
        }
      }
      return temp
    }
  },
  data () {
    return {
      id: 0,
      escuela: {
        categoria: {
          estancia: false,
          kinder: true,
          preperatoria: false,
          primaria: true,
          secundaria: true,
          universidad: false
        },
        descripcion: 'Lorem ipsum dolor stempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.adsasdsad',
        direccion: 'Calle Castaño s/n entre Ahuehuete y Paseo del Olmo 5ta Sección, Villas del Real asdasdasd',
        mail: 'adamsmith.tecamac@gmail.com',
        nombre: 'Colegio Adam Smith',
        rating: 3,
        social: {
          facebook: 'https://www.facebook.com/pages/Colegio-Adam-Smith/495431947167396',
          foursquare: 'https://es.foursquare.com/v/colegio-adam-smith/4e0b58ddd164e3547c300476'
        },
        telefono: 38729333,
        web: 'asd'
      }
    }
  }
}
</script>

<style scoped>
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

.resultado .cuerpo .descripcion,
.resultado .cuerpo .datos-contacto {
  flex-basis: 50%;
  padding: .2em;
}
.resultado .cuerpo .datos-contacto div {
  display: flex;
}
.resultado .cuerpo .datos-contacto div span:first-child {
  font-weight: bold;
  width: 5em;
}
.resultado .cuerpo .datos-contacto div span:last-child {
  flex-basis: 70%;
  font-size: .9em;
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
  padding: 0 !important;
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
  height: 70vh;
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
