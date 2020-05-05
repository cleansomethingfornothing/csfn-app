<template>
  <img
    :src="'https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x500&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=' + KEY">
</template>
<script lang=ts>
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    name: "community-map"
  })
  export default class CommunityMap extends Vue {
    KEY = process.env.VUE_APP_GOOGLE_API_KEY
  }
</script>
<style scoped>

</style>
