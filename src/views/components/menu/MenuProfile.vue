<template>
  <div class="menu-profile ion-activatable ripple-parent" v-if="user">
    <!--<avatar :src="user.picture"></avatar>-->
    <img class="w-1/4" src="@/assets/img/icon.png">
    <span class="menu-profile__user-name">{{ user.username }}</span>
    <ion-ripple-effect></ion-ripple-effect>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Avatar from '@/views/components/common/Avatar.vue'
import User from '@/types/User'
import { Prop } from 'vue-property-decorator'

@Component({
  name: 'menu-profile',
  components: { Avatar }
})
export default class MenuProfile extends Vue {

  @Prop(Object)
  user: User
}
</script>
<style>
.menu-profile {
  background: url("../../../assets/img/profile-bg-small.png") center center;
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.menu-profile > div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-profile__user-name {
  z-index: 10;
  margin-top: 0.5em;
  color: #fff;
  font-size: 1.25em;
  font-weight: bold;
}
</style>
