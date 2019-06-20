<template>
  <div class="frameWork" :style="{height:'parentHeight'}">
    <el-form ref="form" :model="search" label-width="80px">

    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :header-cell-style="{background:'#333',color:'#ccc'}"
      :height="parentHeight - 60 + 'px'"
      >
      <template v-for="(column,index) in roleList">
        <el-table-column
          align="center"
          :prop="column.prop"
          :label="column.label"
          v-if="column.prop != 'btn'&& column.prop != 'permissions'"
        >
        </el-table-column>
        <el-table-column v-else-if="column.prop == 'permissions'"
                         :prop="column.prop"
                         :label="column.label"
                         align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.permissions == '超级管理员'">{{scope.row.permissions}}</el-tag>
            <el-tag type="warning" v-else-if="scope.row.permissions == '管理员'">{{scope.row.permissions}}</el-tag>
            <el-tag type="danger" v-else>{{scope.row.permissions}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-else
                         :prop="column.prop"
                         :label="column.label"
                         align="center">
          <template slot-scope="scope">
            <el-button v-for="(item,num) in column.options"
                       :key="num"
                       :type="item.type"
            @click="item.func(scope.$index,scope.row)">
              {{item.title}}
            </el-button>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!--查看弹框-->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名:" :label-width="formLabelWidth">
          <el-input v-model="form.role" autocomplete="off" style="width: 240px;" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色权限:" :label-width="formLabelWidth">
          <el-select v-model="form.permissions" placeholder="请选择权限" style="width: 240px;">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitTag">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
    export default {
        name: "",
        props:['parentHeight'],
        data(){
          return {
            tableData: [],
            //表头设置
            roleList:[
              {
                prop:'role',
                label:'用户名',
              },
              {
                prop:'permissions',
                label:'权限',
              },
              {
                prop:'btn',
                label:'按钮',
                options:[
                  {
                    title: '编辑',
                    type: 'danger',
                    func: this.editTag
                  },
                  {
                  title: '删除',
                  type: 'danger',
                  func: this.delTag
                }]
              }
            ],
            currentPage:0,
            total:0,
            dialogFormVisible: false,
            formLabelWidth:'120px',
            form:{
              role:"",
              permissions:""
            },
            changeNum:"",
            search:{}
          }
        },
      created(){
        this.getUserInfo();
      },
        methods:{
          getUserInfo(){
            //清除list数据
            this.tableData = [];
          this.getRequest('/api/getLoginUserAll').then(res=>{
            let result = res.data;
            for (var i=0;i<result.length;i++) {
              let list = result[i];
              this.tableData.push(list);
            }
            this.currentPage = res.currentPage;
            this.total = res.total;
          }).catch(err=>{
            console.log(err);
          })
        },
          delTag(index,row){
            let that = this;
            //设置需要修改的id
            this.$store.commit('setUserId',row._id);
            //触发删除对应id的api
            this.$store.dispatch('delUserInfo').then(res=>{
              this.getUserInfo();
            })
          },
          editTag(index,row){
            //数组对应的下表
            this.changeNum = index;
            //设置需要修改的id
            this.$store.commit('setUserId',row._id);
            //触发弹框
            this.dialogFormVisible = true;
            this.form = row;
          },
          submitTag(){
            let that = this;
            that.dialogFormVisible = false;
            this.$store.dispatch('editUserInfo',that.form).then(res=>{
              that.tableData[that.changeNum] = that.form;
            });

          },
          handleCurrentChange(val) {
            let param = {
              currentPage:val
            };
            //清除数据
            this.tableData = [];
            this.postRequest('/api/getLoginUser/page',param).then(res=>{
              let result = res.data;
              for (var i=0;i<result.length;i++) {
                let list = result[i];
                this.tableData.push(list);
              }
              this.currentPage = res.currentPage;
              this.total = res.total;
            });
          }
        }
    }
</script>

<style scoped lang="less">
.pagination{
  padding:14px;
  text-align: right;
}
</style>
