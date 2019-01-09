<template>
    <el-card class="card">
        <!-- 面包屑 -->
        <my-bread level1="权限管理" level2="权限列表"></my-bread>
        <!-- 添加按钮 -->
        <el-button type="primary" class="btn">添加按钮</el-button>
        <!-- 添加角色 -->
        <el-table :data="roles" height="400px" style="width: 100%">
            <el-table-column type="expand"  width="200">
                <template slot-scope="scope">
                    <el-row v-for="(item1,i) in scope.row.children" :key="i">
                        <el-col :span="4">
                            <el-tag 
                            class="tag1" 
                            closable 
                            type="success"
                            @close="deleteRights(scope.row,item1)"
                            >{{item1.authName}}</el-tag>
                            <i class="el-icon-arrow-right"></i>
                        </el-col>
                        <el-col :span="20">
                            <el-row v-for="(item2,i) in item1.children" :key="i">
                                <el-col :span="4">
                                    <el-tag 
                                    class="tag2" 
                                    @close="deleteRights(scope.row,item2)" 
                                    closable
                                    >{{item2.authName}}</el-tag>
                                    <i class="el-icon-arrow-right"></i>
                                </el-col>
                                <el-col :span="20">
                                    <el-tag 
                                    class="tag3" 
                                    @close="deleteRights(scope.row,item3)" 
                                    closable type="warning" 
                                    v-for="(item3,i) in item2.children" :key="i"
                                    >{{item3.authName}}</el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column type="index" label="#" width="200"></el-table-column>
            <el-table-column prop="roleName" label="角名名称" width="200"></el-table-column>
            <el-table-column prop="roleDesc" label="角色描述" width="200"></el-table-column>
            <el-table-column label="操作" width="260">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" plain circle></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" plain circle></el-button>
                    <el-button 
                    type="success" 
                    icon="el-icon-check" 
                    size="mini" 
                    plain 
                    circle
                    @click="shopDiaRight(scope.row)" 
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 修改权限 -->
        <el-dialog title="分配权限" :visible.sync="dialogVisibleRights" width="50%">
            <el-tree
            ref="tree"
            :data="dataTree"
            show-checkbox
            node-key="id"
            default-expand-all 
            :default-checked-keys="checkedArr" 
            :props="defaultProps"></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleRights = false">取消</el-button>
                <el-button type="primary" @click="setRights()">确定</el-button>
            </span>
        </el-dialog>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            roles: [],
            dataTree: [],
            dialogVisibleRights: false,
            defaultProps: {
                children: 'children',
                label: 'authName'
            },
            checkedArr: [],
            currRoleId: -1
        }
    },
    created() {
        this.getRoles();
    },
    methods: {
        async setRights() {
            // 获取树形结构全选节点
            const arr1 = this.$refs.tree.getCheckedKeys();
            // 获取属性结构半选节点
            const arr2 = this.$refs.tree.getHalfCheckedKeys();
            const arr = [...arr1, ...arr2];
            const res = await this.$http.post(`roles/${this.currRoleId}/rights`, {
                rids: arr.join(",")
            });
            this.getRoles();
            this.dialogVisibleRights = false;
        },
        // 修改权限对话框展示
        async shopDiaRight(rights) {
            this.dialogVisibleRights = true;
            this.currRoleId = rights.id;
            const res = await this.$http.get(`rights/tree`);
            this.dataTree = res.data.data;
            const tempArr = [];
            // 默认选中只需要添加最里层的id到数组中
            rights.children.forEach(item1 => {
                item1.children.forEach(item2 => {
                    item2.children.forEach(item3 => {
                        tempArr.push(item3.id)
                    })
                })
            });
            // console.log(tempArr);
            this.checkedArr = tempArr;
        },

        // 取消权限
        async deleteRights(scopeRow,itemX) {
            const res = await this.$http.delete(`roles/${scopeRow.id}/rights/${itemX.id}`);
            scopeRow.children = res.data.data;
        },

        // 获取表格数据
        async getRoles() {
            const res = await this.$http.get(`roles`);
            this.roles = res.data.data;
        }
    }
}
</script>

<style>
.card {
    height: 100%;
}
.btn {
    margin-top: 20px;
}
</style>
