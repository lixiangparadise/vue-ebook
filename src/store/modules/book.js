const book = {
    state:{
        // 获取文件名称
        fileName: '',
        // 顶部栏是否显示
        menuVisible: false,
        // menubar上方的设置
        //  -1：不显示，0：字号设置，1：主题，2：进度条，3：目录
        settingVisible: -1,
        defaultFontSize: 16,
        // 渲染的book对象
        currentBook: null
     },
    mutations:{
        SET_FILENAME(state, fileName){
            state.fileName = fileName;
        },
        SET_MENUVISIBLE(state, menuVisible){
            state.menuVisible = menuVisible;
        },
        SET_SETTINGVISIBLE(state, settingVisible){
            state.settingVisible = settingVisible;
        },
        SET_DEFAULTFONTSIZE(state, defaultFontSize){
            state.defaultFontSize = defaultFontSize;
        },
        SET_CURRENTBOOK(state, currentBook){
            state.currentBook = currentBook;
        }
    }
    
}

export default book;