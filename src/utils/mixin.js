// 将重复代码复用
import {mapGetters} from 'vuex'
export const ebookMixin={
    computed:{
        ...mapGetters([
            'fileName',
            'menuVisible'
        ])
    }
}