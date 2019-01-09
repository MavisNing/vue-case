<template>
    <el-card class="card">
        <!-- 面包屑 -->
        <my-bread level1="权限管理" level2="权限列表"></my-bread>

        <!-- 表格 -->
        <!-- height 固定高-> 滚动条 -->
        <el-table height="480px" class="table" :data="rights" border>
            <el-table-column type="index" label="#" width="80"></el-table-column>
            <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
            <el-table-column prop="path" label="路径"></el-table-column>
            <el-table-column label="层级">
                <template slot-scope="scope">
                    <span v-if="scope.row.level==='0'">一级</span>
                    <span v-if="scope.row.level==='1'">二级</span>
                    <span v-if="scope.row.level==='2'">三级</span>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
 data() {
    return {
      rights: []
    };
  },
  created() {
    this.getRights();
  },
  methods: {
    async getRights() {
        const res = await this.$http.get(`rights/list`);
        const {
            meta: { msg, status },
            data
        } = res.data;
        if (status === 200) {
            this.rights = data;
        } else {
            this.$message.warning(msg);
        }
    } 
  }
}
</script>

<style>
.card{
    height: 100%;
}
.table {
    margin-top: 20px;
}
</style>
