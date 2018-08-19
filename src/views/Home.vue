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
        msg: 'Welcome to 算客',
        upload_url: 'aaa',       // 随便填一个，但一定要有
        uploadForm: new FormData(),   // 一个formdata
        rules: {},     // 用到的规则
        newform: {
          expName: '',
          groupName: '',
          expSn: '',
          subGroupName: '',
          expvmDifficulty: 1
        }
      }
    },
    methods: {
      test: function (){
        let param = {}
        this.$axios.get('/user/test',param).then((res)=>{
          console.log(JSON.stringify(res));
        });
      },
      newSubmitForm () {
        this.$refs['newform'].validate((valid) => {
          if (valid) {
            this.uploadForm.append('expName', this.newform.expName);
            this.uploadForm.append('expSn', this.newform.expSn);
            //this.uploadForm.append('groupId', this.newgroupId);
            //this.uploadForm.append('subGroupId', this.newsubgroupId);
            this.uploadForm.append('expvmDifficulty', this.newform.expvmDifficulty);
            /*newExp(this.uploadForm).then(res => {
              if (res.code === 400) {
                this.$message.error(res.error)
              } else if (res.code === 200) {
                this.$message.success('上传成功！')

              }
            })*/
            this.$axios.post('/user/upload',this.uploadForm).then(res => {
              if (res.code === 400) {
                this.$message.error(res.error)
              } else if (res.code === 200) {
                this.$message.success('上传成功！')
              }
            });



            this.$refs.uploadhtml.submit()   // 提交时触发了before-upload函数
            this.$refs.uploadfile.submit()
            this.$refs.uploadvideo.submit()

          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      newHtml (file) {   // before-upload
        this.uploadForm.append('html', file)
        return false
      },
      newFiles (file) {
        this.uploadForm.append('file[]', file)
        return false
      },
      newVideo (file) {
        this.uploadForm.append('video', file)
        return false
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
