const book = {
    state:{
        // 获取文件名称
        fileName: '',
        // 顶部栏是否显示
        menuVisible: false
     },
    mutations:{
        SET_FILENAME(state, fileName){
            state.fileName = fileName;
        },
        SET_MENUVISIBLE(state, menuVisible){
            state.menuVisible = menuVisible;
        }
    }
    
}

export default book;