<template>
   <div>
      <nav-header></nav-header>
      <div class="content">
         <el-upload
                 class="upload-demo"
                 ref="upload"
                 name="imageFile"
                 action="http://127.0.0.1:3000/user/upload/authentication"
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
  export default {
    data () {
      return {
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
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
