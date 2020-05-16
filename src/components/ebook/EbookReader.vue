<template>
 <div class="ebook-reader">
<!-- {{$route.params.fileName}} -->
    <!-- 展示电子书 -->
    <div id="read"></div>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Epub from 'epubjs'
global.ePub = Epub
 export default {
    
     computed:{
         //  将getters通过computed挂载到当前实例，所以不需要通过this.$store.state方法访问
        //  只需要使用this.即可
         ...mapGetters(['fileName'])
     },
     methods:{
         initEpub(){
             const url = "http://localhost:9000/epub/" + this.fileName + '.epub';
            //  console.log(url);

         }
     },
     mounted(){
         const fileName = this.$route.params.fileName.split('|').join('/');
         this.$store.dispatch('setFileName', fileName).then(()=>{
             this.initEpub()
         })
        //  console.log(`${baseUrl}${fileName}.epub`); //字符串拼接
     }
 }
</script>

<style lang='scss' scoped>

 
</style>

