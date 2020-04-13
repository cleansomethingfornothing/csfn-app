<template>
  <div class="avatar-wrapper">
    <div class="avatar shadow ion-activatable" :class="invalid ? 'avatar-error': ''">
      <img :src="src" alt="Add profile picture">
      <ion-ripple-effect></ion-ripple-effect>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: 'avatar'
  })
  export default class Avatar extends Vue {
    @Prop(String)
    public src: string

    @Prop(Boolean)
    public invalid: boolean
  }
</script>
<style>
  .avatar-wrapper {
    padding: 2px;
    width: 100%;
  }

  .avatar {
    position: relative;
    width: 100%;
    border: 5px solid white;
    background-color: #eee;
    border-radius: 50%;
    overflow: hidden;
  }

  .avatar > img {
    position: absolute;
    width: 100%;
    object-position: center;
    object-fit: cover;
  }

  .avatar:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  .avatar.avatar-error {
    box-shadow: 0px 0px 0px 1px var(--ion-color-danger);
  }
</style>
