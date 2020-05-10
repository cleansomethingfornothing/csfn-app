<template>
  <ion-segment @ionChange="unitChanged($event.detail.value)" mode="ios" value="kg">
    <ion-segment-button value="kg" mode="ios">
      <ion-label>Kg</ion-label>
    </ion-segment-button>
    <ion-segment-button value="lt" mode="ios">
      <ion-label>Lt</ion-label>
    </ion-segment-button>
  </ion-segment>
</template>
<script lang=ts>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Emit} from 'vue-property-decorator'

  @Component({
    name: "units-switch"
  })
  export default class UnitsSwitch extends Vue {

    @Emit('change')
    unitChanged(unit) {
      return unit
    }
  }
</script>
<style scoped>
  ion-segment {
    width: 75px;
    border-radius: 5px;
    border: 2px solid var(--ion-color-light);
    background-color: var(--ion-color-light);
    overflow: hidden;
  }

  ion-segment-button {
    --background-checked: white;
    --color-checked: var(--ion-color-primary);
    font-weight: bold;
    border-radius: 5px;
  }
</style>
