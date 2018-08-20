<template>
   <div class="header">
      <div class="w rel">
         <el-menu class="el-menu-demo"
                  mode="horizontal">
            <a href="/" class="fl">
               <img src="../assets/img/logo.png" alt="">
            </a>
            <el-submenu index="1">
               <template slot="title">发布</template>
               <el-menu-item index="1-1">发布项目</el-menu-item>
               <el-menu-item index="1-2">委托项目</el-menu-item>
               <el-menu-item index="1-3"><router-link to="/test">Test</router-link></el-menu-item>
            </el-submenu>
            <el-menu-item index="2">项目</el-menu-item>
            <el-submenu index="3">
               <template slot="title">算客</template>
               <el-menu-item index="3-1">算客</el-menu-item>
               <el-menu-item index="3-2">工作中心</el-menu-item>
            </el-submenu>
            <el-menu-item index="4">企业</el-menu-item>
            <el-menu-item index="5">工具箱</el-menu-item>
            <el-menu-item index="6">帮助</el-menu-item>
            <el-submenu index="7">
               <template slot="title">发现</template>
               <el-menu-item index="7-1">最新动态</el-menu-item>
               <el-menu-item index="7-2">算客会员</el-menu-item>
               <el-menu-item index="7-3">企业VIP</el-menu-item>
               <el-menu-item index="7-4">算客经纪人</el-menu-item>
               <el-menu-item index="7-5">算客大礼包</el-menu-item>
               <el-menu-item index="7-6">我的权限</el-menu-item>
               <el-menu-item index="7-7"></el-menu-item>
            </el-submenu>
            <el-submenu index="8" v-if="level>100">
               <template slot="title">审核</template>
               <el-menu-item index="8-1">项目</el-menu-item>
               <el-menu-item index="8-2"><router-link to="/userManager">用户</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="9" class="fr" v-if="isLogin">
               <template slot="title">
                  <img src="../assets/img/i.png" alt="" class="head-portrait">
               </template>
               <el-menu-item index="9-1"><router-link to="/personalCenter">个人中心</router-link></el-menu-item>
               <el-menu-item index="9-2" @click="loginout">退出登录</el-menu-item>
            </el-submenu>
            <div class="login fr" v-if="!isLogin">
               <!--<el-button type="text" @click="loginout">退出</el-button>-->
               <el-button type="text" size="medium" @click="dialogLoginVisible = true">登录</el-button>
               <el-button type="text" @click="dialogRegisterVisible = true">注册</el-button>
            </div>
         </el-menu>
      </div>
      <el-dialog title="用户登录" width="500px" :visible.sync="dialogLoginVisible">
         <el-form>
            <el-form-item>
               <el-input placeholder="请输入手机号" v-model="login.telephone"></el-input>
            </el-form-item>
            <el-form-item>
               <el-input type="password" placeholder="请输入密码" v-model="login.pass"></el-input>
            </el-form-item>
         </el-form>
         <div slot="footer" class="dialog-footer">
            <el-button @click="okClick" class="okBtn" :loading="inTheLogin">登录</el-button>
         </div>
      </el-dialog>
      <el-dialog title="手机注册" width="500px" :visible.sync="dialogRegisterVisible">
         <el-form>
            <el-form-item>
               <el-input placeholder="请输入手机号" v-model="register.telephone"></el-input>
            </el-form-item>
            <el-form-item>
               <el-input type="password" placeholder="请输入密码" v-model="register.pass"></el-input>
            </el-form-item>
         </el-form>
         <div slot="footer" class="dialog-footer">
            <button @click="registerClick" class="okBtn">注册</button>
         </div>
      </el-dialog>
   </div>
</template>

<script>
  import '../assets/css/nav-header.css'
  import { mapGetters } from 'vuex'
  import ElSubmenu from '../../node_modules/element-ui/packages/menu/src/submenu'
  import ElButton from '../../node_modules/element-ui/packages/button/src/button'

  export default {
    components: {
      ElButton,
      ElSubmenu},
    name: 'NavHeader',
    data () {
      return {
        msg: '',
        dialogLoginVisible: false,  //是否显示登录窗口
        dialogRegisterVisible: false,  //是否显示注册窗口
        inTheLogin:false,  //登录中状态
        login: {
          telephone: '',
          pass: ''
        },
        register: {
          telephone: '',
          pass: ''
        }
      }
    },
    computed:{
      ...mapGetters(['isLogin','nickname','level'])
    },
    methods: {
      okClick: function() { //登录方法
        this.inTheLogin = true;
        let param = {
          telephone: this.login.telephone,
          pass: this.login.pass
        };
        this.$axios.post('/user/login', param).then((res) => {
          this.inTheLogin = false;
          if (res.data.status && res.data.status === 'success') {
            this.login.telephone = '';
            this.login.pass = '';
            this.dialogLoginVisible = false;
            this.$store.commit('updateUser', res.data.result);
            this.$message({message: '登录成功', type: 'success', showClose: true});
          }else if (res.data.status && res.data.status ==='error'){
            this.$message({message:res.data.msg, type:'error', showClose: true});
          }else {
            this.$message({message: '登录失败', type: 'error', showClose: true});
          }

        }).catch( err => this.error(err) );
      },
      registerClick: function () { //注册方法
        let param = {
          telephone:this.register.telephone,
          pass:this.register.pass
        }
        this.$axios.post('/user/register', param).then((res) => {
          if(res.data){
            let data = res.data;
            if(data.status === 'success'){
              this.dialogRegisterVisible = false;
              this.$message({message: '注册成功', type: 'success', showClose: true});
              this.register.telephone = '';
              this.register.pass = '';
              setTimeout(()=>{
                this.dialogLoginVisible = true;
              },500);
            }else if(data.status === 'error'){
              this.$message({message: data.msg, type: 'error', showClose:true});
            }
          }else{
            this.$message({message:'服务内部错误!', type: 'error', showClose:true});
          }



        }).catch( err => this.error(err) );
      },
      loginout: function () { //退出登录
        this.$axios.get('/user/loginout',{index:Math.random()}).then((res) => {
          if(res.data.status && res.data.status === 'success'){
            this.$store.commit('updateUser',{id:'',telephone:'',nickname:'',level:-1});
            this.$message({message:'退出成功', type:'success', showClose:true});
          }else{
            this.$message({message:'退出失败', type:'error', showClose:true});
          }
        }).catch( err => this.error());
      },
      checklogin: function(){
        console.log(this.$axios.defaults.baseURL);
        this.$axios.get('/user/checklogin',{index:Math.random()}).then((res) => {
          let data = res.data
          if(data.status && data.status === 'success'){
            this.$store.commit('updateUser',data.result);
          }
        }).catch( err => this.error(err) );
      },
      error: function(err){
        this.$message({msg:'请求失败', type:'error', showClose:true});
      }
    },
    created: function () {
      this.checklogin();
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .header {
      position: fixed;
      width: 100%;
      height: 70px;
      padding: 5px 0 0;
      background: white;
      position: relative;
      top: 0;
      left: 0;
      font-size: 16px;
      min-width: 1100px;
      font-size: 16px;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
      min-width: 1100px;
   }

   .header .w {
      width: 1100px;
   }

   .rel {
      position: relative;
   }

   .w {
      width: 980px;
      height: auto;
      margin: 0 auto;
      overflow: hidden;
   }

   .header a {
      line-height: 60px;
      margin-right: 15px;
   }

   a:link, a:visited, ins {
      text-decoration: none;
   }

   .head-portrait {
      width: 40px;
      height: 40px;
   }

   .login {
      margin-right: 10px;
   }

   .dialog-footer .okBtn {
      border: 1px solid #de1a0e;
      background: #f66626;
      color: #ffffff;
      width: 200px;
      margin-top: 20px;
      height: 50px;
      border-radius: 3px;
      font-size: 14px;
   }

</style>

