<template>
  <ion-page class="ion-page publish-cleanup">
    <ion-header mode="ios">
      <ion-toolbar mode="ios">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>
          {{$t('publish-cleanup')}}
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen="true">
      <form>
        <ion-list lines="full" class="p-0">
          <input-item :errors="errors['description']" :slotted-input="$refs['desc']" @focus="resetError('description')">
            <ion-textarea :placeholder="$t('write-description')" auto-grow="true" rows="3"
                          @ionChange="change('description', $event.target.value)" ref="desc"></ion-textarea>
          </input-item>
          <input-item :errors="errors['weight']" icon="speedometer" end-note="Kg" :slotted-input="$refs.weight"
                      @focus="resetError('weight')" v-if="cleanup.done">
            <ion-label position="floating" class="fix-label">{{$t('weight')}}</ion-label>
            <ion-input type="number" @ionChange="change('weight', $event.target.value)" ref="weight"></ion-input>
          </input-item>
          <input-item :errors="errors['location']" icon="location" @focus="openLocationSelection">
            <ion-label position="floating" class="fix-label">{{$t('location')}}</ion-label>
            <ion-input type="text" :value="cleanup.location && cleanup.location.toString()" readonly="true"></ion-input>
          </input-item>
          <input-item :errors="errors['date']" icon="calendar" @focus="resetError('date') || $refs.date.open()">
            <ion-label position="floating" class="fix-label">{{$t('date')}}</ion-label>
            <ion-datetime display-format="DD/MM/YYYY" picker-format="DD MMMM YYYY"
                          v-model="cleanup.date" ref="date" :readonly="true"
                          @ionChange="change('date', new Date($event.target.value))"></ion-datetime>
          </input-item>
          <input-item :errors="errors['beforePictures']" :no-lines="!cleanup.done">
            <ion-label position="floating" class="publish-label">{{$t('beforePictures')}}</ion-label>
            <ion-row class="w-full mt-8 mb-2">
              <ion-col v-for="i of [0,1,2,3]" :key="i">
                <upload-button :file="cleanup.beforePictures[i]" @click="openPreview('beforePictures', i)"
                               @select="arrayChange(cleanup.beforePictures, $event)"></upload-button>
              </ion-col>
            </ion-row>
          </input-item>

          <input-item :errors="errors['afterPictures']" v-if="cleanup.done" :no-lines="true">
            <ion-label position="floating" class="publish-label">{{$t('afterPictures')}}</ion-label>
            <ion-row class="w-full mt-8 mb-2">
              <ion-col v-for="i of [0,1,2,3]" :key="i">
                <upload-button :file="cleanup.afterPictures[i]" @click="openPreview('afterPictures', i)"
                               @select="arrayChange(cleanup.afterPictures, $event)"></upload-button>
              </ion-col>
            </ion-row>
          </input-item>
        </ion-list>
      </form>
    </ion-content>
    <ion-footer mode="ios">
      <ion-toolbar class="px-2">
        <ion-button color="primary" fill="solid" size="block" shape="round" @click="publish">
          {{$t('publish')}}
        </ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import Cleanup from '@/types/Cleanup'
  import ModalPresenter from '@/tools/ModalPresenter'
  import SelectLocation from '@/views/modals/SelectLocation.vue'
  import {locationModule} from '@/store/locationModule'
  import {placesProvider} from '@/providers/places/places.provider'
  import Location from '@/types/Location'
  import ImagePreview from '@/views/modals/ImagePreview.vue'
  import UploadButton from '@/components/common/UploadButton.vue'
  import FormError from '@/types/errors/FormError'
  import ErrorMessage from '@/tools/ErrorMessage'
  import InputError from '@/components/common/InputError.vue'
  import InputItem from '@/components/common/InputItem.vue'
  import {cleanupsModule} from '@/store/cleanupsModule'

  @Component({
    name: 'publish-cleanup',
    components: {InputItem, InputError, UploadButton}
  })
  export default class PublishCleanup extends Vue {

    errors = {}

    cleanup = new Cleanup()

    get coords() {
      return locationModule.getCoords
    }

    get address() {
      return locationModule.getAddress
    }

    mounted(): void {
      this.$set(this.cleanup, 'done', this.$route.query['done'] == 'true')
    }

    publish() {
      cleanupsModule.publishCleanup(this.cleanup)
        .then(() => {
          this.$router.back()
        })
        .catch((error) => {
          if (error instanceof FormError) {
            error.fieldErrors.forEach((error) => {
              this.$set(this.errors, error.param, [ErrorMessage.getMessage(error)])
            })
          }
        })
    }

    openLocationSelection() {
      this.resetError('location')
      ModalPresenter.present(this.$ionic, SelectLocation, {
        currentCoords: this.cleanup.location?.coords || this.coords,
        currentAddress: this.cleanup.location?.address || this.address,
        searchPlaceholder: this.$t('search-place'),
        cancelText: this.$t('cancel'),
        acceptText: this.$t('save')
      }).then(({data}) => {
        if (data) {
          placesProvider.getAddress(data.selectedCoords)
            .then((address) => {
              this.$set(this.cleanup, 'location', new Location(address, data.selectedCoords))
            })
        }
      })
    }

    openPreview(arrayName: string, index: number) {
      this.resetError(arrayName)
      if (!this.cleanup[arrayName][index]) return
      ModalPresenter.present(this.$ionic, ImagePreview, {
        image: this.cleanup[arrayName][index]
      }).then(({data}) => {
        if (data?.remove) {
          this.cleanup[arrayName].splice(index, 1)
        }
      })
    }

    change(field, value) {
      this.$set(this.cleanup, field, value)
    }

    arrayChange(array, picture) {
      this.$set(array, array.length, picture)
    }

    resetError(field) {
      this.$set(this.errors, field, undefined)
    }
  }
</script>
<style>
  .publish-cleanup {
    display: flex;
    flex-direction: column;
  }

  .fix-label {
    margin-top: -4px;
  }

  .ios .item-has-focus .fix-label, .ios .item-has-value .fix-label {
    margin-top: 6px;
    margin-bottom: -8px;
  }

  .publish-label {
    margin-top: -0.5em !important;
  }
</style>
