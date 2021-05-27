<template>
  <div class="flex flex-col items-center justify-center w-32 h-32">
    <div :id="`progress-${label}`" class="w-24 h-24 absolute"></div>
    <ion-icon :src="iconSrc" class="text-sm"/>
    <div class="text-3xl -mt-1">
      <span>{{ integer }}</span>
      <span class="text-xs" v-if="decimal">{{ decimal }}</span>
    </div>
    <span class="text-xs economica -mt-2">{{ label }}</span>
  </div>
</template>
<script lang=ts>
import Vue from 'vue'
import Component from 'vue-class-component'
import ProgressBar from 'progressbar.js'
import Shape from 'progressbar.js/shape'
import { Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'user-counter'
})
export default class UserCounter extends Vue {

  @Prop(String)
  iconSrc: string

  @Prop(String)
  label: string

  @Prop({ type: String })
  value: string

  @Prop(Number)
  max: number

  get localizedSeparator() {
    return (1.1).toLocaleString()[1]
  }

  get integer() {
    return this.value.split('.')[0]
  }

  get decimal() {
    return this.value.includes('.') ? this.localizedSeparator + this.value.split('.')[1] : ''
  }

  progressBar: Shape = null

  mounted() {
    this.progressBar = new ProgressBar.Circle('#progress-' + this.label, {
      strokeWidth: 4,
      easing: 'easeInOut',
      duration: 1000,
      trailColor: '#eee',
      from: { color: '#9ed362' },
      to: { color: '#148f31' },
      step: function (state,
                      circle,
                      attachment) {
        circle.path.setAttribute('stroke', state.color)
      },
    })
    this.progressBar.animate(Math.min(Number(this.value) / this.max, 1))
  }

  @Watch('value')
  valueChanged(value) {
    this.progressBar.animate(Math.min(value / this.max, 1))
  }

}
</script>
<style scoped>

</style>