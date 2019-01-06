<template>
  <el-container class="container">
    <el-header class="header">
      <el-col :span="4">
        <img src="@/assets/logo.png" alt>
      </el-col>
      <el-col :span="16">
        <h2 class="middle">电商后台管理系统</h2>
      </el-col>
      <el-col :span="1">
        <a href class="loginout" @click.prevent="loginOut()">退出</a>
      </el-col>
    </el-header>

    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu default-active="2" unique-opened router>
          <!-- 1 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-menu"></i>
              用户列表
            </el-menu-item>
          </el-submenu>
          <!-- 2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              角色列表
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>
              权限列表
            </el-menu-item>
          </el-submenu>
          <!-- 3 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="goods">
              <i class="el-icon-menu"></i>
              商品列表
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              分类参数
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-menu"></i>
              商品分类
            </el-menu-item>
          </el-submenu>
          <!-- 4 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              订单列表
            </el-menu-item>
          </el-submenu>
          <!-- 5 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>
              数据报表
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  beforeCreate () {
    if (!localStorage.getItem('token')) {
      this.$router.push({
        name: 'login'
      })
      this.$message.warning('请先登录')
    }
  },
  methods: {
    // 退出功能
    loginOut () {
      localStorage.clear()
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style>
.container {
  height: 100%;
}
.header {
  background: #b3c0d1;
}
.header .middle {
  text-align: center;
  line-height: 60px;
  color: #eee;
}
.header .loginout {
  line-height: 60px;
  text-decoration: none;
}
.aside {
  /* background: red; */
}
.main {
  background: rgb(233, 233, 230);
}
</style>
