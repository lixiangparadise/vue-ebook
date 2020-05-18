// 将重复代码复用
import {mapGetters, mapActions} from 'vuex'
import {themeList, addCss, removeAllCss} from './book'
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
            'bookAvailable'
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
            'setBookAvailable'
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
    }
}