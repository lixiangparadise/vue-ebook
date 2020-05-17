// 将重复代码复用
import {mapGetters, mapActions} from 'vuex'
import {themeList} from './book'
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
            'defaultTheme'
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
            'setDefaultTheme'
        ])
    }
}