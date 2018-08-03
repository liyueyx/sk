<template>
   <div>
      <nav-header></nav-header>
      <div class="content">
         <el-button @click="test">测试</el-button>
         <p>{{msg}}</p>
      </div>

   </div>
</template>

<script>
  import NavHeader from '../components/NavHeader.vue'
  export default {
    data () {
      return {
        msg: 'Welcome to 算客'
      }
    },
    methods: {
      test: function (){
        let param = {}
        this.$axios.get('/user/test',param).then((res)=>{
          console.log(JSON.stringify(res));
        });
      }
    },
    components:{
      NavHeader
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
