<template>
  <div class="home-header" :class="hideTopToolbar ? ' scrolled': ''">
    <ion-header mode="ios" class="shadow-sm" color="white">
      <ion-toolbar>
        <div class="flex items-center w-full">
          <img src="@/assets/img/icon.png" class="w-1/12 ml-3" style="max-width: 28px">
          <span class="title ml-3 sm:text-xl md:text-2xl">clean something for nothing</span>
        </div>
        <!--
        <ion-buttons slot="start">
          <ion-menu-button auto-hide="true" color="dark"></ion-menu-button>
        </ion-buttons>
        <ion-title>
          Clean Something For Nothing
        </ion-title>
        -->
        <ion-buttons slot="end">
          <ion-button fill="clear" shape="round" color="dark" size="large">
            <ion-icon name="more" slor="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>

      <ion-toolbar mode="ios" class="pb-1">
        <div class="home-bubbles lg:w-2/3 xl:w-1/2 m-auto">
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
            <home-header-button :icon-only="true" @click="click('filters')">
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
  import HomeHeaderButton from '@/views/components/home/HomeHeaderButton.vue'
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
    transition: margin-top 0.4s;
  }

  .home-header.scrolled > ion-header {
    margin-top: -41px;
  }

  .md .home-header.scrolled > ion-header {
    margin-top: -50px !important;
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
