<template>
  <div class="w-full progress-container h-6 rounded-full overflow-hidden">
    <div class="progress-bar h-full rounded-full" :style="`--value: ${value}%`"></div>
  </div>
</template>
<script lang=ts>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: "progress-bar"
  })
  export default class ProgressBar extends Vue {
    @Prop(Number)
    value: number
  }
</script>
<style scoped>
  @keyframes grow {
    from {
      width: 0;
    }
    to {
      width: var(--value);
    }
  }

  .progress-container {
    background-color: var(--ion-color-light-tint);
    border: 3px solid var(--ion-color-light);
  }

  .progress-bar {
    animation: grow 1s forwards;
    background: linear-gradient(90deg, var(--ion-color-secondary), var(--ion-color-primary));
    width: 0;
  }
</style>
