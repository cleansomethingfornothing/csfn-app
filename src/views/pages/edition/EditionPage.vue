<template>
  <ion-page class="ion-page absolute">
    <ion-header mode="ios">
      <ion-toolbar mode="ios">
        <ion-buttons slot="start">
          <ion-button color="dark" fill="clear" shape="round" @click="$router.back()">
            <ion-icon slot="icon-only" name="arrow-back"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title v-if="type">
          {{ $t(activity && activity.id ? 'edit' : 'publish') }} {{ $t(this.type).toLowerCase() }}
        </ion-title>
        <ion-buttons v-if="activity && activity.id && activity.user && activity.user.id === currentUser.id"
                     slot="end">
          <ion-button color="danger" fill="clear" shape="round" @click="showRemoveAlert">
            <ion-icon slot="icon-only" :src="require('ionicons5/dist/svg/trash.svg')"
                      color="error"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form class="lg:w-2/3 xl:w-1/2 m-auto bg-white lg:rounded-lg lg:my-8 lg:shadow-lg h-full lg:h-auto">
        <ion-list v-if="activity" class="p-0 pb-16" lines="full">
          <input-item v-if="isEvent" v-model="activity.title" :errors="errors['title']"
                      :placeholder="$t('title')"
                      input-class="font-bold" @focus="resetError('title')"></input-item>
          <input-item :errors="errors['description']" :slotted-input="$refs['desc']"
                      @focus="resetError('description')">
            <ion-textarea ref="desc" :placeholder="$t('write-description')" :value="activity.description"
                          auto-grow="true" maxlength="1024" rows="3"
                          @ionChange="change('description', $event.target.value)"></ion-textarea>
          </input-item>
          <ion-picker-controller v-if="isCleanup"></ion-picker-controller>
          <input-item v-if="isCleanup" :errors="errors['volume']"
                      :icon-src="require('@/assets/img/icons/bag.svg')"
                      class="liters" end-note="Lt" type="number" @focus="openLitersPicker">
            <ion-label class="fix-label" position="floating">{{ $t('volume') }}</ion-label>
            <ion-input :value="activity.volume" readonly="true" type="number"
                       @focus="openLitersPicker"></ion-input>
          </input-item>
          <input-item v-if="isCleanup" :errors="errors['weight']"
                      :icon-src="require('@/assets/img/icons/scale.svg')"
                      :slotted-input="$refs.weight"
                      end-note="Kg" @focus="resetError('weight')">
            <ion-label class="fix-label" position="floating">{{ $t('weight') }} <span
              class="text-xs">{{ automaticWeight ? $t('automatic-weight') : '' }}</span></ion-label>
            <ion-input ref="weight" :value="activity.weight" enterkeyhint="enter"
                       type="number" @ionInput="automaticWeight = false" inputmode="numeric"
                       @ionChange="change('weight', $event.target.value)"></ion-input>
          </input-item>
          <input-item v-if="isEvent" :errors="errors['targetVolume']"
                      :icon-src="require('@/assets/img/icons/bag.svg')"
                      :slotted-input="$refs.targetVolume"
                      end-note="Lt" @focus="resetError('targetVolume')">
            <ion-label class="fix-label" position="floating">{{ $t('targetVolume') }}</ion-label>
            <ion-input ref="targetVolume" type="number"
                       @ionChange="change('targetVolume', $event.target.value)"></ion-input>
          </input-item>
          <input-item v-if="isEvent" :errors="errors['targetWeight']"
                      :icon-src="require('@/assets/img/icons/scale.svg')"
                      :slotted-input="$refs.targetWeight"
                      end-note="Kg" @focus="resetError('targetWeight')">
            <ion-label class="fix-label" position="floating">{{ $t('targetWeight') }}</ion-label>
            <ion-input ref="targetWeight" type="number"
                       @ionChange="change('targetWeight', $event.target.value)"></ion-input>
          </input-item>
          <input-item :end-note="isEvent && activity.radius ? (`(${activity.radius} Km)`) : null"
                      :errors="errors['location']" icon="location-sharp"
                      @focus="openLocationSelection">
            <ion-label class="fix-label" position="floating">{{ $t('location') }}</ion-label>
            <ion-input :value="addressString" readonly="true"
                       type="text" @focus="openLocationSelection"></ion-input>
          </input-item>
          <input-item v-if="isCleanup" :errors="errors['date']"
                      icon="calendar"
                      @focus="resetError('date') || $refs.date.open()">
            <ion-label class="fix-label" position="floating">{{ $t('date') }}</ion-label>
            <ion-datetime ref="date" v-model="activity.date"
                          :readonly="true" :value="activity.date" display-format="DD/MM/YYYY"
                          picker-format="DD MMMM YYYY"
                          @ionChange="change('date', new Date($event.target.value))"></ion-datetime>
          </input-item>
          <input-item v-if="isEvent" :errors="eventDatesErrors" icon="calendar" @focus="resetError('date')">
            <ion-row class="w-full">
              <ion-col :class="!activity.startDate ? 'no-value' : ''"
                       class="w-1/2 ion-activatable p-0 hydrated"
                       @click="$refs.startDate.open()">
                <ion-label class="fix-label" position="floating">{{ $t('startDate') }}</ion-label>
                <ion-datetime ref="startDate" v-model="activity.startDate" :max="nextYear"
                              :readonly="true" class="pl-0" display-format="DD/MM/YYYY"
                              picker-format="DD MMMM YYYY"
                              @ionChange="change('startDate', new Date($event.target.value))"></ion-datetime>
              </ion-col>
              <ion-col :class="!activity.endDate ? 'no-value' : ''"
                       class="w-1/2 ion-activatable p-0 hydrated"
                       @click="$refs.endDate.open()">
                <ion-label class="fix-label" position="floating">{{ $t('endDate') }}</ion-label>
                <ion-datetime ref="endDate" v-model="activity.endDate" :max="nextYear"
                              :readonly="true" class="pl-0" display-format="DD/MM/YYYY"
                              picker-format="DD MMMM YYYY"
                              @ionChange="change('endDate', new Date($event.target.value))"></ion-datetime>
              </ion-col>
            </ion-row>
          </input-item>
          <input-item :errors="errors['pictures']" class="mb-4" no-lines>
            <ion-label class="publish-label" position="floating">{{ $t('pictures') }}</ion-label>
            <ion-row v-if="activity.pictures" class="w-full mt-8 mb-2">
              <ion-col v-for="i of [0,1,2,3,4]" :key="i">
                <upload-button :file="thumbnails[i]" :max="5 - activity.pictures.length"
                               :url="activity.pictures[i] && activity.pictures[i].publicUrl"
                               @click="resetError('pictures') || activity.pictures[i] && openImagePreview(i)"
                               @select="picturesSelected"></upload-button>
              </ion-col>
            </ion-row>
          </input-item>
        </ion-list>
      </form>
    </ion-content>
    <div class="shadow-sm fixed bottom-0 w-full border-t">
      <ion-toolbar class="px-2">
        <ion-button class="sm:w-2/3 lg:w-1/2 m-auto" color="primary" fill="solid" shape="round" size="block"
                    @click="activity.id ? update() : publish()">
          {{ $t(activity && activity.id ? 'save' : 'publish') }}
        </ion-button>
      </ion-toolbar>
    </div>
  </ion-page>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ModalPresenter from '@/tools/ModalPresenter'
import LocationModal from '@/views/modals/SelectCleanupLocationModal.vue'
import { locationModule } from '@/store/locationModule'
import { placesProvider } from '@/providers/places/places.provider'
import Location from '@/types/Location'
import PicturesModal from '@/views/modals/PicturesModal.vue'
import UploadButton from '@/views/components/common/UploadButton.vue'
import FormError from '@/types/errors/FormError'
import ErrorMessage from '@/tools/ErrorMessage'
import InputError from '@/views/components/common/InputError.vue'
import InputItem from '@/views/components/common/InputItem.vue'
import range from 'lodash/range'
import { addressToString } from '@/tools/Utils'
import { ActivityType } from '@/types/ActivityType'
import Cleanup from '@/types/Cleanup'
import { cleanupsModule } from '@/store/cleanupsModule'
import ToastPresenter from '@/tools/ToastPresenter'
import Validator from '@/tools/Validator'
import { appModule } from '@/store/appModule'
import UnknownError from '@/types/errors/UnknownError'
import { userModule } from '@/store/userModule'
import { resizePicture } from '@/tools/ImageProcessor'
import { Prop } from 'vue-property-decorator'
import Image from '@/types/Image'

@Component({
  name: 'edition-page',
  components: { InputItem, InputError, UploadButton }
})
export default class EditionPage extends Vue {

  @Prop()
  type: ActivityType

  errors = {}

  activity: Cleanup = null
  thumbnails: (Blob | string)[] = []
  previousPictures = []
  removedPictures = []
  automaticWeight = false

  get currentUser() {
    return userModule.currentUser
  }

  get isCleanup() {
    return this.type === ActivityType.cleanup
  }

  get isAlert() {
    return this.type === ActivityType.alert
  }

  get isEvent() {
    return this.type === ActivityType.event
  }

  get coords() {
    return locationModule.getCoords
  }

  get address() {
    return locationModule.getAddress
  }

  get nextYear() {
    return new Date().getFullYear() + 1
  }

  get addressString() {
    return this.activity.location && addressToString(this.activity.location.address)
  }

  get eventDatesErrors() {
    return [...(this.errors['startDate'] || []), ...(this.errors['endDate']) || []]
  }

  get publishMethod() {
    switch (this.type) {
      case 'cleanup':
        return cleanupsModule.publish
      default:
        return null
    }
  }

  get updateMethod() {
    switch (this.type) {
      case 'cleanup':
        return cleanupsModule.update
      default:
        return null
    }
  }

  get removeMethod() {
    switch (this.type) {
      case 'cleanup':
        return cleanupsModule.remove
      default:
        return null
    }
  }

  mounted(): void {
    this.$set(this, 'activity', cleanupsModule.getCleanup || new Cleanup())
    if (this.activity.id) {
      this.previousPictures = [...this.activity.pictures]
      this.thumbnails = (this.activity.pictures as Image[]).map(({publicUrl}) => publicUrl)
    }
  }

  publish() {
    this.save(this.publishMethod, 'published', this.activity)
  }

  update() {
    this.save(this.updateMethod, 'updated', { cleanup: this.activity, removedPictures: this.removedPictures })
  }

  remove() {
    this.doRemove(this.removeMethod)
  }

  save(method: (any) => Promise<void>,
       successMessage: string,
       param: any) {
    appModule.showLoader(this.$ionic)
      .then(() => Validator.validate(this.activity))
      .then(() => method.apply(cleanupsModule, [param]))
      .then(() => {
        appModule.hideLoader()
        ToastPresenter.present(this.$ionic, this.$t(this.type) + ' ' + this.$t(successMessage).toString().toLowerCase(), 'success')
        this.$router.back()
      })
      .catch((error) => {
        appModule.hideLoader()
        if (error instanceof FormError) {
          error.fieldErrors.forEach((error) => {
            this.$set(this.errors, error.param, [ErrorMessage.getMessage(error)])
          })
        } else if (error instanceof UnknownError) {
          ToastPresenter.present(this.$ionic, ErrorMessage.getMessage(error))
        }
      })
  }

  doRemove(method: (id: number) => Promise<void>) {
    appModule.showLoader(this.$ionic)
      .then(() => method.apply(cleanupsModule, [this.activity.id]))
      .then(() => {
        appModule.hideLoader()
        ToastPresenter.present(this.$ionic, this.$t(this.type) + ' ' + this.$t('removed').toString().toLowerCase(), 'success')
        this.$router.push('/home')
      })
      .catch((error) => {
        appModule.hideLoader()
        if (error instanceof FormError) {
          error.fieldErrors.forEach((error) => {
            this.$set(this.errors, error.param, [ErrorMessage.getMessage(error)])
          })
        } else if (error instanceof UnknownError) {
          ToastPresenter.present(this.$ionic, ErrorMessage.getMessage(error))
        }
      })
  }

  showRemoveAlert() {
    this.$ionic.alertController.create({
      header: this.$t('remove-header', [this.$t(this.type)]).toString(),
      message: this.$t('remove-message', [this.$t('the-' + this.type)]).toString(),
      buttons: [{
        text: this.$t('cancel').toString(),
        role: 'cancel'
      }, {
        text: this.$t('delete').toString(),
        handler: () => {
          this.remove()
        }
      }]
    }).then((alert) => alert.present())
  }

  openLocationSelection() {
    this.resetError('location')
    ModalPresenter.present(this.$ionic, LocationModal, {
      currentCoords: this.activity.location?.coords || this.coords,
      currentAddress: this.activity.location?.address || this.address,
      searchPlaceholder: this.$t('search-place'),
      cancelText: this.$t('cancel'),
      acceptText: this.$t('confirm'),
      showRadius: this.isEvent,
      pin: '/img/pin_cleanup.png'
    }).then(({ data }) => {
      if (data) {
        placesProvider.getAddress(data.selectedCoords)
          .then((address) => {
            this.$set(this.activity, 'location', new Location(address, data.selectedCoords))
            this.$set(this.activity, 'radius', data.radius)
          })
      }
    })
  }

  openLitersPicker() {
    this.resetError('volume')
    document.querySelector('ion-picker-controller').create({
      cssClass: 'liters',
      columns: [{
        name: 'bags',
        options: range(1, 31).map(i => ({ value: i, text: `${i} ${this.$tc('bags', i)}` }))
      }, {
        name: 'of',
        options: [{ text: this.$t('of').toString() }]
      }, {
        name: 'capacity',
        options: [{
          value: 5,
          text: `5 ${this.$t('liters').toString().toLowerCase()}`
        }, ...range(10, 110, 10).map(i => ({
          value: i,
          text: `${i} ${this.$t('liters').toString().toLowerCase()}`
        }))]
      }],
      buttons: [
        {
          text: this.$t('cancel').toString(),
          role: 'cancel'
        },
        {
          text: this.$t('confirm').toString(),
          handler: (value) => {
            this.$set(this.activity, 'volume', value.bags.value * value.capacity.value)
            this.$set(this.activity, 'weight', this.activity.volume * 0.1)
            this.automaticWeight = true
          }
        }
      ]
    }).then((picker: HTMLIonPickerElement) => picker.present())
  }

  openImagePreview(selected: number) {
    this.resetError('pictures')
    ModalPresenter.present(this.$ionic, PicturesModal, {
      pictures: this.activity.pictures,
      selected,
      removable: true
    }).then(({ data }) => {
      if (data) {
        if (this.activity.id) {
          this.removedPictures.push(this.activity.pictures[data.index].id)
        }
        this.activity.pictures.splice(data.index, 1)
        this.thumbnails.splice(data.index, 1)
      }
    })
  }

  change(field,
         value) {
    this.$set(this.activity, field, value)
  }

  picturesSelected(pictures: Blob[]) {
    this.$set(this.activity, 'pictures', [...this.activity.pictures, ...pictures])
    Promise.all(pictures.map(picture => resizePicture(picture, 256)))
      .then((resized) => this.$set(this, 'thumbnails', [...this.thumbnails, ...resized]))
  }

  resetError(field) {
    this.$set(this.errors, field, undefined)
  }

}
</script>
<style>

.fix-label {
  margin-top: -4px;
}

.ios .item-has-focus .fix-label, .ios .item-has-value .fix-label {
  margin-bottom: -8px;
  margin-top: 6px;
}

.publish-label {
  margin-top: -0.5em !important;
}

.liters.ios .picker-columns .sc-ion-picker-ios:nth-child(2),
.liters.ios .picker-columns .sc-ion-picker-ios:nth-child(4) {
  flex-grow: 1.5;
}

.liters.ios .picker-columns .sc-ion-picker-ios:nth-child(2) .picker-opt {
  padding-left: 15px;
}

.liters.ios .picker-columns .sc-ion-picker-ios:nth-child(4) .picker-opt {
  padding-right: 15px;
}

ion-input[readonly = "true"] {
  text-overflow: ellipsis;
}

.no-value .label-floating.sc-ion-label-md-h {
  transform: translate3d(0, 100%, 0) scale(1);
}
</style>
