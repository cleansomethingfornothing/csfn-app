<template>
  <div class="home-header" :class="hideTopToolbar ? ' scrolled': ''">
    <ion-header mode="ios">
      <ion-toolbar mode="ios">
        <ion-buttons slot="start">
          <ion-menu-button auto-hide="true" color="dark"></ion-menu-button>
        </ion-buttons>
        <ion-title>
          Clean Something For Nothing
        </ion-title>
      </ion-toolbar>

      <ion-toolbar mode="ios" class="pb-1">
        <div class="home-bubbles">
          <div class="home-bubble home-location-button">
            <home-header-button @click="click('location')">
              <ion-icon name="location" color="primary"></ion-icon>
              <ion-spinner name="dots" v-if="address === undefined"></ion-spinner>
              <ion-label v-if="address === null">{{$t('select-location')}}</ion-label>
              <ion-label class="ion-color-dark" v-if="address">
                {{address.city}}, {{address.state}}
              </ion-label>
              <i></i>
            </home-header-button>
          </div>
          <div class="home-bubble">
            <home-header-button :icon-only="true" @click="click('filter')">
              <ion-icon name="filter"></ion-icon>
            </home-header-button>
          </div>
          <div class="home-bubble">
            <home-header-button :icon-only="true" @click="click('map')">
              <ion-icon name="map"></ion-icon>
            </home-header-button>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Emit, Prop} from 'vue-property-decorator'
  import HomeHeaderButton from '@/components/home/HomeHeaderButton.vue'
  import Address from '@/types/Address'

  @Component({
    name: 'home-header',
    components: {HomeHeaderButton}
  })
  export default class HomeHeader extends Vue {
    @Prop(Boolean)
    readonly hideTopToolbar!: boolean

    @Prop(Object)
    readonly address: Address

    @Emit('click')
    click(modal) {
      return modal
    }
  }
</script>
<style>

  .home-header > ion-header {
    transition: margin-top 0.5s;
  }

  .home-header.scrolled > ion-header {
    margin-top: -56px;
  }

  .ios .home-header.scrolled > ion-header {
    margin-top: -41px !important;
  }

  .home-header > ion-toolbar:nth-child(2) {
    border-bottom: 1px solid #ddd;
  }

  .home-bubbles {
    padding: 0 0.5em;
    display: flex;
    align-items: center;
  }

  .home-bubble {
    display: inline;
  }

  .home-bubble + .home-bubble {
    margin-left: 0.5em;
  }

  .home-location-button {
    width: calc(100% - 36px - 36px - 1em);
  }
</style>
