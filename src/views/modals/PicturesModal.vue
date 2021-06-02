<template>
  <div class="picture-modal bg-black w-full h-full relative flex flex-col justify-center">
    <ion-header mode="ios">
      <ion-toolbar color="black" mode="ios">
        <ion-buttons>
          <ion-button color="white" fill="clear" shape="round" @click="close">
            <ion-icon slot="icon-only" name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="flex items-center" color="black">
      <ion-slides v-if="pictures && pictures.length > 1" ref="slider" :options="{initialSlide: selected}"
                  class="h-full w-full bg-black"
                  pager="true">
        <ion-slide v-for="(picture, i) of pictures" :key="i" class="bg-black">
          <img :src="pictureUrl(picture)" alt="Cleanup picture" class="picture">
        </ion-slide>
      </ion-slides>
      <div v-else class="h-full w-full flex justify-center items-center">
        <img :src="pictureUrl(pictures[0])" alt="Cleanup picture" class="w-full">
      </div>
    </ion-content>

    <ion-footer mode="ios">
      <ion-toolbar color="black" mode="ios">
        <div class="w-full flex justify-center">
          <ion-button v-if="removable" color="white" fill="clear" shape="round" @click="remove">
            <ion-icon slot="icon-only" name="trash"></ion-icon>
          </ion-button>
        </div>
      </ion-toolbar>
    </ion-footer>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Ref } from 'vue-property-decorator'
import { nativeProvider } from '@/providers/native/native.provider'
import { StatusBarStyle } from '@capacitor/core'

@Component({
  name: 'image-preview'
})
export default class PicturesModal extends Vue {
  @Prop(Array)
  public readonly pictures: string[] | Blob[]

  @Prop(Number)
  public readonly selected: number

  @Prop(Boolean)
  public readonly removable: boolean

  @Ref('slider')
  public readonly slider: any

  prevBarStyle: StatusBarStyle

  pictureUrl(picture: any) {
    return picture instanceof Blob ? URL.createObjectURL(picture) : picture.publicUrl || picture
  }

  mounted() {
    this.prevBarStyle = nativeProvider.getStatusBarStyle()
    nativeProvider.setStatusBarStyle(StatusBarStyle.Dark)
    if (this.pictures.length > 1) {
      setTimeout(() => {
        this.slider.update()
        this.slider.slideTo(this.selected)
      }, 100)
    }
  }

  beforeDestroy() {
    nativeProvider.setStatusBarStyle(this.prevBarStyle)
  }

  remove() {
    (this.slider ? this.slider.getActiveIndex() : Promise.resolve(0))
      .then((index) => {
        this.$ionic.modalController.dismiss({
          index
        })
      })
  }

  close() {
    this.$ionic.modalController.dismiss()
  }

}
</script>
<style>
.picture-modal ion-toolbar {
  --border-width: 0 !important;
}
</style>
