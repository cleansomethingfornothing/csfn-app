import { UserLevel } from '@/types/UserLevel'

export default [
  {
    index: 0,
    icon: require('@/assets/img/levels/wildlife/explorer.svg'),
    background: require('@/assets/img/levels/wildlife/explorer_bg.jpg'),
    backgroundClass: 'object-bottom',
    name: 'explorer',
    threshold: {
      cleanups: 1,
      liters: 0,
      kilos: 0
    }
  },
  {
    index: 1,
    icon: require('@/assets/img/levels/wildlife/goat.svg'),
    background: require('@/assets/img/levels/wildlife/goat_bg.jpg'),
    backgroundClass: 'object-center',
    name: 'goat',
    threshold: {
      cleanups: 4,
      liters: 100,
      kilos: 10
    }
  },
  {
    index: 2,
    icon: require('@/assets/img/levels/wildlife/sloth.svg'),
    background: require('@/assets/img/levels/wildlife/sloth_bg.jpg'),
    backgroundClass: 'object-center',
    name: 'sloth',
    threshold: {
      cleanups: 8,
      liters: 200,
      kilos: 20
    }
  },
  {
    index: 3,
    icon: require('@/assets/img/levels/wildlife/racoon.svg'),
    background: require('@/assets/img/levels/wildlife/racoon_bg.jpg'),
    backgroundClass: 'object-center',
    name: 'racoon',
    threshold: {
      cleanups: 14,
      liters: 400,
      kilos: 40
    }
  }, {
    index: 4,
    icon: require('@/assets/img/levels/wildlife/meerkat.svg'),
    background: require('@/assets/img/levels/wildlife/meerkat_bg.jpg'),
    backgroundClass: 'object-bottom',
    name: 'meerkat',
    threshold: {
      cleanups: 20,
      liters: 700,
      kilos: 70
    }
  }, {
    index: 5,
    icon: require('@/assets/img/levels/wildlife/beaver.svg'),
    background: require('@/assets/img/levels/wildlife/beaver_bg.jpg'),
    backgroundClass: 'object-center',
    name: 'beaver',
    threshold: {
      cleanups: 28,
      liters: 1000,
      kilos: 100
    }
  }
] as UserLevel[]
