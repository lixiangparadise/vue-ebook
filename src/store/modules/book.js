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
        currentBook: null,
        // 默认字体
        defaultFontFamily: 'Default',
        // 选择字体部分
        fontFamilyVisible: false,
        // 默认主题
        defaultTheme: 'Default',
        // 进度条
        progress:0,
        bookAvailable: false,
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
        },
        SET_DEFAULTFONTFAMILY(state, defaultFontFamily){
            state.defaultFontFamily = defaultFontFamily;
        },
        SET_FONTFAMILYVISIBLE(state, fontFamilyVisible){
            state.fontFamilyVisible = fontFamilyVisible;
        },
        SET_DEFAULTTHEME(state, defaultTheme){
            state.defaultTheme = defaultTheme;
        },
        SET_PROGRESS(state, progress){
            state.progress = progress;
        },
        SET_BOOK_AVAILABLE(state, bookAvailable){
            state.bookAvailable = bookAvailable
        },
    }
    
}

export default book;