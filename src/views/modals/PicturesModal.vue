<template>
  <div class="picture-modal bg-black w-full h-full relative flex flex-col justify-center">
    <ion-header mode="ios">
      <ion-toolbar color="black" mode="ios">
        <ion-buttons>
          <ion-button @click="close" fill="clear" shape="round" color="white">
            <ion-icon name="close-outline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content color="black" class="flex items-center">
      <ion-slides v-if="pictures && pictures.length > 1" pager="true" class="h-full w-full bg-black" ref="slider"
                  :options="{initialSlide: selected}">
        <ion-slide v-for="(picture, i) of pics" :key="i" class="bg-black">
          <img alt="Cleanup picture" :src="picture" class="picture">
        </ion-slide>
      </ion-slides>
      <div v-else class="h-full w-full flex justify-center items-center">
        <img alt="Cleanup picture" :src="pics[0]" class="w-full">
      </div>
    </ion-content>

    <ion-footer mode="ios">
      <ion-toolbar color="black" mode="ios">
        <div class="w-full flex justify-center">
          <ion-button @click="remove" fill="clear" shape="round" color="white" v-if="removable">
            <ion-icon name="trash-outline" slot="icon-only"></ion-icon>
          </ion-button>
        </div>
      </ion-toolbar>
    </ion-footer>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop, Ref} from 'vue-property-decorator'

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

    get picturesAreBlobs() {
      return this.pictures[0] instanceof Blob
    }

    get pics() {
      return this.picturesAreBlobs ? (this.pictures as Blob[]).map(p => URL.createObjectURL(p)) : this.pictures
    }

    mounted() {
      if (this.pictures.length > 1) {
        setTimeout(() => {
          this.slider.update()
          this.slider.slideTo(this.selected)
        }, 100)
      }
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
