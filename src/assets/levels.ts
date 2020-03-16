import {UserLevel} from '@/types/UserLevel'

export default [
    {
        index: 0,
        icon: require('@/assets/img/levels/wildlife/goat.svg'),
        background: require('@/assets/img/levels/wildlife/goat_bg.jpg'),
        name: 'goat',
        threshold: {
            cleanups: 4,
            liters: 100,
            kilos: 10
        }
    },
    {
        index: 1,
        icon: require('@/assets/img/levels/wildlife/sloth.svg'),
        background: require('@/assets/img/levels/wildlife/sloth_bg.jpg'),
        name: 'sloth',
        threshold: {
            cleanups: 8,
            liters: 200,
            kilos: 20
        }
    },
    {
        index: 2,
        icon: require('@/assets/img/levels/wildlife/racoon.svg'),
        background: require('@/assets/img/levels/wildlife/racoon_bg.jpg'),
        name: 'racoon',
        threshold: {
            cleanups: 14,
            liters: 400,
            kilos: 40
        }
    }, {
        index: 3,
        icon: require('@/assets/img/levels/wildlife/meerkat.svg'),
        background: require('@/assets/img/levels/wildlife/meerkat_bg.jpg'),
        name: 'meerkat',
        threshold: {
            cleanups: 20,
            liters: 700,
            kilos: 70
        }
    }, {
        index: 4,
        icon: require('@/assets/img/levels/wildlife/beaver.svg'),
        background: require('@/assets/img/levels/wildlife/beaver_bg.jpg'),
        name: 'beaver',
        threshold: {
            cleanups: 28,
            liters: 1000,
            kilos: 100
        }
    }
] as UserLevel[]
