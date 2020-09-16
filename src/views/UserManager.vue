<template>
   <div>
      <nav-header></nav-header>
      <div class="content">
         <el-table :data="userList" stripe style="width: 100%">
            <el-table-column prop="username" label="用户名" width="180"></el-table-column>
            <el-table-column prop="telephone" label="手机"></el-table-column>
            <el-table-column prop="email" label="E-mail"></el-table-column>
            <el-table-column prop="province" label="省份"></el-table-column>
            <el-table-column prop="city" label="城市"></el-table-column>
            <el-table-column prop="balance" label="余额"></el-table-column>
            <el-table-column label="操作">
               <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">详细</el-button>
                  <el-button type="text" size="small">通过</el-button>
               </template>
            </el-table-column>

         </el-table>
      </div>

   </div>
</template>

<script>
  import NavHeader from '../components/NavHeader.vue'
  export default {
    data () {
      return {
        msg: '用户管理',
        userList:null,
      }
    },
    components:{
      NavHeader
    },
    created:function(){
      this.$axios.get('/user/list').then(res => {
        let data = res.data;
        if(data && data.status === 'success'){
          this.userList = data.result;
        }
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
