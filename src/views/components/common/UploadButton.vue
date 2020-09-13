<template>
  <div class="picture-button w-full ion-activatable ripple-parent" @click="click" :class="rounded ? 'rounded' : ''">
    <img v-if="file" alt="Cleanup picture" :src="fileUrl" class="absolute w-full h-full">
    <div v-else class="background w-full h-full absolute">
      <div v-if="isMobile" class="w-full h-full absolute cursor-pointer" @click="getPicture"></div>
      <label v-else class="w-full h-full absolute cursor-pointer">
        <input class="hidden" type="file" @change="fileSelected($event.target.files[0])" accept=".png,.jpg"
               name="file">
      </label>
      <ion-spinner v-if="loading" class="absolute w-full h-full opacity-50" color="primary"
                   name="crescent"></ion-spinner>
    </div>
    <ion-ripple-effect></ion-ripple-effect>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Emit, Prop} from 'vue-property-decorator'
  import {nativeProvider} from '@/providers/native/native.provider'
  import {Camera, DestinationType, PictureSourceType} from '@ionic-native/camera'

  @Component({
    name: 'upload-button'
  })
  export default class UploadButton extends Vue {

    isMobile = false

    @Prop(Boolean)
    rounded: boolean

    @Prop(Boolean)
    loading: boolean

    @Prop(Blob)
    file: Blob

    get fileUrl() {
      return URL.createObjectURL(this.file)
    }

    mounted() {
      nativeProvider.isMobile()
        .then((isMobile) => this.isMobile = isMobile)
    }

    getPicture() {
      this.emitLoading(true)
      Camera.getPicture({
          quality: 100,
          correctOrientation: true,
          destinationType: DestinationType.DATA_URL,
          sourceType: PictureSourceType.PHOTOLIBRARY
        })
        .then((image) => {
          return fetch('data:image/jpeg;base64,' + image)
        })
        .then((res) => res.blob())
        .then((blob) => {
          this.emitLoading(false)
          this.fileSelected(blob)
        })
        .catch(() => {
          this.emitLoading(false)
        })
    }

    @Emit('select')
    fileSelected(file: Blob) {
      return file
    }

    @Emit('click')
    click() {
      return
    }

    @Emit('loading')
    emitLoading(loading) {
      return loading
    }
  }
</script>
<style>
  .picture-button {
    border-radius: 1rem;
  }

  .picture-button.rounded {
    border-radius: 50%;
    border: 4px solid #fff;
    background-color: #eee;
  }

  .picture-button .background {
    border-radius: 1rem;
    border: 2px dashed #b0b0b0;
    background: url("/add-picture.png") center center/cover;
  }

  .picture-button.rounded .background {
    border-radius: 50%;
    border: none;
  }

  .picture-button:after {
    content: '';
    display: block;
    padding-top: 100%;
  }

  .picture-button img {
    object-position: center center;
    object-fit: cover;
  }
</style>
