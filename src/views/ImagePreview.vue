<template>
  <div class="bg-black w-full h-full relative flex flex-col justify-center">
    <div class="preview-wrapper">
      <img alt="Image preview" :src="image" class="preview-img">
    </div>

    <div class="w-full bottom-0 p-2 flex justify-around">
      <ion-button @click="remove" fill="clear" shape="round">
        <ion-icon name="trash" color="white" slot="icon-only"></ion-icon>
      </ion-button>
      <ion-button @click="accept" fill="clear" chape="round">
        <ion-icon name="checkmark" color="white" slot="icon-only"></ion-icon>
      </ion-button>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'
  import {nativeProvider} from '@/providers/native/native.provider'

  @Component({
    name: 'image-preview'
  })
  export default class ImagePreview extends Vue {
    @Prop(String)
    image: string

    created() {
      nativeProvider.setStatusBarColor('#000000')
    }

    beforeDestroy(): void {
      nativeProvider.setStatusBarColor('#FFFFFF')
    }

    remove() {
      this.$ionic.modalController.dismiss({
        remove: true
      })
    }

    accept() {
      this.$ionic.modalController.dismiss()
    }
  }
</script>
<style>
  .preview-wrapper {
    overflow: hidden;
    height: 90%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .preview-img {
    height: auto;
    width: 100%;
  }
</style>
