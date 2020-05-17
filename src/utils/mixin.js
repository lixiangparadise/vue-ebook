// 将重复代码复用
import {mapGetters, mapActions} from 'vuex'
export const ebookMixin={
    computed:{
        ...mapGetters([
            'fileName',
            'menuVisible'
        ])
    },
    methods:{
        ...mapActions([
            'setMenuVisible',
            'setFileName'
        ])
    }
}