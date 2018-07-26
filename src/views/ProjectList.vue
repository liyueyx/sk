<template>
   <div>
      <nav-header></nav-header>
   </div>
</template>

<script>
  import NavHeader from '../components/NavHeader.vue'
  export default {
    data () {
      return {
        PList: []
      }
    },
    components: {
      NavHeader
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
