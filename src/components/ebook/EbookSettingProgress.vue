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
            <span>{{bookAvailable ? progress+'%' : '加载中...'}}</span>
        </div>
    </div>
</div>
</transition>
</template>

<script>
import {ebookMixin} from '../../utils/mixin'
 export default {
     mixins:[ebookMixin],
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
             const percentage = this.progress / 100;
             //获得百分比位于的cfi位置
             const cfi = this.currentBook.locations.cfiFromPercentage(percentage);
             //渲染
             this.currentBook.rendition.display(cfi);
         },
        //  左右两边颜色不一样
         updateProgressBg(){
            this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
         },
        //  上一章下一章
         prevSection(){},
         nextSection(){}
        
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
            text-align: center;
        }
    }
}
 
</style>
