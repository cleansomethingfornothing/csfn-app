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
        <ion-toolbar class="overflow-auto">
          <div class="flex justify-around items-center px-4">
            <template v-for="(level, i) of levels">
              <hr v-if="i > 0" :key="'h' + i" class="w-1/2">
              <div :key="i" class="p-2 mx-1 w-full rounded-full ripple-parent ion-activatable "
                   @click="slideTo(i)" :class="{gray: level.index > userLevel.index }">
                <img :src="level.icon"
                     class="w-full"/>
                <ion-ripple-effect/>
              </div>
            </template>
          </div>
          <div class="absolute w-full h-1 bg-gray-200 left-0 bottom-0">
            <div class="level-bar bg-secondary absolute left-0 h-1" :style="{width: levelPercent + '%'}"></div>
          </div>
        </ion-toolbar>
        <ion-slides ref="slider" :options="{resistanceRatio: 1, cssMode: true, centeredSlides: true}"
                    class="w-full h-full" @ionSlideWillChange="slided">
          <ion-slide v-for="(level, i) of levels" :key="level.name" class="overflow-hidden"
                     :class="{gray: level.index > userLevel.index }">
            <div class="absolute top-0">
              <img :class="level.backgroundClass"
                   :src="level.background"
                   class="w-full object-cover"
                   style="height: 50vh; width: 100%"/>
            </div>
            <div class="absolute bottom-0 z-10 bg-white w-full text-left" style="height: 30vh">
              <div :class="{'pt-1': i % 2 === 0}">
                <div :style="`transform: rotate(${i % 2 === 0 ? '-' : ''}5deg); width: 120%`"
                     class="-ml-14 sm:-ml-16 -mt-44 sm:-mt-40 md:-mt-36 large-item absolute bg-white h-32 z-10"/>
              </div>
              <div class="absolute z-30 flex flex-col items-center justify-center w-full -mt-72 sm:-mt-64 md:-mt-60">
                <div class="w-32 rounded-full p-1 shadow-md bg-white">
                  <img :class="{gray: level.index > userLevel.index }" :src="level.icon">
                </div>

                <span class="mt-2 font-bold text-2xl">{{ $t(level.name) }}</span>
                <div class="flex mt-1 ">
                  <ion-chip class="border text-xs" outline :color="cleanupsDone ? 'secondary' : 'dark'">
                    <ion-icon
                      :src="require(`ionicons5/dist/svg/${cleanupsDone ? 'checkmark-outline': 'trash-outline'}.svg`)"
                      class="ml-0 mr-2 text-sm hidden sm:block"/>
                    {{ level.threshold.cleanups }} {{ $t('cleanups') }}
                  </ion-chip>
                  <ion-chip class="border text-xs" outline :color="litersDone ? 'secondary' : 'dark'">
                    <ion-icon
                      :src="require(litersDone ? 'ionicons5/dist/svg/checkmark-outline.svg': '@/assets/img/icons/bag-outline.svg')"
                      class="ml-0 mr-2 text-sm hidden sm:block"/>
                    {{ level.threshold.liters }} {{ $t('liters') }}
                  </ion-chip>
                  <ion-chip class="border text-xs" outline :color="kilosDone ? 'secondary' : 'dark'">
                    <ion-icon
                      :src="require(litersDone ? 'ionicons5/dist/svg/checkmark-outline.svg': '@/assets/img/icons/scale-outline.svg')"
                      class="ml-0 mr-2 text-sm hidden sm:block"/>
                    {{ level.threshold.kilos }} {{ $t('kilos') }}
                  </ion-chip>
                </div>

              </div>

              <p class="absolute text-xs md:text-sm text-justify p-5 z-30 -mt-24 sm:-mt-12 md:-mt-8">
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
import { UserLevel } from '@/types/UserLevel'
import { userModule } from '@/store/userModule'
import User from '@/types/User'

@Component({
  name: 'LevelsPage'
})
export default class LevelsPage extends Vue {

  index = 0

  get levels() {
    return levels
  }

  get level() {
    return this.levels[this.index]
  }

  get userLevel(): UserLevel {
    return userModule.getCurrentUserLevel
  }

  get user(): User {
    return userModule.getCurrentUser
  }

  get levelPercent(): number {
    if (this.level.index > this.userLevel.index) {
      return 0
    } else if (this.level.index < this.userLevel.index) {
      return 100
    } else {
      return ((
        Math.min(this.user.totalCleanups / this.level.threshold.cleanups, 1)
        + Math.min(this.user.totalVolume / this.level.threshold.liters, 1)
        + Math.min(this.user.totalWeight / this.level.threshold.kilos, 1)
      ) / 3) * 100
    }
  }

  get cleanupsDone(): boolean {
    return this.user.totalCleanups >= this.level.threshold.cleanups
  }

  get litersDone() {
    return this.user.totalVolume >= this.level.threshold.liters
  }

  get kilosDone() {
    return this.user.totalWeight >= this.level.threshold.kilos
  }

  mounted() {
    this.slideTo(userModule.getCurrentUserLevel.index)
  }

  slideTo(index) {
    (this.$refs['slider'] as any).slideTo(index)
  }

  slided() {
    (this.$refs['slider'] as any).getActiveIndex()
      .then((index) => {
        this.index = index
      })
  }

}
</script>
<style>
.gray img {
  filter: grayscale(1);
}

.gray p {
  color: transparent;
  text-shadow: 0 0 6px black;
}

.level-bar {
  transition: width ease 1s;
}
</style>
