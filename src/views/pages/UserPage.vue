<template>
  <ion-page>
    <transparent-header :scrolled="scrolled" :lg-opaque="true">
      <template slot="end-buttons">
        <ion-button shape="round" fill="clear" :color="scrolled ? 'dark' : 'white'" @click="$router.push('/settings')">
          <ion-icon name="settings"></ion-icon>
        </ion-button>
      </template>
    </transparent-header>

    <ion-content @ionScroll="onScroll" class="fullscreen" color="lighter">
      <div class="lg:w-2/3 xl:w-1/2 m-auto bg-white lg:rounded-lg lg:mt-16 overflow-hidden lg:shadow-lg">
        <div class="h-2/3">
          <img class="absolute object-center object-cover" src="@/assets/img/profile-bg-large.png">
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang=ts>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import TransparentHeader from '@/views/components/common/TransparentHeader.vue'

  @Component({
    name: "UserPage",
    components: {TransparentHeader}
  })
  export default class UserPage extends Vue {

    scrolled = false

    onScroll(event: CustomEvent): void {
      this.scrolled = event.detail.scrollTop > 0;
    }

  }
</script>
<style scoped>

</style>
