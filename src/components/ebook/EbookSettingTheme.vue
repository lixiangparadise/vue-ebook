<template>
<transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible===1">
        <!-- 设置主题 -->
        <div class="setting-theme">
            <div class="setting-theme-item" v-for="(item, index) in themeList"
            :key="index" @click="setTheme(index)">
                <div class="preview" 
                :class="{'selected': item.name===defaultTheme}"
                :style="{background: item.style.body.background}"
                ></div>
                <!-- 被选中时改变颜色 -->
                <div class="text" :class="{'selected': item.name===defaultTheme}">{{item.alias}}</div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
// import {themeList} from '../../utils/book'
import {ebookMixin} from '../../utils/mixin'
 export default {
     mixins:[ebookMixin],
    //  computed:{
    //     //  获得themelist数据
    //      themeList(){
    //          return themeList(this);
    //      }
    //  },
     methods:{
         setTheme(index){
             const theme = this.themeList[index];
             this.setDefaultTheme(theme.name).then(()=>{
                 this.currentBook.rendition.themes.select(this.defaultTheme)
             });
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
    height:px2rem(90);
    background-color: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-theme{
        height:100%;
        // background-color: yellow;
        display: flex;
        .setting-theme-item{
            flex:1;
            display: flex;
            flex-direction: column;
            padding: px2rem(5);
            box-sizing: border-box;
            .preview{
                flex:1;
                border: px2rem(1) solid #ccc;
                box-sizing: border-box;
                &.selected{
                    box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, .1);
                }
            }
            .text{
                flex: 0 0 px2rem(20);
                font-size: px2rem(14);
                color: #ccc;
                @include center;
                &.selected {
                    color:#333;
                }
            }
        }
    }
}
 
</style>
