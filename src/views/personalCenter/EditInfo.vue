<template>
   <div>
      <div class="title">
         修改基本信息
      </div>
      <el-form :model="form" :label-position="'right;'" label-width="80px">
         <el-form-item label="手机号:">
            {{telephone}}
         </el-form-item>
         <el-form-item label="昵称:">
            <el-input v-model="form.nickname"></el-input>
         </el-form-item>
         <el-form-item label="地区:">
            <el-input v-model="form.province"></el-input>
         </el-form-item>
         <el-form-item label="电子邮箱:">
            <el-input v-model="form.email"></el-input>
         </el-form-item>
         <el-form-item >
            <el-button @click="onSubmit">提交</el-button>
         </el-form-item>

      </el-form>
   </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
         form:{
           nickname:'',
           province:'',
           email:''
         }
      }
    },
    created(){
      this.getUserInfo();
    },
    computed: {
      ...mapGetters(['isLogin', 'nickname', 'level', 'telephone', 'id'])
    },
    methods:{
      onSubmit(){
        this.$axios.put('/user/userInfo',this.form).then((res)=>{
          if(res.data && res.data.status === 'success'){
            this.$message({message:'修改成功',type:'success',showClose:true});
            this.getUserInfo();
          }else{
            this.$message({message:'修改失败',type:'error',showClose:true});
          }
        }).catch( err => this.error() );
      },
      getUserInfo(){
         this.$axios.get('/user/userInfo').then((res)=>{
           if(res.data && res.data.status === 'success'){
             //this.$message({msg:'修改成功',type:'success',showClose:true});
             this.form = res.data.result;
           }else{
             this.$message({message:'获取用户信息失败',type:'error',showClose:true});
           }
         }).catch( err => this.error() );
      },
      error(err){
        this.$message({message:'请求失败', type:'error', showClose:true});
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .title{
      width: 100%;
      text-align: left;
      font-size: 20px;
      color: #3e3c3c;
      border-bottom:1px solid #b9b9b9;
      margin-bottom:15px;
   }
   .el-form-item__label{
      font-weight:bold;
   }
</style>
