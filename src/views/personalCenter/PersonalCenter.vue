<template>
   <div>
      <nav-header></nav-header>
      <div class="content">
         <el-container>
            <el-aside class="personal-nav" width="276">
               <div class="personal-info">
                  <div class="avatar">
                     <img src="../../assets/img/i.png" alt="">
                     <span><i>{{telephone}}</i></span>
                     <a target="_blank" href="/member_applies/new">申请成为算客</a>
                  </div>
                  <div class="employ-info">
                     <p>收入：<em>¥0</em></p>

                     <p>支出：<em>¥0</em></p>

                     <p>余额：<em>¥0</em>
                        <span><a href="/accounts">提现</a></span>
                     </p>
                     <p><a href="/accounts">查看收支明细</a></p>
                  </div>
               </div>
               <div class="page-view-div person-credit">
                  <table>
                     <tbody><tr>
                        <td>累计发布</td>
                        <td>选标</td>
                        <td>纠纷</td>
                     </tr>
                     <tr>
                        <th>0</th>
                        <th>0</th>
                        <th>0</th>
                     </tr>
                     </tbody></table>
               </div>
               <div class="nav">
                  <dl>
                     <dt class="nav-ico2"><i class="el-icon-tickets"></i>基本信息</dt>
                     <dd><router-link to="/personalCenter/editInfo">修改基本信息</router-link></dd>
                     <dd><router-link to="/personalCenter/editPass">修改密码</router-link></dd>
                     <dd><router-link to="/personalCenter/authentication">实名/资历 认证</router-link></dd>
                     <dd><router-link to="/">我的消息</router-link></dd>
                     <dd><router-link to="/">我的权限</router-link></dd>
                     <dd><router-link to="/">账户中心</router-link></dd>
                  </dl>
                  <dl>
                     <dt class="nav-ico2"><i class="el-icon-tickets"></i>交易管理</dt>
                     <dd><a href="/projects/publish_way" target="_blank">发布项目</a></dd>
                     <!--<dd><a href="/my/projects">我发布的项目</a></dd>-->
                     <dd><a href="/store_members">我收藏的算客</a></dd>
                     <dd><a href="/discounts">我的项目优惠劵</a></dd>
                  </dl>
                  <dl>
                     <dt class="nav-ico2"><i class="el-icon-tickets"></i>算客大礼包</dt>
                     <dd><a href="/coupon_uses">我的优惠券</a></dd>
                  </dl>
               </div>

            </el-aside>
            <el-main>
               <router-view></router-view>
            </el-main>
         </el-container>
      </div>

   </div>
</template>

<script>
  import '../../assets/css/personalCenter.css'
  import NavHeader from '../../components/NavHeader.vue'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        msg: ''
      }
    },
    components: {
      NavHeader
    },
    computed: {
      ...mapGetters(['isLogin', 'telephone', 'level'])
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .personal-nav {
      float: left;
      display: inline;
      width: 278px;
      border: 1px solid #EBEBEB;
      background-color: #FCFCFC;
   }
</style>
