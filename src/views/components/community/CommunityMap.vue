<template>
  <img :src="`https://maps.googleapis.com/maps/api/staticmap?size=600x500&key=${KEY}&markers=${cleanupMarkers}`"/>
</template>
<script lang=ts>
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import Cleanup from '@/types/Cleanup'

@Component({
    name: 'community-map'
})
export default class CommunityMap extends Vue {
    KEY = process.env.VUE_APP_GOOGLE_API_KEY

    @Prop(Array)
    cleanups: Cleanup[]

    get cleanupMarkers() {
        return encodeURI('color:green|' + this.cleanups.map(({location}) => `${location.coords.lat},${location.coords.lng}`).join('|'))
    }
}
</script>
<style scoped>

</style>
