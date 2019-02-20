import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/',
    },{
      path: '/',
      name: 'home',
      component: require('@/components/HomePage').default,
    },
    {
      path: '/footprint',
      name: '/footprint',
      component: require('@/components/FootprintPage').default,
    },
    {
      path: '/favorites',
      name: '/favorites',
      component: require('@/components/Favorites').default,
    },
    {
      path: '/DBSplit',
      name: '/DBSplit',
      component: require('@/components/DBSplitPage').default,
    },
  ],
});
