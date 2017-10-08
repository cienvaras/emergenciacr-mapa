<template>
  <div class="popup">
    <h3>{{ categoryNames[category] }}</h3>
    <div class="popup__admin-division">
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
      <a :href="geoUrl" class="button">Abrir en app de mapas</a>
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
    'geoUrl'
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
}
.field {
  margin-bottom: 10px;
}
.field__label {
  font-weight: bold;
}
.popup__admin-division {
  display: flex;
  margin-bottom: 10px;
}
.popup__admin-division div {
  flex: 0 0 33%;
}
</style>
