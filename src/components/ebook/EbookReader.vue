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
import { getFontFamily, saveFontFamily, 
         getFontSize, saveFontSize, 
         getTheme, saveTheme, getLocation } from '../../utils/localStorage'
import { addCss } from '../../utils/book'
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
                 this.rendition.next().then(()=>{
                     //  下一页需要保存location
                     this.refreshLocation();
                 });
                 this.hideTitleAndMenu();
             }
         },
         //上一页
         prevPage(){
             if(this.rendition){
                 this.rendition.prev().then(()=>{
                    //  上一页需要保存location
                     this.refreshLocation();
                 });
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
         //封装 缓存
         //字号
         initFontSize(){
            let fontSize = getFontSize(this.fileName);
            //没有该字号
            if(!fontSize){
                saveFontSize(this.fileName,this.defaultFontSize);
            }else{
                //有则获取
                this.rendition.themes.fontSize(fontSize);
                this.setDefaultFontSize(fontSize);
            }
         },
         //字体
         initFontFamily(){
            let font = getFontFamily(this.fileName);
            //如果没有该字体的缓存则保存
            if(!font){
                saveFontFamily(this.fileName, this.defaultFontFamily);
            }else{
                //能被获取则修改
                this.rendition.themes.font(font);
                this.setDefaultFontFamily(font);
            }
         },
         initTheme(){
             //缓存问题
             let defaultTheme = getTheme(this.fileName);
             if(!defaultTheme){
                 defaultTheme = this.themeList[0].name;
                 saveTheme(this.fileName, defaultTheme);
             }
             this.setDefaultTheme(defaultTheme);
            //  注册主题
             this.themeList.forEach(theme=>{
                 this.rendition.themes.register(theme.name, theme.style);
             })
             // 选择默认样式
             this.rendition.themes.select(defaultTheme);
         },
         initRedition(){
             //通过rendition渲染
            this.rendition = this.book.renderTo('read',{
                width: innerWidth,
                height: innerHeight,
                // 微信兼容性
                method:'default'
            })
            //display返回promise对象使用then执行下一步
            //重新载入的时候查看是否有缓存
            // this.rendition.display().then(()=>{
            //     //获取缓存中的字体
            //     this.initFontFamily();
            //     //获取缓存中的字号
            //     this.initFontSize();
            //     //设置theme
            //     this.initTheme();
            //     // 初始化全局样式
            //     this.initGlobalStyle();

            //     this.refreshLocation();
            // });
            // 原先是上述方法，但是可以复用display方法
            const location = getLocation(this.fileName);
            // 如果location没有缓存则直接显示display()，否则显示display(location)
            this.display(location, ()=>{
                 //获取缓存中的字体
                this.initFontFamily();
                //获取缓存中的字号
                this.initFontSize();
                //设置theme
                this.initTheme();
                // 初始化全局样式
                this.initGlobalStyle();
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
         },
         initGesture(){
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
         },
         initEpub(){
            //  获得链接
            //  const url = "http://localhost:9000/epub/" + this.fileName + '.epub';
             const url = process.env.VUE_APP_RES_URL + '/epub/' + this.fileName + '.epub';
            //  console.log(url);
            //新建实例
            this.book = new Epub(url);
            //保存
            this.setCurrentBook(this.book);
            //调用method中的方法
            this.initRedition();//rendition
            this.initGesture();//手势操作
            
            //通过epubjs的钩子函数实现获取Locations对象
            //Location对象默认不加载
            //分页
            //book解析完成调用ready
            this.book.ready.then(()=>{
                //参数：一页字数
                // 粗糙分页
                return this.book.locations.generate(
                    750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16));
            }).then(result=>{
              //保存locations对象
              //epubcfi定位
              //this.locations = this.book.locations;
              //标记电子书为解析完成状态
              this.setBookAvailable(true);
              //分页后有progress
              this.refreshLocation();
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

