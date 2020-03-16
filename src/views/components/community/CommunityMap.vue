<template>
    <ion-card :style="`height: ${height-20}px`" button @click="$emit('click')">
        <img :src="src"
             :style="`height: ${height-20}px`"/>
    </ion-card>
</template>
<script lang=ts>
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import Cleanup from '@/types/Cleanup'
import Coords from '@/types/Coords'

@Component({
    name: 'community-map'
})
export default class CommunityMap extends Vue {
    KEY = process.env.VUE_APP_GOOGLE_API_KEY

    @Prop(Array)
    cleanups: Cleanup[]

    @Prop(Object)
    coords: Coords

    width = 0

    get height() {
        return Math.ceil(this.width * 5 / 6)
    }

    get cleanupMarkers() {
        return this.cleanups.length && encodeURI('icon:https://storage.googleapis.com/csfn-public-assets/pin_cleanup.png|' + this.cleanups.map(({location}) => `${location.coords.lat},${location.coords.lng}`).join('|'))
    }

    get src() {
        return 'https://maps.googleapis.com/maps/api/staticmap' +
            `?size=${this.width}x${this.height}&key=${this.KEY}` +
            `&${this.cleanupMarkers ? 'markers=' + this.cleanupMarkers : 'zoom=11&center=' + this.coords.lat + ',' + this.coords.lng}`
    }

    mounted() {
        this.width = window.innerWidth
    }
}
</script>
<style scoped>

</style>
