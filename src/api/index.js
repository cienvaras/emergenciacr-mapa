import Vue from 'vue'
import Popup from '@/components/Popup'

export default class GoogleSheetsApi {
  constructor (sheetId) {
    this.sheetId = sheetId
    this.categories = {
      albergues: 1,
      acopio: 2,
      daños: 3
    }
  }
  getUrl (category) {
    return `https://spreadsheets.google.com/feeds/list/${this.sheetId}/${this.categories[category]}/public/values?alt=json`
  }
  getMapData (category) {
    return fetch(this.getUrl(category)).then(response => {
      return response.json()
    }).then(data => {
      let markers = []
      data.feed.entry.forEach((element, i) => {
        let matches = element.gsx$ubicaciónenelmapa.$t.match(/(-?[\d.]+),\s?(-?[\d.]+)/)
        if (matches) {
          const popupProps = {
            category: category,
            province: element.gsx$provincia.$t,
            canton: element.gsx$cantón.$t,
            district: element.gsx$distrito.$t,
            address: element.gsx$direcciónexacta.$t,
            type: category === 'daños' ? element.gsx$tipodedaño.$t : element.gsx$tipo.$t,
            needs: category !== 'daños' ? element.gsx$necesidades.$t : '',
            geoUrl: 'geo:' + element.gsx$ubicaciónenelmapa.$t
          }
          console.log(popupProps)
          const PopupComponent = Vue.extend(Popup)
          const popup = new PopupComponent({propsData: popupProps}).$mount()
          const el = popup.$el
          let marker = {
            id: i,
            coords: [Number(matches[1]), Number(matches[2])],
            popup: el
          }
          markers.push(marker)
        }
      })
      return markers
    })
  }
}
