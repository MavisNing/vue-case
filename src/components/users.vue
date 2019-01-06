<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框+添加按钮 -->
    <el-input 
      @clear="getAllUsers()"
      clearable
      placeholder="请输入用户名" 
      v-model="query" 
      class="input-with-select">
      <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button type="primary" @click="showDiaAdd()">添加用户</el-button>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" height="300px">
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="160"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="140"></el-table-column>
      <el-table-column label="创建日期" width="160">
        <template slot-scope="scope">
          {{scope.row.creat_time | fmtDate}}
        </template>
      </el-table-column>
      <el-table-column label="用户状态" width="140">
        <template slot-scope="scope">
          <el-switch
            @change="changeUserState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button 
          type="primary" 
          icon="el-icon-edit" 
          size="mini" 
          plain 
          circle
          @click="showEditDia(scope.row)"
          ></el-button>
          <el-button 
          type="danger" 
          icon="el-icon-delete" 
          size="mini" 
          plain 
          circle 
          @click="showDeleConfim(scope.row)"
          ></el-button>
          <el-button 
          type="success" 
          icon="el-icon-check" 
          size="mini" 
          plain 
          circle 
          @click="showDiaRole(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <!-- 
      @size-change 每页显示条数改变
      @current-change 当前页码改变
      current-page 当前页码
      page-sizes 控制每页显示条数所在的数组[2,4,6,8]
      layout 分页组件的小功能
      total 数组总个数
     -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2,4,6,8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input disabled v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">{{currUserName}}</el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <!--
            1. v-model绑定数据
            2. v-model绑定的数据如果和option的value值一样 -> 默认选项option
            3. 点击不同的option时  v-model绑定的值就会变化->变成了点击的option的value
          -->
          <el-select v-model="currUserRoleId">
            <!-- 请选择 -->
            <el-option disabled label="请选择" :value="-1"></el-option>
            <!-- v-for遍历 -->
            <el-option v-for="(v,i) in roles" :key="i" :label="v.roleName" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="setRole()">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      query: "",
      pagenum: 1,
      pagesize: 2,
      total: -1,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      formLabelWidth: "100px",
      // 对话框显示隐藏
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false,
      // 下拉框绑定的数据
      currUserRoleId: -1,
      roles: [],
      currUserName: "",
      currUserId: -1
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    // 分配角色
    // 发送请求
    async setRole() {
        const res = await this.$http.put(`users/${this.currUserId}/role`, {
            rid: this.currUserRoleId
        });
        this.dialogFormVisibleRole = false;
    },
    // 显示对话框
    async showDiaRole(user) {
        this.currUserId = user.id;
        this.currUserName = user.username;
        // 获取所有角色 用来循环
        const res = await this.$http.get(`roles`);
        this.roles = res.data.data;
        // console.log(this.roles);
        // 获取当前点击的角色，用来显示在列表上
        const res2 = await this.$http.get(`users/${user.id}`);
        // console.log(res2);
        this.currUserRoleId = res2.data.data.rid;
        this.dialogFormVisibleRole = true;
    },

    // 修改用户状态
    async changeUserState(user) {
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
    //   console.log(res);
    },

    // 删除用户
    showDeleConfim(user) {
      // console.log(user);
      this.$confirm("此操作将永久删除该文件,是否继续?","提示",{
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(async () => {
        const res = await this.$http.delete(`users/${user.id}`);
        const {
          meta: {msg, status}
        } = res.data;
        if (status === 200) {
          this.$message.success(msg);
          this.pagenum = 1;
          this.getTableData();
        }
      })
      .catch(() => {
        this.$message.warning("取消删除");
      });
    },

    //编辑用户
    // 发送请求
    async editUser() {
      const res = await this.$http.put(`users/${this.form.id}`, {
        email: this.form.email,
        mobile: this.form.mobile
      });
      const {
        meta: {msg, status}
      } = res.data;
      if (status===200) {
        // 关闭对话框
        this.dialogFormVisibleEdit = false;
        // 刷新表格
        this.getTableData();
      } else {
        this.$message.warning(msg);
      }
    },
    // 显示对话框
    showEditDia(user) {
    //   console.log(user);
      this.form = user;
    //   console.log(this.form);
      this.dialogFormVisibleEdit = true;
    },

    //添加用户
    //发送请求
    async addUser() {
      const res = await this.$http.post(`users`, this.form);
      console.log(res);
      const {
        meta: {msg, status}
      } = res.data;
      if (status === 201) {
        this.$message.success(msg);
        this.dialogFormVisibleAdd = false;
        this.getTableData();
      } else {
        this.$message.warning(msg);
      }
    },
    //显示对话框
    showDiaAdd() {
      this.form = {}
      this.dialogFormVisibleAdd = true;
    },

    //点击清空
    getAllUsers() {
      this.getTableData();
    },

    //搜索
    searchUser() {
      this.pagenum = 1;
      this.getTableData();
    },

    //分页方法
    handleSizeChange(val) {
      // console.log(`每页${val}条`);
      this.pagesize = val;
      this.pagenum = 1;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      // console.log(`当前页:${val}`);
      this.getTableData();
    },

    //请求数据
    async getTableData() {
      // query	查询参数	可以为空
      // pagenum	当前页码	不能为空
      // pagesize	每页显示条数	不能为空
      // 发送请求
      // baseURL axios文档
      // 在发起请求(除了登录之外的)之前 需要设置请求头
      const AUTH_TOKEN = localStorage.getItem('token');
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;

      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      // console.log(res);
      const {
        data: {
          data: {total, users},
          meta: {status, msg}
        }
      } = res;
      if (status === 200) {
        // 1. 给表格数据赋值
        this.tableData = users;
        this.total = total;
        // console.log(this.tableData);
        //2. 提示
        this.$message.success(msg);
      }
    }
  }
}
</script>

<style>
.card {
    height: 100%;
}
.input-with-select {
    width: 350px;
    margin-top: 20px;
}
</style>

