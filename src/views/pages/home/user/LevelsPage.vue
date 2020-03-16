<template>
    <ion-page class="ion-page">
        <ion-header class="border-none" mode="ios">
            <ion-toolbar class="border-none" mode="ios">
                <ion-buttons slot="start">
                    <ion-button @click="$router.back()">
                        <ion-icon slot="icon-only" color="dark" name="arrow-back"/>
                    </ion-button>
                </ion-buttons>
                <ion-title>{{ this.$t('levels') }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="w-full h-full overflow-hidden">
                <ion-toolbar>
                    <div class="flex justify-around items-center px-4">
                        <template v-for="(level, i) of levels">
                            <hr v-if="i > 0" :key="'h' + i" class="w-1/2">
                            <div :key="i" class="p-2 mx-1 w-full rounded-full ripple-parent ion-activatable "
                                 @click="slideTo(i)">
                                <img :class="{gray: level.index > userLevel.index }" :src="level.icon"
                                     class="w-full"/>
                                <ion-ripple-effect/>
                            </div>
                        </template>
                    </div>
                </ion-toolbar>

                <ion-slides ref="slider" :options="{resistanceRatio: 1, cssMode: true, centeredSlides: true}"
                            class="w-full h-full">
                    <ion-slide v-for="(level, i) of levels" :key="level.name" class="overflow-hidden">
                        <div class="absolute top-0">
                            <img :class="{gray: level.index > userLevel.index , 'object-bottom': level.index === 3}"
                                 :src="level.background"
                                 class="w-full object-cover object-center"
                                 style="height: 50vh; width: 100%"/>
                        </div>
                        <div class="absolute bottom-0 z-10 bg-white w-full text-left" style="height: 30vh">
                            <div :class="{'pt-1': i % 2 === 0}">
                                <div :style="`transform: rotate(${i % 2 === 0 ? '-' : ''}5deg); width: 120%`"
                                     class="-ml-16 -mt-32 absolute bg-white h-32 z-10"/>
                            </div>
                            <div class="absolute z-30 flex flex-col items-center justify-center w-full -mt-56">
                                <div class="w-32 rounded-full p-1 shadow-md bg-white">
                                    <img :class="{gray: level.index > userLevel.index }" :src="level.icon">
                                </div>

                                <span class="mt-2 font-bold text-2xl">{{ $t(level.name) }}</span>
                                <div class="flex mt-1">
                                    <ion-chip class="border border-black text-xs" outline>
                                        <ion-icon :src="require('ionicons5/dist/svg/trash-outline.svg')"
                                                  class="ml-0 mr-2 text-sm"/>
                                        {{ level.threshold.cleanups }} {{ $t('cleanups') }}
                                    </ion-chip>
                                    <ion-chip class="border border-black text-xs" outline>
                                        <ion-icon :src="require('@/assets/img/icons/bag-outline.svg')"
                                                  class="ml-0 mr-2 text-sm"/>
                                        {{ level.threshold.liters }} {{ $t('liters') }}
                                    </ion-chip>
                                    <ion-chip class="border border-black text-xs" outline>
                                        <ion-icon :src="require('@/assets/img/icons/scale-outline.svg')"
                                                  class="ml-0 mr-2 text-sm"/>
                                        {{ level.threshold.kilos }} {{ $t('kilos') }}
                                    </ion-chip>
                                </div>

                            </div>

                            <p class="absolute text-xs text-justify p-5 z-30 -mt-4">
                                {{ $t(level.name + '-description') }}
                            </p>
                        </div>
                    </ion-slide>
                </ion-slides>
            </div>
        </ion-content>
    </ion-page>
</template>
<script lang=ts>
import Vue from 'vue'
import Component from 'vue-class-component'
import levels from '@/assets/levels'
import {UserLevel} from '@/types/UserLevel'
import {userModule} from '@/store/userModule'

@Component({
    name: "LevelsPage"
})
export default class LevelsPage extends Vue {

    get levels() {
        return levels
    }

    get userLevel(): UserLevel {
        return userModule.getCurrentUserLevel
    }

    mounted() {
        this.slideTo(userModule.getCurrentUserLevel.index)
    }

    slideTo(index) {
        (this.$refs['slider'] as any).slideTo(index)
    }

}
</script>
<style>
.gray {
    filter: grayscale(1);
}
</style>
