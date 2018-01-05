import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

//webpack按需加载组件
const home = r =>
  require.ensure([], () => r(require('../page/home/home')), ' home');
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    }
  ]
});
