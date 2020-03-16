<template>
    <ion-segment :value="value" class="rounded-full" mode="ios" @ionChange="unitChanged($event.detail.value)">
        <ion-segment-button :value="leftValue" class="ion-activatable rounded-full" mode="ios">
            <slot name="left"/>
            <ion-ripple-effect/>
        </ion-segment-button>
        <ion-segment-button :value="rightValue" class="ion-activatable rounded-full" mode="ios">
            <slot name="right"/>
            <ion-ripple-effect/>
        </ion-segment-button>
    </ion-segment>
</template>
<script lang=ts>
import Vue from 'vue'
import Component from 'vue-class-component'
import {Emit, Prop} from 'vue-property-decorator'

@Component({
    name: "toggle-switch"
})
export default class ToggleSwitch extends Vue {

    @Prop(String)
    leftValue: string

    @Prop(String)
    rightValue: string

    @Prop(String)
    value: string

    @Emit('change')
    unitChanged(unit) {
        return unit
    }

}
</script>
<style scoped>
ion-segment {
    background-color: var(--ion-color-light);
    border: 2px solid var(--ion-color-light);
    overflow: hidden;
    width: 68px;
}

ion-segment-button {
    --background-checked: white;
    --color-checked: var(--ion-color-primary);
    font-weight: bold;
    height: 30px;
    width: 30px;
}


</style>
