<template>
  <ion-page class="ion-page publish-activity">
    <ion-header mode="ios" class="shadow-sm">
      <ion-toolbar mode="ios">
        <ion-buttons slot="start">
          <ion-button color="dark" fill="clear" shape="round" @click="$router.back()">
            <ion-icon name="arrow-back" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>
          {{$t('publish')}} {{$t(this.activity.type).toLowerCase()}}
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content color="lighter">
      <form
        class="lg:w-2/3 xl:w-1/2 m-auto bg-white lg:rounded-lg lg:my-8 lg:shadow-lg h-full lg:h-auto lg:pb-4">
        <ion-list lines="full" class="p-0">
          <input-item v-if="isEvent" :errors="errors['title']" :placeholder="$t('title')" v-model="activity.title"
                      input-class="font-bold"></input-item>
          <input-item :errors="errors['description']" :slotted-input="$refs['desc']" @focus="resetError('description')">
            <ion-textarea :placeholder="$t('write-description')" auto-grow="true" rows="3"
                          @ionChange="change('description', $event.target.value)" ref="desc"></ion-textarea>
          </input-item>
          <ion-picker-controller v-if="isCleanup"></ion-picker-controller>
          <input-item :errors="errors['volume']" :icon-src="require('@/assets/img/icons/bag.svg')" end-note="Lt"
                      @focus="openLitersPicker" v-if="isCleanup" type="number" class="liters">
            <ion-label position="floating" class="fix-label">{{$t('volume')}}</ion-label>
            <ion-input type="number" :value="activity.volume" readonly="true" @focus="openLitersPicker"></ion-input>
          </input-item>
          <input-item :errors="errors['weight']" :icon-src="require('@/assets/img/icons/weight.svg')" end-note="Kg"
                      :slotted-input="$refs.weight"
                      @focus="resetError('weight')" v-if="isCleanup">
            <ion-label position="floating" class="fix-label">{{$t('weight')}}</ion-label>
            <ion-input type="number" @ionChange="change('weight', $event.target.value)" ref="weight"></ion-input>
          </input-item>
          <input-item :errors="errors['location']" icon="location" @focus="openLocationSelection">
            <ion-label position="floating" class="fix-label">{{$t('location')}}</ion-label>
            <ion-input type="text" :value="activity.location && activity.location.toString()"
                       readonly="true" @focus="openLocationSelection"></ion-input>
          </input-item>
          <input-item :errors="errors['date']" icon="calendar" @focus="resetError('date') || $refs.date.open()"
                      v-if="isCleanup">
            <ion-label position="floating" class="fix-label">{{$t('date')}}</ion-label>
            <ion-datetime display-format="DD/MM/YYYY" picker-format="DD MMMM YYYY"
                          v-model="activity.date" ref="date" :readonly="true"
                          @ionChange="change('date', new Date($event.target.value))"></ion-datetime>
          </input-item>
          <input-item :errors="errors['pictures']" no-lines class="mb-16">
            <ion-label position="floating" class="publish-label">{{$t('pictures')}}</ion-label>
            <ion-row class="w-full mt-8 mb-2">
              <ion-col v-for="i of [0,1,2,3,4]" :key="i">
                <upload-button :file="activity.pictures[i]" @click="activity.pictures[i] && openPreview(i)"
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
          {{$t('publish')}}
        </ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import Activity from '@/types/Activity'
  import ModalPresenter from '@/tools/ModalPresenter'
  import SelectLocation from '@/views/modals/LocationModal.vue'
  import {locationModule} from '@/store/locationModule'
  import {placesProvider} from '@/providers/places/places.provider'
  import Location from '@/types/Location'
  import PicturesModal from '@/views/modals/PicturesModal.vue'
  import UploadButton from '@/views/components/common/UploadButton.vue'
  import FormError from '@/types/errors/FormError'
  import ErrorMessage from '@/tools/ErrorMessage'
  import InputError from '@/views/components/common/InputError.vue'
  import InputItem from '@/views/components/common/InputItem.vue'
  import {cleanupsModule} from '@/store/activitiesModule'
  import range from 'lodash/range'

  @Component({
    name: 'publish-activity',
    components: {InputItem, InputError, UploadButton}
  })
  export default class EditionPage extends Vue {

    type = ''

    errors = {}

    activity = new Activity()

    get isCleanup() {
      return this.activity.type === 'cleanup'
    }

    get isAlert() {
      return this.activity.type === 'alert'
    }

    get isEvent() {
      return this.activity.type === 'event'
    }

    get coords() {
      return locationModule.getCoords
    }

    get address() {
      return locationModule.getAddress
    }

    mounted(): void {
      this.$set(this.activity, 'type', this.$route.query.type)
    }

    publish() {
      cleanupsModule.publish(this.activity)
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
        currentCoords: this.activity.location?.coords || this.coords,
        currentAddress: this.activity.location?.address || this.address,
        searchPlaceholder: this.$t('search-place'),
        cancelText: this.$t('cancel'),
        acceptText: this.$t('confirm'),
        pin: '/img/pin.png'
      }).then(({data}) => {
        if (data) {
          placesProvider.getAddress(data.selectedCoords)
            .then((address) => {
              this.$set(this.activity, 'location', new Location(address, data.selectedCoords))
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
  .publish-activity {
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
</style>
