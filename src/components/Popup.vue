<template>
  <div class="popup">
    <h3 class="popup-title">{{ categoryNames[category] }}</h3>
    <div class="field field--province" v-if="province">
      <div class="field__label">Provincia</div>
      <div class="field__value">{{ province }}</div>
    </div>
    <div class="field field--canton" v-if="canton">
      <div class="field__label">Cantón</div>
      <div class="field__value">{{ canton }}</div>
    </div>
    <div class="field field--district" v-if="district">
      <div class="field__label">Distrito</div>
      <div class="field__value">{{ district }}</div>
    </div>
    <div class="field field--address" v-if="address">
      <div class="field__label">Dirección exacta</div>
      <div class="field__value">{{ address }}</div>
    </div>
    <div class="field field--type" v-if="type">
      <div class="field__label">{{ typeLabel }}</div>
      <div class="field__value">{{ type }}</div>
    </div>
    <div class="field field--needs" v-if="needs && category !== 'daños'">
      <div class="field__label">Necesidades</div>
      <div class="field__value">{{ needs }}</div>
    </div>
    <div class="actions">
      <a :href="wazeUrl" class="button">Waze</a>
      <a :href="gmapsUrl" class="button">Google Maps</a>
      <a :href="osmUrl" class="button">OSM</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  props: [
    'category',
    'province',
    'canton',
    'district',
    'address',
    'type',
    'needs',
    'wazeUrl',
    'gmapsUrl',
    'osmUrl'
  ],
  data () {
    return {
      categoryNames: {
        albergues: 'Albergue',
        acopio: 'Centro de acopio',
        daños: 'Daño'
      }
    }
  },
  computed: {
    typeLabel () {
      return this.category === 'daños' ? 'Tipo de daño' : 'Tipo'
    }
  }
}
</script>

<style>
.popup {
  font-family: 'Source Sans Pro', sans-serif;
  padding-bottom: 45px;
  font-size: 1.4rem;
}
.popup-title {
  margin: 0 0 10px 0;
}
.field {
  margin-bottom: 5px;
}
.field__label {
  font-weight: bold;
}
.actions {
  position: absolute;
  bottom: 13px;
  left: 19px;
  right: 19px;
  height: 40px;
  padding-top: 5px;
  background-color: #fff;
}
.popup .button {
  color: #fff;
}
</style>
