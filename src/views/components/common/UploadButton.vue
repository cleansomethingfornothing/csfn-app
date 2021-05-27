<template>
    <div :class="rounded ? 'rounded' : ''" class="picture-button w-full ion-activatable ripple-parent" @click="click">
        <div class="w-full h-full absolute">
            <div v-if="isMobile" class="w-full h-full absolute cursor-pointer z-10" @click="getPicture"></div>
            <label v-else class="w-full h-full absolute cursor-pointer z-10">
                <input accept=".png,.jpg" class="hidden" name="file" type="file" v-if="!file"
                       @change="filesSelected([$event.target.files[0]])">
            </label>
            <ion-spinner v-if="loading" class="absolute w-full h-full opacity-50 z-50" color="primary"
                         name="crescent"></ion-spinner>
            <div class="z-1 w-full h-full">
                <img v-if="file || url" :src="url || fileUrl" alt="Cleanup picture" class="absolute w-full h-full">
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
import {ImagePicker} from '@ionic-native/image-picker';

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

    @Prop({default: 1})
    max: number

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
        ImagePicker.getPictures({
                maximumImagesCount: this.max,
                width: 1024,
                quality: 90,
                outputType: 1
            })
            .then((images: string[]) => Promise.all(images.map((image) =>
                fetch('data:image/jpeg;base64,' + image).then((res) => res.blob())))
            ).then((blobs: Blob[]) => {
                this.loading = false
                this.filesSelected(blobs)
            })
            .catch((err) => {
                console.log(err)
                this.loading = false
            })
    }

    @Emit('select')
    filesSelected(files: Blob[]) {
        return files
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
    background-color: #eee;
    border: 4px solid #fff;
    border-radius: 50%;
}

.picture-button .background {
    background: url("/add-picture.png") center center/cover;
    border: 2px dashed #b0b0b0;
    border-radius: 1rem;
}

.picture-button.rounded .background {
    border: none;
    border-radius: 50%;
}

.picture-button:after {
    content: '';
    display: block;
    padding-top: 100%;
}

.picture-button img {
    object-fit: cover;
    object-position: center center;
}
</style>
