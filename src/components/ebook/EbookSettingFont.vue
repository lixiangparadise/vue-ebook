<template>
<transition name="slide-up">
    <!-- 字号设置显示  0 -->
    <div class="setting-wrapper" v-show="menuVisible && settingVisible===0">
        <!-- 字号设置 -->
        <div class="setting-font-size">
            <!-- 获取第一个字号 -->
            <div class="preview" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>
            <div class="select">
                <div class="select-wrapper"  v-for="(item, index) in fontSizeList" 
                :key="index" @click="setFontSize(item.fontSize)">
                <div class="line"></div>
                <div class="point-warpper">
                    <!-- 显示小球 -->
                    <div class="point" v-show="defaultFontSize===item.fontSize">
                        <div class="small-point"></div>
                    </div>
                </div>
                <div class="line"></div>
            </div>
            </div>
            
            <!-- 获取最后一个字号 -->
            <div class="preview" :style="{fontSize: fontSizeList[fontSizeList.length-1].fontSize + 'px'}">A</div>
        </div>
    </div>
</transition>
</template>

<script>
import {ebookMixin} from '../../utils/mixin'
import { FONT_SIZE_LIST } from '../../utils/book'
 export default {
     mixins: [ebookMixin],
     data(){
         return{
             fontSizeList:FONT_SIZE_LIST
         }
     },
     methods:{
         setFontSize(fontSize){
             this.setDefaultFontSize(fontSize);
             this.currentBook.rendition.themes.fontSize(fontSize);
         }
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
    height:px2rem(60);
    background-color: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-font-size{
        display: flex;
        height:100%;
        .preview{
            flex: 0 0 px2rem(40);
            @include center //居中
        }
        .select{
            display:flex;
            flex:1;
            .select-wrapper{
                flex:1;
                // @include center;
                align-items: center;
                display: flex;
                // 左右多余的线去掉
                &:first-child{
                    .line{
                        &:first-child{
                            border-top:none;
                        }
                    }
                }
                &:last-child{
                    .line{
                        &:last-child{
                            border-top: none;
                        }
                    }
                }
                .line{
                    flex:1;
                    height:0;
                    border-top: px2rem(1) solid #ccc;
                }
                .point-warpper{
                    position: relative;
                    flex: 0 0 0;
                    width: 0;
                    height: px2rem(7);
                    border-left: px2rem(1) solid #ccc;
                    .point{
                        position: absolute;
                        top: px2rem(-8);
                        left: px2rem(-10);
                        width: px2rem(20);
                        height:px2rem(20);
                        border-radius:50%;
                        background-color: white;
                        border: px2rem(1) solid #ccc;
                        box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, .15);
                        @include center;
                    }
                    .small-point{
                        width: px2rem(5);
                        height: px2rem(5);
                        background: black;
                        border-radius: 50%;
                    }
                }
            }
        }
        
    }
}
 
</style>

