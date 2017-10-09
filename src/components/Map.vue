<template>
  <div class="map">
    <section class="location-list">
      <div class="filters">
        <h2>Filtrar</h2>
        <form>
          <p>
            <input type="checkbox" id="filter-albergues" v-model="filters.albergues">
            <label for="filter-albergues">Albergues</label>
          </p>
          <p>
            <input type="checkbox" id="filter-acopio" v-model="filters.acopio">
            <label for="filter-acopio">Centros de acopio</label>
          </p>
          <p>
            <input type="checkbox" id="filter-daños" v-model="filters.daños">
            <label for="filter-daños">Daños</label>
          </p>
        </form>
      </div>
    </section>
    <v-map :zoom="map.zoom" :center="map.center" :options="mapOptions">
      <v-tilelayer :url="map.url" :attribution="map.attribution"></v-tilelayer>
      <v-marker-cluster :options="clusterOptions" v-if="filters.albergues">
        <v-marker v-for="marker in albergues" :key="marker.id" :lat-lng="marker.coords" :icon="icons.albergues">
          <v-popup :content="marker.popup"></v-popup>
        </v-marker>
      </v-marker-cluster>
      <v-marker-cluster :options="clusterOptions" v-if="filters.acopio">
        <v-marker v-for="marker in acopio" :key="marker.id" :lat-lng="marker.coords" :icon="icons.acopio">
          <v-popup :content="marker.popup"></v-popup>
        </v-marker>
      </v-marker-cluster>
      <v-marker-cluster :options="clusterOptions" v-if="filters.daños">
        <v-marker v-for="marker in daños" :key="marker.id" :lat-lng="marker.coords" :icon="icons.daños">
          <v-popup :content="marker.popup"></v-popup>
        </v-marker>
      </v-marker-cluster>
    </v-map>
  </div>
</template>

<script>
import L from 'leaflet'
import Vue2Leaflet from 'vue2-leaflet'
import Vue2LeafletMarkercluster from 'vue2-leaflet-markercluster'
import Api from '@/api'
import markerDaños from '../assets/marker-daños.png'
import markerAlbergues from '../assets/marker-albergues.png'
import markerAcopio from '../assets/marker-acopio.png'
import markerShadow from '../assets/marker-shadow.png'
let api = new Api('1RG1GNItAWGmJUWWAtXZ3k1gRdezB-XT4Izn1hY-2UjI')
export default {
  name: 'Map',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer': Vue2Leaflet.TileLayer,
    'v-marker': Vue2Leaflet.Marker,
    'v-popup': Vue2Leaflet.Popup,
    'v-marker-cluster': Vue2LeafletMarkercluster
  },
  data () {
    return {
      loading: true,
      map: {
        zoom: 8,
        center: [9.5, -84.5],
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      },
      albergues: [],
      acopio: [],
      daños: [],
      clusterOptions: {
        spiderfyOnMaxZoom: false,
        disableClusteringAtZoom: true
      },
      filters: {
        albergues: true,
        acopio: true,
        daños: true
      },
      icons: {
        albergues: L.icon({
          iconUrl: markerAlbergues,
          iconSize: [25, 25],
          iconAnchor: [13, 13],
          popupAnchor: [0, -15],
          shadowUrl: markerShadow,
          shadowSize: [33, 33],
          shadowAnchor: [15, 15]
        }),
        acopio: L.icon({
          iconUrl: markerAcopio,
          iconSize: [25, 25],
          iconAnchor: [13, 13],
          popupAnchor: [0, -8],
          shadowUrl: markerShadow,
          shadowSize: [33, 33],
          shadowAnchor: [15, 15]
        }),
        daños: L.icon({
          iconUrl: markerDaños,
          iconSize: [25, 25],
          iconAnchor: [13, 13],
          popupAnchor: [0, -8],
          shadowUrl: markerShadow,
          shadowSize: [33, 33],
          shadowAnchor: [15, 15]
        })
      }
    }
  },
  created () {
    // Albergues.
    api.getMapData('albergues').then(data => {
      console.log('albergues', data)
      this.albergues = data
    })
    // Centros de acopio.
    api.getMapData('acopio').then(data => {
      console.log('acopio', data)
      this.acopio = data
    })
    // Daños.
    api.getMapData('daños').then(data => {
      console.log('daños', data)
      this.daños = data
    })
  },
  computed: {
    mapOptions () {
      let mq = window.matchMedia('(min-width: 680px)')
      if (mq.matches) {
        return {zoomControl: true}
      } else {
        return {zoomControl: false}
      }
    }
  }
}
</script>

<style>
@import "~leaflet/dist/leaflet.css";
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";

.map {
  display: flex;
  flex: 1;
}
.location-list {
  display: none;
}
@media (min-width: 680px) {
  .location-list {
    display: block;
    width: 200px;
    flex: 0 0 200px;
  }
}
.vue2leaflet-map {
  width: auto;
  flex: 1 0 auto;
}
.leaflet-popup {
  width: 300px;
}
.leaflet-popup-content {
  max-height: 300px;
  overflow-y: scroll;
}
</style>
