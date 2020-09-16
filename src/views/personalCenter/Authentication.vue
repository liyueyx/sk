<template>
   <div>
      <div class="content">
         <el-upload
                 class="upload-demo"
                 ref="upload"
                 name="imageFile"
                 :action="action()"
                 :on-preview="handlePreview"
                 :on-remove="handleRemove"
                 :before-remove="handleBeforeRemove"
                 :file-list="fileList"
                 :with-credentials="true">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
         </el-upload>
      </div>

   </div>
</template>

<script>
  import {baseURL} from '../../config';
  export default {
    data () {
      return {
        fileList: []
      }
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleBeforeRemove(file, fileList){
        return false;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      action(){
        return baseURL+'/user/upload/authentication';
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .el-main .content{
      width: 100%;
      padding: 0;
   }

</style>
