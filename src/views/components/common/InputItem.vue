<template>
  <div class="text-item cursor-pointer" :class="errors && errors.length ? 'invalid-input': ''">
    <div class="overflow-hidden ion-activatable ripple-parent" :class="rounded ? 'rounded-full' : ''" @click="clicked">
      <ion-item :color="outline ? 'light': '' " :lines="noLines ? 'none' : 'full'">
        <ion-icon v-if="icon" :name="icon" slot="start" color="dark"></ion-icon>
        <ion-label position="floating" v-if="label" class="font-bold">{{label}}</ion-label>
        <slot>
          <ion-input @ionChange="change" @ionInput="onInput" @ionFocus="clicked" @ionBlur="blur" :value="value"
                     ref="input" :type="type === 'password' && showPassword ? 'text' : type" :placeholder="placeholder"
                     :clear-input="clear"
                     :autocomplete="type === 'password' ? 'new-password' : 'off'" :class="inputClass"></ion-input>
        </slot>
        <ion-button slot="end" fill="clear" v-if="type === 'password'" @click="showPassword = !showPassword"
                    color="medium" :class="{'mt-6 pt-1 mr-0': !rounded, '-mr-1': rounded}" shape="round">
          <ion-icon v-if="!showPassword" slot="icon-only" name="eye" class="mr-0"/>
          <ion-icon v-else slot="icon-only" name="eye-off" class="mr-0"/>
        </ion-button>
        <ion-note v-if="endNote" slot="end" class="ml-0 mb-0 pb-0 pt-6 text-base">{{endNote}}</ion-note>
      </ion-item>
      <ion-ripple-effect></ion-ripple-effect>
    </div>
    <div v-for="error in errors" :key="error" :class="!rounded ? 'mb-2' : ''">
      <input-error :error="error"></input-error>
    </div>
  </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {Emit, Prop, Ref} from 'vue-property-decorator'
    import InputError from '@/views/components/common/InputError.vue'

    @Component({
        name: 'input-item',
        components: {InputError}
    })
    export default class InputItem extends Vue {

        @Prop(String)
        public readonly value!: string

        @Prop(String)
        public readonly icon!: string

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

        @Prop(HTMLElement)
        public readonly slottedInput!: any

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

        @Emit('focus')
        clicked() {
            this.input?.setFocus()
            this.slottedInput?.setFocus()
            return
        }

        @Emit('blur')
        blur() {
            return
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
