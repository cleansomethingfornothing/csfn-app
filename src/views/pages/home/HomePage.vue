<template>
    <ion-page class="ion-page home-page">


        <ion-fab class="ios:mb-11 mb-13" horizontal="end" mode="ios" vertical="bottom">
            <ion-fab-button color="white" @click="$router.push('/edit-cleanup')">
                <ion-icon color="primary" name="add-outline" size="large"
                          style="stroke: var(--ion-color-primary); stroke-width: 50px"/>
            </ion-fab-button>
            <!--
          <ion-fab-list side="top">
            <ion-fab-button color="white" :data-desc="$t('event')" @click="$router.push('/publish?type=event')">
              <ion-icon name="flag" color="secondary"/>
            </ion-fab-button>
            <ion-fab-button color="white" :data-desc="$t('alert')" @click="$router.push('/publish?type=alert')">
              <ion-icon name="alert" color="secondary"/>
            </ion-fab-button>
            <ion-fab-button color="white" :data-desc="$t('cleanup')" @click="$router.push('/publish?type=cleanup')">
                <ion-icon name="trash" color="secondary"/>
            </ion-fab-button>
            </ion-fab-list>
            -->
        </ion-fab>

        <ion-slides ref="slider" :options="{initialSlide: 3, resistanceRatio: 1, cssMode: true, centeredSlides: true}"
                    class="w-full h-full"
                    @ionSlideWillChange="slided">
            <ion-slide>
                <current-user-page v-if="loaded || $route.params.tab === 'user'" ref="user"/>
            </ion-slide>
            <ion-slide>
                <community-page v-if="loaded || $route.params.tab === 'community'" ref="community"/>
            </ion-slide>
            <ion-slide>
                <alerts-page v-if="loaded || $route.params.tab === 'alerts'" ref="alerts"/>
            </ion-slide>
            <ion-slide>
                <events-page v-if="loaded || $route.params.tab === 'events'" ref="events"/>
            </ion-slide>
        </ion-slides>

        <ion-tab-bar>
            <ion-tab-button v-for="tab in tabs" :key="tab"
                            :selected="selectedTab === tab" @click="slideTo(tab)">
                <transition name="fade">
                    <ion-icon v-if="selectedTab === tab" :src="require('@/assets/img/tabs/' + tab + '.svg')"
                              size="large"></ion-icon>
                    <ion-icon v-else :src="require('@/assets/img/tabs/' + tab + '_off.svg')" size="large"></ion-icon>
                </transition>
            </ion-tab-button>
        </ion-tab-bar>
    </ion-page>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import HomeHeader from '@/views/components/home/HomeHeader.vue'
import CleanupCard from '@/views/components/home/CleanupCard.vue'
import PlaceholderCard from '@/views/components/home/PlaceholderCard.vue'
import HomeCleanupsList from '@/views/components/home/CleanupsList.vue'
import CurrentUserPage from '@/views/pages/home/user/CurrentUserPage.vue'
import CommunityPage from '@/views/pages/home/community/CommunityPage.vue'
import AlertsPage from '@/views/pages/home/alerts/AlertsPage.vue'
import EventsPage from '@/views/pages/home/events/EventsPage.vue'
import {Ref, Watch} from 'vue-property-decorator'
import {nativeProvider} from '@/providers/native/native.provider'
import {cleanupsModule} from '@/store/cleanupsModule'

@Component({
    name: 'HomePage',
    components: {
        EventsPage,
        AlertsPage,
        CommunityPage,
        CurrentUserPage,
        HomeCleanupsList,
        PlaceholderCard: PlaceholderCard,
        CleanupCard: CleanupCard,
        HomeHeader
    }
})
export default class HomePage extends Vue {

    loaded = false

    tabs = ['user', 'community', 'alerts', 'events']

    selectedTab = ''

    @Ref('slider')
    slider: HTMLIonSlidesElement

    mounted() {
        nativeProvider.hideSplashScreen()
        cleanupsModule.setCleanup(null)
        this.changedRoute(this.$route)
        this.slider.slideTo(this.tabs.indexOf(this.$route.params.tab), 0)
        setTimeout(() => {
            this.loaded = true
        }, 2000)
    }

    activated() {
        this.mounted()
    }

    @Watch('$route')
    changedRoute(route) {
        if (route.name === 'HomePage') {
            try {
                this.selectedTab && (this.$refs[this.selectedTab] as any).exit()
            } catch (ignore) {
                //
            }
            this.selectedTab = route.params.tab

            try {
                (this.$refs[route.params.tab] as any).init()
            } catch (ignore) {
                //
            }
        }
    }

    slideTo(tab) {
        this.slider.slideTo(this.tabs.indexOf(tab))
    }

    slided() {
        this.slider.isBeginning().then((beg) => this.slider.lockSwipeToPrev(beg))
        this.slider.isEnd().then((end) => this.slider.lockSwipeToNext(end))
        this.slider.getActiveIndex()
            .then(index => {
                if (this.tabs[index] !== this.selectedTab) {
                    this.$router.replace('/home/' + this.tabs[index])
                }
            })
    }
}
</script>
<style>
.home-tabs {
    --padding: 0;
    --pading-top: 0;
}

.tab-button {
    height: 150%;
}

ion-fab-button[data-desc] {
    position: relative;
}

ion-fab-button[data-desc]::before {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    color: var(--ion-text-color);
    content: attr(data-desc);
    /*background-color: var(--ion-color-dark);*/
    opacity: 0.9;
    padding: 4px 8px;
    position: absolute;
    right: 50px;
    /*color: white;*/
    top: 6px;
    z-index: 1;
}

ion-fab-button[data-desc]::after {
    border-color: transparent transparent transparent #fff;
    border-style: solid;
    border-width: 5px;
    content: " ";
    left: -25%;
    position: absolute;
    top: 40%;
    z-index: 1;
    /*border-color: transparent transparent transparent var(--ion-color-dark);*/
}

ion-tab-button {
    border-top: 1px solid #ccc;
    transition: border 0.25s;
}

.tab-selected {
    border-top: 3px solid var(--ion-color-primary);
}

.tab-selected ion-icon {
    margin-top: -2px;
    transition: all 0.25s;
}
</style>
