<template>
  <ion-segment @ionChange="unitChanged($event.detail.value)" mode="ios" :value="value" class="rounded-full">
    <ion-segment-button value="lt" mode="ios" class="ion-activatable rounded-full">
      <ion-icon class="text-xl" :src="require('@/assets/img/icons/liters.svg')"/>
      <!--<ion-label>Lt</ion-label>-->
      <ion-ripple-effect/>
    </ion-segment-button>
    <ion-segment-button value="kg" mode="ios" class="ion-activatable rounded-full">
      <ion-icon class="text-xl" :src="require('@/assets/img/icons/kilos.svg')"/>
      <!--<ion-label>Kg</ion-label>-->
      <ion-ripple-effect/>
    </ion-segment-button>
  </ion-segment>
</template>
<script lang=ts>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Emit, Prop} from 'vue-property-decorator'

  @Component({
    name: "units-switch"
  })
  export default class UnitsSwitch extends Vue {

    @Emit('change')
    unitChanged(unit) {
      return unit
    }

    @Prop(String)
    value: string

  }
</script>
<style scoped>
  ion-segment {
    width: 68px;
    border: 2px solid var(--ion-color-light);
    background-color: var(--ion-color-light);
    overflow: hidden;
  }

  ion-segment-button {
    height: 30px;
    --background-checked: white;
    --color-checked: var(--ion-color-primary);
    font-weight: bold;
  }


</style>
