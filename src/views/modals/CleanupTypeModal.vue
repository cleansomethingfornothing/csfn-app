<template>
  <ion-card color="white" class="block">
    <ion-card-header>
      <ion-card-subtitle class="text-center font-bold">
        {{title}}
      </ion-card-subtitle>
    </ion-card-header>
    <ion-card-content class="p-2 -mt-2 h-80">
      <div class="text-center mb-4 px-2">
        <p>{{message}}</p>
      </div>
      <ion-row class="h-80">
        <ion-col class="h-85 ion-activatable ripple-parent rounded-full">
          <div @click="selected(false)" class="flex flex-col justify-center items-center h-full">
            <div class="w-24 mb-4">
              <img alt="Icon cleanup not done" src="@/assets/img/icons/alert.svg">
            </div>
            <ion-label class="text-center"><b>{{alert}}</b></ion-label>
          </div>
          <ion-ripple-effect></ion-ripple-effect>
        </ion-col>
        <ion-col class="h-85 ion-activatable ripple-parent rounded-full">
          <div @click="selected(true)" class="flex flex-col justify-center items-center h-full">
            <div class="w-24 mb-4">
              <img alt="Icon cleanup done" src="@/assets/img/icons/cleanup.svg">
            </div>
            <ion-label class="text-center"><b>{{cleanup}}</b></ion-label>
          </div>
          <ion-ripple-effect></ion-ripple-effect>
        </ion-col>
      </ion-row>
    </ion-card-content>
  </ion-card>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: 'select-cleanup-type'
  })
  export default class SelectCleanupType extends Vue {

    @Prop()

    @Prop(String)
    title: string

    @Prop(String)
    message: string

    @Prop(String)
    alert: string

    @Prop(String)
    cleanup: string

    selected(done: boolean) {
      this.$ionic.modalController.dismiss(done)
    }
  }
</script>
<style>
  ion-modal.cleanup-type-modal {
    --background: transparent;
    --height: 300px;
    --box-shadow: none;
  }

  .cleanup-type-modal ion-toolbar {
    --border-width: 0;
  }

  .h-85 {
    height: 85%;
  }

  .h-80 {
    height: 80%;
  }
</style>
