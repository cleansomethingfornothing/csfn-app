<template>
  <div>
    <ion-item v-for="(element, i) of elements" :key="i" button detail="false"
              @click="selected(element)" lines="none">
      <ion-icon :name="icon" color="primary" v-if="icon" slot="start"></ion-icon>
      <ion-label>{{elementValue(element)}}</ion-label>
    </ion-item>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Emit, Prop} from 'vue-property-decorator'

  @Component({
    name: 'selection-list'
  })
  export default class List extends Vue {
    @Prop(Array)
    elements: any[]

    @Prop(Function)
    elementValue: Function

    @Prop(String)
    icon: string

    @Emit('selected')
    selected(element) {
      return element
    }
  }
</script>
