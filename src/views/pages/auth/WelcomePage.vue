<template>
  <ion-page class="ion-page">
    <ion-header mode="ios">
      <ion-toolbar class="economica text-center text-xl" mode="ios">
        Clean something for nothing
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-slides ref="slider" :pager="true" class="h-full welcome-slider" mode="ios"
                  @ionSlideTransitionStart="slideChange">
        <ion-slide>
          <img src="@/assets/img/welcome/welcome-1.png"/>
        </ion-slide>
        <ion-slide>
          <img src="@/assets/img/welcome/welcome-2.png"/>
        </ion-slide>
        <ion-slide>
          <img src="@/assets/img/welcome/welcome-3.png"/>
        </ion-slide>
      </ion-slides>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'welcome-page'
})
export default class WelcomePage extends Vue {

  isEnd = false

  slideChange() {
    (this.$refs['slider'] as HTMLIonSlidesElement).isEnd()
      .then((end) => {
        if (this.isEnd && end) {
          this.$router.replace('/home')
        }
        this.isEnd = end
      })
  }

}
</script>
<style scoped>
.welcome-slider {
  --bullet-background: #222222 !important;
  --bullet-background-active: #999 !important;
}
</style>
