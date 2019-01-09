import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import Users from '@/components/users.vue'
import Rights from '@/components/rights.vue'
import Roles from '@/components/roles.vue'

import {Message} from 'element-ui';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'users',
          path: "/users",
          component: Users
        },
        {
          name: 'rights',
          path: '/rights',
          component: Rights
        },
        {
          name: 'roles',
          path: '/roles',
          component: Roles
        }
      ]
    }
  ]
})

// 拦截路由配置
router.beforeEach((to, from, next) => {
  // 如果是去登录页面则继续执行
  if (to.name === 'login') {
    next();
  } else {
  // 如果失去home页,则判断是否有token,若有则继续执行,若没有则先登录
    const token = localStorage.getItem('token');
    if (!token) {
      Message.warning('请先登录');
      router.push({
        name: 'login'
      });
    } else {
      next();
    }
  }
});

export default router;
