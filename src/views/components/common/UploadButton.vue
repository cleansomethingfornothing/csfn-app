import {PictureSourceType} from '@ionic-native/camera'
<template>
  <div class="picture-button w-full ion-activatable ripple-parent" @click="click">
    <img v-if="file" alt="Cleanup picture" :src="file" class="absolute w-full h-full">
    <div v-else class="background w-full h-full absolute">
      <div v-if="isMobile" class="w-full h-full absolute" @click="getPicture"></div>
      <label v-else class="w-full h-full absolute">
        <input class="hidden" type="file" @change="desktopFileSelected($event.target.files[0])" accept=".png,.jpg" name="file">
      </label>
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
  import {BackgroundMode} from '@ionic-native/background-mode'
  import {blobToBase64} from 'base64-blob'

  @Component({
    name: 'upload-button'
  })
  export default class UploadButton extends Vue {

    isMobile = false

    @Prop(String)
    file: string

    mounted() {
      nativeProvider.isMobile()
        .then((isMobile) => this.isMobile = isMobile)
    }

    getPicture() {
      this.pickSource()
        .then((source) => {
          BackgroundMode.enable()
          Camera.getPicture({
              quality: 100,
              correctOrientation: true,
              destinationType: DestinationType.DATA_URL,
              sourceType: source == 'camera' ? PictureSourceType.CAMERA : PictureSourceType.PHOTOLIBRARY
            })
            .then((image) => {
              BackgroundMode.disable()
              this.fileSelected(image)
            })
            .catch(error => {
              BackgroundMode.disable()
              console.log(error)
            })
        })
    }

    pickSource() {
      return new Promise(resolve => {
        this.$ionic.actionSheetController
          .create({
            buttons: [{
              text: this.$t('camera').toString(),
              icon: 'camera',
              handler() {
                resolve('camera')
              }
            }, {
              text: this.$t('gallery').toString(),
              icon: 'images',
              handler() {
                resolve('gallery')
              }
            }]
          }).then(a => a.present())
      })
    }

    desktopFileSelected(file) {
      blobToBase64(file)
        .then(base64 => this.fileSelected(base64))
    }

    @Emit('select')
    fileSelected(file: string) {
      return file
    }

    @Emit('click')
    click() {
      return
    }
  }
</script>
<style>
  .picture-button {
    border-radius: 1rem;
  }

  .picture-button .background {
    border-radius: 1rem;
    border: 2px dashed #b0b0b0;
    background: url("/add-picture.png") center center/cover;
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
