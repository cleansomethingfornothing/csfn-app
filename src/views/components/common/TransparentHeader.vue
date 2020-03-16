<template>
    <div :class="{'always-transparent': alwaysTransparent, 'no-gradient': noGradient, 'no-content': noContent}"
         class="transparent-header">
        <ion-header mode="ios">
            <ion-toolbar ref="toolbar" mode="ios">
                <ion-buttons v-if="!noBack" slot="start">
                    <ion-button fill="clear" shape="round" @click="$router.back()">
                        <ion-icon name="arrow-back"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title v-if="title" class="lg:text-lg xl:text-xl">{{ title }}</ion-title>
                <ion-buttons slot="end">
                    <slot name="end-buttons"></slot>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
    </div>
</template>
<script lang=ts>
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop, Ref} from 'vue-property-decorator'

@Component({
    name: 'TransparentHeader'
})
export default class TransparentHeader extends Vue {
    @Ref('toolbar')
    toolbar: any

    @Prop(String)
    title: string

    @Prop(Boolean)
    alwaysTransparent: boolean

    @Prop(Boolean)
    noGradient: boolean

    @Prop(Boolean)
    noBack: boolean

    @Prop(Boolean)
    noContent: boolean
}
</script>
<style>
.transparent-header ion-toolbar {
    --background: linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3) 80%, transparent 100%);
    --box-shadow: none !important;
    --border-width: 0 !important;
}

.transparent-header.no-gradient ion-toolbar {
    --background: transparent;
    --color: var(--ion-color-white);
}

.transparent-header.always-transparent ion-toolbar {
    --background: transparent !important;
    --color: #FFFFFF !important;
}

.transparent-header.no-content ion-toolbar {
    height: 30px !important;
}

.scrolled .transparent-header ion-toolbar {
    --background: #fff;
    --color: var(--ion-text-color-ligth);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --border-width: 0 0 0.55px 0 !important;
}

.transparent-header ion-button {
    color: #fff !important;
    transition: color 0.3s;
}

.scrolled .transparent-header ion-button {
    color: var(--ion-color-dark) !important;
}

</style>
