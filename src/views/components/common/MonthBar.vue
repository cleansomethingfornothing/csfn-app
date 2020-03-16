<template>
    <div class="month-bar-container">
        <div class="month-bar">
            <div class="face top"></div>
            <div class="face front"></div>
            <div class="face side"></div>
        </div>
    </div>
</template>
<script lang=ts>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    name: "month-bar"
})
export default class MonthBar extends Vue {
}
</script>
<style scoped>

.month-bar-container {
    height: 100%;
    perspective: 400px;
}

.month-bar {
    --side: 2em;
    perspective: 400px;
    perspective-origin: 50px -100px;
    position: relative;
    transform: translateZ(-80px) translateY(10px) translateX(-5px);
    width: 100%;
}

.month-bar, .front, .side {
    height: 100%;
}

.face {
    display: block;
    position: absolute;
}

.top {
    background-color: var(--ion-color-primary-tint);
    height: var(--side);
    transform: rotateX(90deg) rotateZ(45deg) translateZ(calc(var(--side) / 2));
    width: var(--side);
}

.front {
    background: linear-gradient(135deg, var(--ion-color-primary), var(--ion-color-tertiary));
    transform: rotateY(-45deg) translateZ(calc(var(--side) / 2));
    width: var(--side);
}

.side {
    background: linear-gradient(135deg, var(--ion-color-primary), var(--ion-color-tertiary));
    transform: rotateY(45deg) translateZ(calc(var(--side) / 2));
    width: var(--side);
}
</style>
