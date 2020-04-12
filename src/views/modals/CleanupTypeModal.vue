<template>
  <ion-card color="white" class="block ion-activatable">
    <ion-card-header>
      <ion-card-subtitle class="text-center font-bold">
        {{title}}
      </ion-card-subtitle>
    </ion-card-header>
    <ion-card-content class="p-2 -mt-2 h-80">
      <div class="text-center mb-6 px-2">
        <p>{{message}}</p>
      </div>
      <ion-row class="h-80">
        <ion-col class="h-85">
          <div @click="selected(false)" class="flex flex-col justify-center items-center h-full">
            <div class="w-1/2 mb-4">
              <img alt="Icon cleanup not done" src="@/assets/img/alert.svg">
            </div>
            <ion-label class="text-center"><b>{{buttonNotDone}}</b></ion-label>
          </div>
        </ion-col>
        <ion-col class="h-85">
          <div @click="selected(true)" class="flex flex-col justify-center items-center h-full">
            <div class="w-1/2 mb-4">
              <img alt="Icon cleanup done" src="@/assets/img/cleanup.svg">
            </div>
            <ion-label class="text-center"><b>{{buttonDone}}</b></ion-label>
          </div>
        </ion-col>
      </ion-row>
    </ion-card-content>
    <ion-ripple-effect></ion-ripple-effect>
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
    buttonDone: string

    @Prop(String)
    buttonNotDone: string

    selected(done: boolean) {
      this.$ionic.modalController.dismiss(done)
    }
  }
</script>
<style>
  ion-modal.cleanup-type-modal {
    --background: transparent;
    --height: 50%;
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
