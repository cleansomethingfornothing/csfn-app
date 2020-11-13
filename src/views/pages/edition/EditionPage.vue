<template>
  <ion-page class="ion-page">
    <ion-header mode="ios">
      <ion-toolbar mode="ios">
        <ion-buttons slot="start">
          <ion-button color="dark" fill="clear" shape="round" @click="$router.back()">
            <ion-icon name="arrow-back" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title v-if="type">
          {{ $t('publish') }} {{ $t(this.type).toLowerCase() }}
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content color="lighter">
      <form v-if="activity"
            class="lg:w-2/3 xl:w-1/2 m-auto bg-white lg:rounded-lg lg:my-8 lg:shadow-lg h-full lg:h-auto lg:pb-4">
        <ion-list lines="full" class="p-0">
          <input-item v-if="isEvent" :errors="errors['title']" :placeholder="$t('title')" v-model="activity.title"
                      input-class="font-bold" @focus="resetError('title')"></input-item>
          <input-item :errors="errors['description']" :slotted-input="$refs['desc']" @focus="resetError('description')">
            <ion-textarea :placeholder="$t('write-description')" auto-grow="true" rows="3" maxlength="1024"
                          @ionChange="change('description', $event.target.value)" ref="desc"></ion-textarea>
          </input-item>
          <ion-picker-controller v-if="isCleanup"></ion-picker-controller>
          <input-item :errors="errors['volume']" :icon-src="require('@/assets/img/icons/bag.svg')" end-note="Lt"
                      @focus="openLitersPicker" v-if="isCleanup" type="number" class="liters">
            <ion-label position="floating" class="fix-label">{{ $t('volume') }}</ion-label>
            <ion-input type="number" :value="activity.volume" readonly="true" @focus="openLitersPicker"></ion-input>
          </input-item>
          <input-item :errors="errors['weight']" :icon-src="require('@/assets/img/icons/weight.svg')" end-note="Kg"
                      :slotted-input="$refs.weight"
                      @focus="resetError('weight')" v-if="isCleanup">
            <ion-label position="floating" class="fix-label">{{ $t('weight') }}</ion-label>
            <ion-input type="number" @ionChange="change('weight', $event.target.value)" ref="weight"></ion-input>
          </input-item>
          <input-item :errors="errors['targetVolume']" :icon-src="require('@/assets/img/icons/bag.svg')" end-note="Lt"
                      :slotted-input="$refs.targetVolume"
                      @focus="resetError('targetVolume')" v-if="isEvent">
            <ion-label position="floating" class="fix-label">{{ $t('targetVolume') }}</ion-label>
            <ion-input type="number" @ionChange="change('targetVolume', $event.target.value)"
                       ref="targetVolume"></ion-input>
          </input-item>
          <input-item :errors="errors['targetWeight']" :icon-src="require('@/assets/img/icons/weight.svg')"
                      end-note="Kg"
                      :slotted-input="$refs.targetWeight"
                      @focus="resetError('targetWeight')" v-if="isEvent">
            <ion-label position="floating" class="fix-label">{{ $t('targetWeight') }}</ion-label>
            <ion-input type="number" @ionChange="change('targetWeight', $event.target.value)"
                       ref="targetWeight"></ion-input>
          </input-item>
          <input-item :errors="errors['location']" icon="location" @focus="openLocationSelection"
                      :end-note="isEvent && activity.radius ? (`(${activity.radius} Km)`) : null">
            <ion-label position="floating" class="fix-label">{{ $t('location') }}</ion-label>
            <ion-input type="text" :value="addressString"
                       readonly="true" @focus="openLocationSelection"></ion-input>
          </input-item>
          <input-item :errors="errors['date']" icon="calendar" @focus="resetError('date') || $refs.date.open()"
                      v-if="isCleanup">
            <ion-label position="floating" class="fix-label">{{ $t('date') }}</ion-label>
            <ion-datetime display-format="DD/MM/YYYY" picker-format="DD MMMM YYYY"
                          v-model="activity.date" ref="date" :readonly="true"
                          @ionChange="change('date', new Date($event.target.value))"></ion-datetime>
          </input-item>
          <input-item :errors="eventDatesErrors" icon="calendar" @focus="resetError('date')" v-if="isEvent">
            <ion-row class="w-full">
              <ion-col class="w-1/2 ion-activatable p-0 hydrated" @click="$refs.startDate.open()"
                       :class="!activity.startDate ? 'no-value' : ''">
                <ion-label position="floating" class="fix-label">{{ $t('startDate') }}</ion-label>
                <ion-datetime display-format="DD/MM/YYYY" picker-format="DD MMMM YYYY" class="pl-0"
                              v-model="activity.startDate" ref="startDate" :readonly="true" :max="nextYear"
                              @ionChange="change('startDate', new Date($event.target.value))"></ion-datetime>
              </ion-col>
              <ion-col class="w-1/2 ion-activatable p-0 hydrated" @click="$refs.endDate.open()"
                       :class="!activity.endDate ? 'no-value' : ''">
                <ion-label position="floating" class="fix-label">{{ $t('endDate') }}</ion-label>
                <ion-datetime display-format="DD/MM/YYYY" picker-format="DD MMMM YYYY" class="pl-0"
                              v-model="activity.endDate" ref="endDate" :readonly="true" :max="nextYear"
                              @ionChange="change('endDate', new Date($event.target.value))"></ion-datetime>
              </ion-col>
            </ion-row>
          </input-item>
          <input-item :errors="errors['pictures']" no-lines class="mb-4">
            <ion-label position="floating" class="publish-label">{{ $t('pictures') }}</ion-label>
            <ion-row class="w-full mt-8 mb-2" v-if="activity.pictures">
              <ion-col v-for="i of [0,1,2,3,4]" :key="i">
                <upload-button :file="activity.pictures[i]"
                               @click="resetError('pictures') || activity.pictures[i] && openPreview(i)"
                               @select="arrayChange(activity.pictures, $event)"></upload-button>
              </ion-col>
            </ion-row>
          </input-item>
        </ion-list>
      </form>
    </ion-content>
    <ion-footer mode="ios" class="shadow-sm">
      <ion-toolbar class="px-2">
        <ion-button class="sm:w-2/3 lg:w-1/2 m-auto" color="primary" fill="solid" size="block" shape="round"
                    @click="publish">
          {{ $t('publish') }}
        </ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ModalPresenter from '@/tools/ModalPresenter'
import LocationModal from '@/views/modals/LocationModal.vue'
import {locationModule} from '@/store/locationModule'
import {placesProvider} from '@/providers/places/places.provider'
import Location from '@/types/Location'
import PicturesModal from '@/views/modals/PicturesModal.vue'
import UploadButton from '@/views/components/common/UploadButton.vue'
import FormError from '@/types/errors/FormError'
import ErrorMessage from '@/tools/ErrorMessage'
import InputError from '@/views/components/common/InputError.vue'
import InputItem from '@/views/components/common/InputItem.vue'
import range from 'lodash/range'
import {addressToString} from '@/tools/Utils'
import {ActivityType} from '@/types/ActivityType'
import Cleanup from "@/types/Cleanup";
import {cleanupsModule} from "@/store/cleanupsModule";
import ToastPresenter from "@/tools/ToastPresenter";
import Validator from "@/tools/Validator";
import {appModule} from "@/store/appModule";
import UnknownError from "@/types/errors/UnknownError";

@Component({
  name: 'edition-page',
  components: {InputItem, InputError, UploadButton}
})
export default class EditionPage extends Vue {

  errors = {}

  type = ActivityType.cleanup
  activity = null

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

  mounted(): void {
    this.$set(this, 'type', ActivityType[(this.$route.query.type as string)])
    this.$set(this, 'activity', new Cleanup())
  }

  publish() {
    let f: Function
    switch (this.type) {
      case ActivityType.cleanup:
        f = cleanupsModule.publish
        break
      case ActivityType.alert:
        break
      case ActivityType.event:
        break
    }

    appModule.showLoader(this.$ionic)
        .then(() => Validator.validate(this.activity))
        .then(() => f.apply(cleanupsModule, [this.activity]))
        .then(() => {
          appModule.hideLoader()
          ToastPresenter.present(this.$ionic, this.$t(this.type) + ' ' + this.$t('published'),'success' )
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

  openLocationSelection() {
    this.resetError('location')
    ModalPresenter.present(this.$ionic, LocationModal, {
      currentCoords: this.activity.location?.coords || this.coords,
      currentAddress: this.activity.location?.address || this.address,
      searchPlaceholder: this.$t('search-place'),
      cancelText: this.$t('cancel'),
      acceptText: this.$t('confirm'),
      showRadius: this.isEvent,
      pin: '/img/pin.png'
    }).then(({data}) => {
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
    document.querySelector("ion-picker-controller").create({
      cssClass: 'liters',
      columns: [{
        name: 'bags',
        options: range(1, 31).map(i => ({value: i, text: `${i} ${this.$tc('bags', i)}`}))
      }, {
        name: 'of',
        options: [{text: this.$t('of').toString()}]
      }, {
        name: 'capacity',
        options: range(10, 110, 10).map(i => ({value: i, text: `${i} ${this.$t('liters').toString().toLowerCase()}`}))
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
          }
        }
      ]
    }).then((picker) => picker.present())
  }

  openPreview(selected: number) {
    this.resetError('pictures')
    ModalPresenter.present(this.$ionic, PicturesModal, {
      pictures: this.activity.pictures,
      selected,
      removable: true
    }).then(({data}) => {
      if (data) {
        this.activity.pictures.splice(data.index, 1)
      }
    })
  }

  change(field, value) {
    this.$set(this.activity, field, value)
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
