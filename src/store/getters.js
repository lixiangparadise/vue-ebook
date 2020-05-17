// 相当于state的计算属性，就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
const book = {
    // 等效于return
    fileName: state => state.book.fileName,
    menuVisible: state => state.book.menuVisible,
    settingVisible: state => state.book.settingVisible,
    defaultFontSize: state => state.book.defaultFontSize,
    currentBook: state => state.book.currentBook,
    defaultFontFamily: state => state.book.defaultFontFamily,
    fontFamilyVisible: state => state.book.fontFamilyVisible

}

export default book;