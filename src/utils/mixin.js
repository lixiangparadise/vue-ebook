// 将重复代码复用
import {mapGetters, mapActions} from 'vuex'
import {themeList, addCss, removeAllCss} from './book'
import {saveLocation} from './localStorage'

export const ebookMixin={
    computed:{
        ...mapGetters([
            'fileName',
            'menuVisible',
            'settingVisible',
            'defaultFontSize',
            'currentBook',
            'defaultFontFamily',
            'fontFamilyVisible',
            'defaultTheme',
            'progress',
            'bookAvailable',
            'section'
        ]),
        //  获得themelist数据
        themeList(){
            return themeList(this);
        }
    },
    methods:{
        ...mapActions([
            'setMenuVisible',
            'setFileName',
            'setSettingVisible',
            'setDefaultFontSize',
            'setCurrentBook',
            'setDefaultFontFamily',
            'setFontFamilyVisible',
            'setDefaultTheme',
            'setProgress',
            'setBookAvailable',
            'setSection'
        ]),
        // 初始化全局样式
        initGlobalStyle(){
            removeAllCss();
            // console.log(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
            switch (this.defaultTheme) {
                case 'Default':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`);
                    break;
                case 'Eye':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`);
                    break;
                case 'Gold':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`);
                    break;
                case 'Night':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`);
                    break;
                default:
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`);
                    break;
            }
            
        },
        //  根据当前位置获取进度条百分比
        refreshLocation(){
            //获得当前位置
            const currentLocation = this.currentBook.rendition.currentLocation();
            //  取当前cfi位置
            const startCfi = currentLocation.start.cfi;
            //获取当前cfi位置startCfi的进度百分比
            const progress = this.currentBook.locations.percentageFromCfi(startCfi);
            //设置进度条
            this.setProgress(Math.floor(progress*100));
            //章节
            this.setSection(currentLocation.start.index)
            //localstorage
            saveLocation(this.fileName, startCfi);
        },
        // 根据target(cfi位置)显示位置
        // 如果存在回调函数cb，则调用rendition的display方法后调用回调函数
        display(target, cb){
            if(target){
                this.currentBook.rendition.display(target).then(()=>{
                    this.refreshLocation();
                    if(cb) cb()
                })
            }
            else{
                this.currentBook.rendition.display().then(()=>{
                    this.refreshLocation();
                    if(cb) cb()
                })
            }
        }

    }
}