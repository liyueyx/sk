<template>
   <div>
      <nav-header></nav-header>
      <div class="content">
         <el-upload
                 class="upload-demo"
                 ref="upload"
                 name="imageFile"
                 action="/user/upload/authentication"
                 :on-preview="handlePreview"
                 :on-remove="handleRemove"
                 :file-list="fileList"
                 :with-credentials="true"
                 >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
         </el-upload>
      </div>

   </div>
</template>

<script>
  import NavHeader from '../components/NavHeader.vue'
  import {baseURL} from '../config'
  export default {
    data () {
      return {
        baseURL:baseURL,
        fileList: []
      }
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    },
    components:{
      NavHeader
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
