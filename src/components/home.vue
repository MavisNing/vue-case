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
          <el-submenu 
          :index="''+item1.order" 
          v-for="(item1,i) in menus" :key="i">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item 
            :index="item2.path" 
            v-for="(item2,i) in item1.children" :key="i">
              <i class="el-icon-menu"></i>
              {{item2.authName}}
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
    // if (!localStorage.getItem('token')) {
    //   this.$router.push({
    //     name: 'login'
    //   })
    //   this.$message.warning('请先登录')
    // }
  },
  data() {
    return {
      menus: []
    }
  },
  created() {
    this.getMenus();
  },
  methods: {
    // 获取表格数据
    async getMenus() {
      const res = await this.$http.get(`menus`);
      this.menus = res.data.data;
    },

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
