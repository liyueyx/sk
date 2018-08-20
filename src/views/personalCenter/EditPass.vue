<template>
   <div>
      <div class="title">
         修改密码
      </div>
      <el-form :model="passInfo" :rules="rules" ref="passInfo" :label-position="'right;'" label-width="100px">
         <el-form-item label="手机号:">{{telephone}}</el-form-item>
         <el-form-item label="当前密码" prop="oldPass">
            <el-input type="password" v-model="passInfo.oldPass"></el-input>
         </el-form-item>
         <el-form-item label="新密码:" prop="newPass">
            <el-input type="password" v-model="passInfo.newPass"></el-input>
         </el-form-item>
         <el-form-item label="确认新密码:" prop="confirmPass">
            <el-input type="password" v-model="passInfo.confirmPass"></el-input>
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
      let validateConfirmPass = (rule,value,cb)=>{
        console.log('into validateConfirmPass!');
        if (value !== this.passInfo.newPass) {
          cb(new Error('两次输入密码不一致!'));
        }
        cb();
      }
      return {
        passInfo: {
          oldPass: '',
          newPass: '',
          confirmPass: ''
        },
        rules: {
          oldPass: [{required: true, message: '请输入密码!', trigger: 'blur'},],
          newPass: [
            {required: true, message: '请输入密码!', trigger: 'blur'},
            {min: 6, message: '密码长度最少六位', trigger: 'blur'}
          ],
          confirmPass: [
            {required: true, message: '请输入确认密码!', trigger: 'blur'},
            {validator: validateConfirmPass, trigger: 'blur'}
            ]
        }
      }
    },
    computed:{
      ...mapGetters(['isLogin','nickname','level','telephone','id'])
    },
    methods:{
      onSubmit(){
        this.$refs['passInfo'].validate((valid) => {
          console.log('valiadte is :'+valid);
          if (valid) {
            this.$axios.put('/user/pass',this.passInfo).then((res)=>{
              if(res.data && res.data.status === 'success'){
                this.$message({message:'修改成功',type:'success',showClose:true});
              }else{
                this.$message({message:'修改失败',type:'error',showClose:true});
              }
            }).catch( err => this.error() );
          } else {
            //console.log('error submit!!');
            return false;
          }
        });

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
