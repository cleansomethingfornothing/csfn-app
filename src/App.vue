<template>
    <ion-app>
        <transition mode="in-out" name="fade">
            <router-view></router-view>
        </transition>
    </ion-app>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import CurrentUserPage from '@/views/pages/home/user/CurrentUserPage.vue'
import EventsPage from '@/views/pages/home/events/EventsPage.vue'
import AlertsPage from '@/views/pages/home/alerts/AlertsPage.vue'
import CommunityPage from '@/views/pages/home/community/CommunityPage.vue'

@Component({
    components: {CurrentUserPage, EventsPage, AlertsPage, CommunityPage}
})
export default class Main extends Vue {

}
</script>
<style lang="scss">
@import 'assets/style/main.scss';
</style>
