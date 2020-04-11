<template>
  <div class="picture-modal bg-black w-full h-full relative flex flex-col justify-center">
    <ion-header mode="ios">
      <ion-toolbar color="black" mode="ios">
        <ion-buttons>
          <ion-button @click="close" fill="clear" shape="round" color="white">
            <ion-icon name="close" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content color="black">
      <ion-slides v-if="pictures" pager="true" class="h-full w-full bg-black" ref="slider"
                  :options="{initialSlide: selected}">
        <ion-slide v-for="(picture, i) of pictures" :key="i" class="bg-black">
          <img alt="Cleanup picture" :src="picture" class="picture">
        </ion-slide>
      </ion-slides>
    </ion-content>

    <ion-footer mode="ios">
      <ion-toolbar color="black" mode="ios">
        <div class="w-full flex justify-center">
          <ion-button @click="remove" fill="clear" shape="round" color="white" v-if="removable">
            <ion-icon name="trash" slot="icon-only"></ion-icon>
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
  import {nativeProvider} from '@/providers/native/native.provider'

  @Component({
    name: 'image-preview'
  })
  export default class PicturesModal extends Vue {
    @Prop(Array)
    public readonly pictures: string[]

    @Prop(Number)
    public readonly selected: number

    @Prop(Boolean)
    public readonly removable: boolean

    @Ref('slider')
    public readonly slider: any

    created() {
      nativeProvider.setStatusBarColor('#000000')
    }

    mounted() {
      setTimeout(() => {
        this.slider.update()
        this.slider.slideTo(this.selected)
      }, 100)
    }

    beforeDestroy(): void {
      nativeProvider.setStatusBarColor('#FFFFFF')
    }

    remove() {
      this.$ionic.modalController.dismiss({
        index: this.slider.getActiveIndex()
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
