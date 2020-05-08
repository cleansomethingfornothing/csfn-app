<template>
    <img :src="require('@/assets/img/wave-0' + num + '.svg')">
</template>
<script lang=ts>
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {Prop} from 'vue-property-decorator'

    @Component({
        name: "wave"
    })
    export default class Wave extends Vue {
        @Prop(Number)
        num: number
    }
</script>
<style>
</style>
