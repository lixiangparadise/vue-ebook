<template>
<transition name="slide-up">
<div class="setting-wrapper" v-show="menuVisible && settingVisible===2">
    <!-- 进度条 -->
    <div class="setting-progress">
        <!-- 阅读时间 -->
        <div class="read-time-wrapper">
            <div class="read-time-text">111</div>
            <span class="icon-forward"></span>
        </div>
        <!-- 进度条 -->
        <div class="progress-wrapper">
            <!-- 左箭头 -->
            <div class="progress-icon-wrapper" @click="prevSection">
                <span class="icon-back"></span>
            </div>
            <!-- 中间进度条 -->
            <!-- $event.target.value 获取当前文本框的值 -->
            <input type="range" class="progress"
            max="100" min="0" step="1"
            @change="onProgressChange($event.target.value)"
            @input="onProgressInput($event.target.value)"
            :value="progress"
            :disabled = "!bookAvailable"
            ref="progress"
            />
            <!-- 右边箭头 -->
            <div class="progress-icon-wrapper" @click="nextSection">
                <span class="icon-forward"></span>
            </div>
        </div>
        <div class="text-wrapper">
            <span class="progress-section-text">{{getSectionName}}</span>
            <span>{{bookAvailable ? progress+'%' : '加载中...'}}</span>
        </div>
    </div>
</div>
</transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
 export default {
     mixins:[ebookMixin],
    //  通过计算属性获得目录名称
    computed:{
        getSectionName(){
            if(this.section){
                // 根据章节获得章节内容
                const sectionInfo = this.currentBook.section(this.section);
                if(sectionInfo && sectionInfo.href){
                    // 获取当前目录
                    return this.currentBook.navigation.get(sectionInfo.href).label;
                }
            }
            return '';
        }
    },
     methods:{
        //  拖动改变后的调用方法
         onProgressChange(progress){
             this.setProgress(progress).then(()=>{
                 this.displayProgress();
                 this.updateProgressBg();
             });
         },
        //  拖动过程中的方法进度条页面发生变换
         onProgressInput(progress){
             this.setProgress(progress).then(()=>{
                 this.updateProgressBg();
             })
            //  this.setProgress(progress).then(()=>{
            //      this.displayProgress();
            //  });
         },
        //  展示当前进度所在的页面
         displayProgress(){
             const percentage=this.progress / 100;
             //获得百分比位于的cfi位置
             const cfi = this.currentBook.locations.cfiFromPercentage(percentage);
             //渲染
            //  this.currentBook.rendition.display(cfi).then(()=>{
            //     //  调整进度条保存位置
            //      this.refreshLocation();
            //  });
            // 调用复用函数
            this.display(cfi);
         },
        //  左右两边颜色不一样
         updateProgressBg(){
            this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
         },
        //  上一章下一章
         prevSection(){
            //  章节 且 此书解析完毕
             if(this.section>0 && this.bookAvailable){
                 this.setSection(this.section-1).then(()=>{
                     //展示
                    this.displaySection();
                 })
             }
         },
         nextSection(){
             //spine 阅读进度
            //  console.log(this.currentBook.spine);
             if(this.section<this.currentBook.spine.length-1 && this.bookAvailable){
                 this.setSection(this.section+1).then(()=>{
                     //展示
                     this.displaySection();
                 })
             }
         },
         displaySection(){
              //section api 直接传入章节即可获取当前章节的内容
             const secInfo = this.currentBook.section(this.section);
             if(secInfo && secInfo.href){
                //  显示当前章节  
                //后 需要刷新进度条位置
                //  this.currentBook.rendition.display(secInfo.href).then(()=>{
                //     //  调整章节时保存位置
                //      this.refreshLocation();
                //  });
                 this.display(secInfo.href);
             } 
         }
        //  放入mixin中复用
        //  //  刷新进度条
        //  refreshLocation(){
        //      //获得当前位置
        //      const currentLocation = this.currentBook.rendition.currentLocation();
        //      //  取当前cfi位置
        //      const startCfi = currentLocation.start.cfi;
        //      //获取当前cfi位置startCfi的进度百分比
        //      const progress = this.currentBook.locations.percentageFromCfi(startCfi);
        //     //  设置进度条
        //      this.setProgress(Math.floor(progress*100));
        //      //localstorage 保存切换章节时的位置
        //      saveLocation(this.fileName, startCfi);
        //  }
     },
     //  一开始的状态
     //使用updated更新一开始的状态或者直接在css中使用background-size: 0 100%;
    updated() {
        this.updateProgressBg();
    }
 }
</script>

<style lang='scss' scoped>
@import '../../assets/styles/global';
.setting-wrapper{
    position: absolute;
    left:0;
    bottom: px2rem(48);
    width:100%;
    z-index:101;
    height:px2rem(90);
    background-color: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-progress{
        position: relative;
        height:100%;
        width: 100%;
        .read-time-wrapper{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: px2rem(40);
            font-size: px2rem(12);
            @include center;
        }
        .progress-wrapper{
            height:100%; 
            width: 100%;
            @include center;
            padding: 0 px2rem(15);
            box-sizing: border-box;
            .progress-icon-wrapper{
                font-size: px2rem(20);
            }
            .progress{
                width: 100%;
                //改变浏览器默认风格
                -webkit-appearance: none;
                height: px2rem(2);
                // background-size: 0 100%;
                margin: 0 px2rem(10);
                &:focus {
                    outline: none;
                }
                // 设置range滑块的具体样式 中间的圆形
                &::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: px2rem(20);
                    width: px2rem(20);
                    border-radius: 50%;
                    background: white;
                    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
                    border: px2rem(1) solid #ddd;
                }
            }
        }
        .text-wrapper{
            position: absolute;
            left:0;
            bottom: px2rem(10);
            width: 100%;
            color: #333;
            font-size:px2rem(12);
            // text-align: center;
            padding: 0 px2rem(15);
            box-sizing: border-box;
            @include center;
            .progress-section-text{
                @include ellipsis;
                // //一行显示  封装为上面函数
                // text-overflow: ellipsis;//多余时使用省略号
                // overflow: hidden;
                // white-space: nowrap;//不换行
            }
        }
    }
}
 
</style>
