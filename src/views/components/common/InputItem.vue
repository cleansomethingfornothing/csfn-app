<template>
  <div :class="errors && errors.length ? 'invalid-input': ''" class="text-item cursor-pointer">
    <div :class="rounded ? 'rounded-full' : ''" class="overflow-hidden ion-activatable ripple-parent"
         @click="clicked">
      <ion-item :color="outline ? 'light': '' " :lines="noLines ? 'none' : 'full'">
        <ion-icon v-if="icon || iconSrc" slot="start" :name="icon" :src="iconSrc" color="dark"></ion-icon>
        <ion-label v-if="label" class="font-bold" position="floating">{{ label }}</ion-label>
        <slot>
          <ion-input ref="input" :autocomplete="type === 'password' ? 'new-password' : 'off'"
                     :class="inputClass" :clear-input="clear" :placeholder="placeholder"
                     :readonly="readonly" :type="type === 'password' && showPassword ? 'text' : type"
                     :value="value"
                     @ionBlur="blur" @ionChange="change"
                     @ionFocus="focused" @ionInput="onInput"></ion-input>
        </slot>
        <div v-if="$scopedSlots['end']" slot="end">
          <slot name="end"/>
        </div>
        <ion-button v-if="type === 'password' && !$scopedSlots['end']" slot="end"
                    :class="{'mt-6 pt-1 mr-0': !rounded, '-mr-1': rounded}"
                    color="medium"
                    fill="clear" shape="round" @click="showPassword = !showPassword">
          <ion-icon v-if="!showPassword" slot="icon-only" class="mr-0" name="eye"/>
          <ion-icon v-else slot="icon-only" class="mr-0" name="eye-off"/>
        </ion-button>
        <ion-note v-if="endNote" slot="end" class="ml-0 mb-0 pb-0 pt-6 text-base">{{ endNote }}</ion-note>
      </ion-item>
      <ion-ripple-effect></ion-ripple-effect>
    </div>
    <div v-for="error in errors" :key="error" :class="!rounded ? 'mb-2' : ''">
      <input-error :error="error"></input-error>
    </div>
    <ion-note v-for="message in messages" :key="message" class="flex ml-5 mt-2 opacity-75 mb-1">
       <ion-icon name="information-circle" class="mr-1"></ion-icon>
        <span class=" font-bold text-xs">{{ $t(message) }}</span>
    </ion-note>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Emit, Prop, Ref } from 'vue-property-decorator'
import InputError from '@/views/components/common/InputError.vue'

@Component({
  name: 'input-item',
  components: { InputError }
})
export default class InputItem extends Vue {

  @Prop(String)
  public readonly value!: string

  @Prop(String)
  public readonly icon!: string

  @Prop(String)
  public readonly iconSrc: string

  @Prop(String)
  public readonly type!: string

  @Prop(String)
  public readonly placeholder!: string

  @Prop(String)
  public readonly label?: string

  @Prop(String)
  public readonly inputClass!: string

  @Prop(String)
  public readonly endNote!: string

  @Prop(Boolean)
  public readonly outline!: boolean

  @Prop(Boolean)
  public readonly clear!: boolean

  @Prop(Boolean)
  public readonly rounded!: boolean

  @Prop(Boolean)
  public readonly noLines!: boolean

  @Prop(Array)
  public readonly errors!: string[]

  @Prop(Array)
  public readonly messages?: string[]

  @Prop(HTMLElement)
  public readonly slottedInput!: any

  @Prop(Boolean)
  public readonly readonly: boolean

  @Ref('input')
  public input!: any

  showPassword = false

  @Emit('input')
  onInput(event) {
    return event.target.value
  }

  change(event) {
    if (event.target.value === '') {
      this.cleared()
    }
  }

  @Emit('cleared')
  cleared() {
    return
  }

  clicked() {
    this.input?.setFocus()
    this.slottedInput?.setFocus()
    this.focused()
  }

  @Emit('focus')
  focused() {
    return
  }

  @Emit('blur')
  blur() {
    return
  }

  focus() {
    this.input?.setFocus()
  }
}
</script>
<style>
.text-item {
  width: 100%;
}

.text-item ::slotted(ion-icon[slot="start"]) {
  margin-inline-end: 16px;
}

.text-item ion-item {
  --inner-border-width: 0;
}

.text-item .rounded-full ion-item {
  --border-radius: 999px;
}
</style>
