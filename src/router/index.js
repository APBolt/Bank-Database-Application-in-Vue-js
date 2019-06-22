import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/components/HelloWorld'
import BankDetail from '@/components/BankDetail'
import FavoriteBank from '@/components/FavoriteBanks'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeComponent',
      component: HomeComponent
    },

    {
      path: '/detail/:ifscCode',
      name: 'detail',
      component: BankDetail,
      props: true
    },

    {
      path: '/favorite',
      name: 'favorite_banks',
      component: FavoriteBank
    },
  ]
})
