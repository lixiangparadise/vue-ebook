<template>
 <div class="ebook-reader">
<!-- {{$route.params.fileName}} -->
    <!-- 展示电子书 -->
    <div id="read"></div>
 </div>
</template>

<script>
// import {mapActions} from 'vuex'
import {ebookMixin} from '../../utils/mixin'
import Epub from 'epubjs'
global.ePub = Epub
 export default {
    //  vuex mapgetters mapactions mixin
    mixins: [ebookMixin],
    //  computed:{
    //      //  将getters通过computed挂载到当前实例，所以不需要通过this.$store.state方法访问
    //     //  只需要使用this.即可
    //     // 也可以是自定义的对象
    //      ...mapGetters([
    //          'fileName',
    //          'menuVisible'
    //         ])
    //  },
     methods:{
        // 在methods里面混合
        //  ...mapActions(['setMenuVisible']),
         //调用下一页的功能
         nextPage(){
             if(this.rendition){
                 this.rendition.next();
                 this.hideTitleAndMenu();
             }
         },
         //上一页
         prevPage(){
             if(this.rendition){
                 this.rendition.prev();
                 this.hideTitleAndMenu();
             }
         },
         toggleTitleAndMenu(){
            //  如果为true则隐藏
             if(this.menuVisible){
                this.setSettingVisible(-1);
                this.setFontFamilyVisible(false);
            }
            //  console.log("title and menu...");
            //调用action方法并传入参数
            //  this.$store.dispatch('setMenuVisible',!this.menuVisible);
            this.setMenuVisible(!this.menuVisible);
         },
        //  在滑动过程中隐藏
         hideTitleAndMenu(){
            //  this.$store.dispatch('setMenuVisible',false);
            // 使用mapactions即可
            this.setMenuVisible(false);
            this.setSettingVisible(-1);
            this.setFontFamilyVisible(false);
         },
         initEpub(){
            //  获得链接
             const url = "http://localhost:9000/epub/" + this.fileName + '.epub';
            //  console.log(url);
            //新建实例
            this.book = new Epub(url);
            //保存
            this.setCurrentBook(this.book);
            //通过rendition渲染
            this.rendition = this.book.renderTo('read',{
                width: innerWidth,
                height: innerHeight,
                // 微信兼容性
                method:'default'
            })
            this.rendition.display();
            // 电子书使用iframe标签显示
            // iframe添加手势滑动监听
            this.rendition.on("touchstart", event=>{
                this.touchStartX = event.changedTouches[0].clientX;
                this.touchStartTime = event.timeStamp;
                // console.log(event);
            });
            this.rendition.on("touchend", event=>{
                // 位置偏移量
                const offsetX = event.changedTouches[0].clientX - this.touchStartX;
                // 时间
                const time = event.timeStamp - this.touchStartTime;
                // 长按则不触发事件
                if(time<500 && offsetX >40){
                    this.prevPage();
                }else if(time<500 && offsetX < -40){
                    this.nextPage();
                }else{
                    // 时间长位移小则类似点击事件，则显示菜单栏
                    this.toggleTitleAndMenu();
                }
                // console.log(event);
                event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作（如果存在这样的动作）
                event.stopPropagation();//阻止捕获和冒泡阶段中当前事件的进一步传播。
            });
            // ebook渲染在iframe中所以不能直接通过引入字体文件修改web字体
            //addStylesheet参数必须是url
            this.rendition.hooks.content.register(contents=>{
                //简化url
                contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`);
                contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`);
                contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`);
                contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`);
                /*contents.addStylesheet('http://192.168.3.17:9000/fonts/daysOne.css');
                contents.addStylesheet('http://192.168.3.17:9000/fonts/cabin.css');
                contents.addStylesheet('http://192.168.3.17:9000/fonts/montserrat.css');
                contents.addStylesheet('http://192.168.3.17:9000/fonts/tangerine.css');*/
                //也可以采用异步的方式，即上述过程结束后可以做其他工作
                // Promise.all([上述四句]).then(()=>{})
            })
         }
     },
     mounted(){
         const fileName = this.$route.params.fileName.split('|').join('/');
        //  this.$store.dispatch('setFileName', fileName).then(()=>{
        this.setFileName(fileName).then(()=>{
             this.initEpub()
         })
        //  console.log(`${baseUrl}${fileName}.epub`); //字符串拼接
     }
 }
</script>

<style lang='scss' scoped>

 
</style>

