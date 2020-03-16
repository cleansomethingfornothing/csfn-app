<template>
    <ion-card button class="cleanup-card ion-activatable ripple-parent m-3" color="white" mode="ios" @click="click">
        <div class="h-40">
            <transition name="fade">
                <img v-if="cleanup" :src="cleanup.pictures[0].publicUrl"
                     class="w-full h-full object-center object-cover">
                <ion-skeleton-text v-else animated class="w-full h-full m-0 absolute"></ion-skeleton-text>
            </transition>
        </div>
        <ion-card-content class="p-0">
            <transition name="fade">
                <div v-if="cleanup" class="p-2 flex flex-col justify-between">

                    <ion-label class="text-sm md:text-xl font-bold">{{ $t('cleanup-in') }}
                        {{ cleanup.location.address.city }}
                    </ion-label>

                    <div class="map-card__description mt-1">
                        {{ cleanup.description }}
                    </div>

                    <div class="flex justify-between items-end mt-1">
                        <div class="ion-text-wrap">
                            <ion-chip class="h-6 ml-0" color="secondary">
                                <ion-icon :src="require('@/assets/img/icons/bag.svg')" class="ml-0 mr-2 text-sm"/>
                                {{ cleanup.volume }} {{ $t('liters') }}
                            </ion-chip>
                            <ion-chip v-if="cleanup.weight" class="h-6" color="secondary">
                                <ion-icon :src="require('@/assets/img/icons/scale.svg')" class="ml-0 mr-2 text-sm"/>
                                {{ cleanup.weight }} {{ $t('kilos') }}
                            </ion-chip>
                        </div>
                        <ion-label class="text-xs font-bold mr-1" color="medium" style="margin-bottom: 2px">
                            {{ formattedDate }}
                        </ion-label>
                    </div>
                </div>
                <div v-else class="p-2">
                    <ion-skeleton-text animated></ion-skeleton-text>
                    <ion-skeleton-text animated></ion-skeleton-text>
                    <ion-skeleton-text animated></ion-skeleton-text>
                    <div class="flex">
                        <ion-skeleton-text animated class="mr-2 rounded-full"></ion-skeleton-text>
                        <ion-skeleton-text animated class="mr-2 rounded-full"></ion-skeleton-text>
                        <ion-skeleton-text animated class="rounded-full"></ion-skeleton-text>
                    </div>
                </div>
            </transition>
        </ion-card-content>
        <ion-ripple-effect></ion-ripple-effect>
    </ion-card>
</template>
<script lang=ts>
import Vue from 'vue'
import Component from 'vue-class-component'
import {Emit, Prop} from 'vue-property-decorator'
import moment from 'moment'
import {cleanupsModule} from '@/store/cleanupsModule'

@Component({
    name: 'map-cleanup-card'
})
export default class CleanupCard extends Vue {

    @Prop(Number)
    id: number

    get cleanup() {
        return cleanupsModule.getCleanup
    }

    get formattedDate() {
        if (!this.cleanup)
            return undefined
        const s = moment(this.cleanup.date).fromNow()
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    @Emit('click')
    click() {
        return
    }

}
</script>
<style>
.map-card__description {
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
