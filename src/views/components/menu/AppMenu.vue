<template>
  <ion-menu content-id="main" type="overlay" ref="menu" :swipe-gesture="false" :disabled="disabled">
    <menu-profile :user="user"></menu-profile>
    <menu-items @logout="logout"></menu-items>
  </ion-menu>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Action } from 'vuex-class'
import MenuItems from '@/views/components/menu/MenuItems.vue'
import MenuProfile from '@/views/components/menu/MenuProfile.vue'
import { Emit, Prop, Ref } from 'vue-property-decorator'
import User from '@/types/User'

@Component({
  name: 'app-menu',
  components: { MenuItems, MenuProfile }
})
export default class AppMenu extends Vue {

  @Prop(Boolean)
  disabled: boolean

  @Prop(Object)
  user: User

  @Action('doLogout')
  doLogout!: Function

  @Ref('menu')
  public menu!: any

  @Emit('logout')
  logout() {
    this.menu.close()
    return undefined
  }
}
</script>
