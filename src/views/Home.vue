<template>
  <div class="home">
    <div id="read">
    </div>
  </div>
</template>

<script>
import Epub from 'epubjs'
global.ePub = Epub
const DOWNLOAD_URL = "/2018_Book_AgileProcessesInSoftwareEngine.epub"
export default {
  name: 'home',
  data(){
    return{

    }
  },
  methods:{
    //电子书的解析和渲染
    showEpub(){
      //生成book对象
      this.book = new Epub(DOWNLOAD_URL);
      console.log(this.book);
      //生成rendition
      this.rendition = this.book.renderTo('read',{
        //充满全屏
        width: window.innerWidth,
        height: window.innerHeight
      })
      console.log(this.rendition);
      //display渲染
      this.rendition.display();
    }
  },
  mounted(){
    this.showEpub();
  }
}
</script>
