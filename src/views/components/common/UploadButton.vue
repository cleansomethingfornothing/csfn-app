<template>
  <div class="picture-button w-full ion-activatable ripple-parent" @click="click" :class="rounded ? 'rounded' : ''">
    <div class="w-full h-full absolute">
      <div v-if="isMobile" class="w-full h-full absolute cursor-pointer z-10" @click="getPicture"></div>
      <label v-else class="w-full h-full absolute cursor-pointer z-10">
        <input class="hidden" type="file" @change="fileSelected($event.target.files[0])" accept=".png,.jpg"
               name="file">
      </label>
      <ion-spinner v-if="loading" class="absolute w-full h-full opacity-50 z-50" color="primary"
                   name="crescent"></ion-spinner>
      <div class="z-1 w-full h-full">
        <img v-if="file || url" alt="Cleanup picture" :src="url || fileUrl" class="absolute w-full h-full">
        <div v-else class="background w-full h-full"></div>
      </div>
    </div>
    <ion-ripple-effect></ion-ripple-effect>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Emit, Prop} from 'vue-property-decorator'
import {nativeProvider} from '@/providers/native/native.provider'
import {CameraResultType, CameraSource, Plugins} from '@capacitor/core'

const {Camera} = Plugins
@Component({
  name: 'upload-button'
})
export default class UploadButton extends Vue {

    isMobile = false

    @Prop(Boolean)
    rounded: boolean

    loading = false

    @Prop()
    file: any

    @Prop(String)
    url: string

    get fileUrl() {
        return URL.createObjectURL(this.file)
    }

    mounted() {
        nativeProvider.isMobile()
        .then((isMobile) => this.isMobile = isMobile)
  }

  getPicture() {
    if (this.file) {
      return
    }
      this.loading = true
      Camera.getPhoto({
              quality: 100,
              correctOrientation: true,
              source: CameraSource.Photos,
              resultType: CameraResultType.DataUrl
          })
          .then((image) => {
              return fetch(image.dataUrl)
          })
          .then((res) => res.blob())
        .then((blob) => {
            this.loading = false
            this.fileSelected(blob)
        })
        .catch(() => {
            this.loading = false
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
