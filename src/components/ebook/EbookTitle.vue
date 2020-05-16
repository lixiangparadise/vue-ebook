<template>
 <!-- 标题栏 -->
    <transition name="slide-down">
    <div class="title-wrapper" v-show="menuVisible">
        <div class="left">
            <span class="icon-back" @click="back"></span>
        </div>
        <div class="right">
            <div class="icon-wrapper">
                <span class="icon-shelf"></span>
            </div>
            <div class="icon-wrapper">
                <span class="icon-cart"></span>
            </div>
            <div class="icon-wrapper">
                <span class="icon-more"></span>
            </div>
        </div>
    </div>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex'
 export default {
     computed:{
         ...mapGetters(['menuVisible'])
     },
     methods:{
         back(){
             console.log("back");
         }
     }
 }
</script>

<style lang='scss' scoped>
@import '../../assets/styles/global';
.title-wrapper{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    z-index: 101;//层级越大在上面
    display: flex;
    height: px2rem(48);
    background-color: white;
    // 设置阴影
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);
    font-size: px2rem(20);
    .left{
        flex: 0 0 px2rem(60);
        // margin-left: px2rem(15);
        // 居中
        @include center;
    }
    .right{
        display: flex;
        flex:1;
        // 居右排列
        justify-content: flex-end;
        .icon-wrapper{
            flex: 0 0 px2rem(40);
            // 居中
            @include center;
            .icon-shelf {
                font-size: px2rem(22);
            }
            .icon-cart {
                font-size: px2rem(22);
            }
        }
    }
    // // 添加& 表示和title-wrapper是同一级的
    // //等同于title-wrapper:slide-down-enter 作用在同一标签上
    // &.slide-down-enter, &.slide-down-leave-to{
    //     // 初始位置
    //     transform: translate3d(0, -100%, 0);
    // }
    // &.slide-down-enter-to, &.slide-down-leave{
    //     //最终位置
    //     transform: translate3d(0, 0, 0);
    // }
    // &.slide-down-enter-active, &.slide-down-leave-active{
    //     //过程
    //     transition: all, 0.3s linear;
    // }
}
 
</style>

