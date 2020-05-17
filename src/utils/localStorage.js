import Storage from 'web-storage-cache'

const localStorage = new Storage()

export function setLocalStorage(key, value) {
  return localStorage.set(key, value)
}

export function getLocalStorage(key) {
  return localStorage.get(key)
}

export function removeLocalStorage(key) {
  return localStorage.delete(key)
}

export function clearLocalStorage() {
  return localStorage.clear()
}

export function setBookObject(fileName, key, value){
    let book = getLocalStorage(`${fileName}-info`);
    // if(book){
    //     book[key] = value;
    // }
    // else{
    //     book={};
    //     book[key] = value; 
    // }
    //如果没有则新建对象
    if(!book){
        book={}
    }
    //有则覆盖
    book[key] = value;
    setLocalStorage(`${fileName}-info`,book);
}

export function getBookObject(fileName,key){
    let book = getLocalStorage(`${fileName}-info`);
    if(book){
        return book[key];
    }
    else{
        return null;
    }
}

//字体缓存
//获取字体
export function getFontFamily(fileName){
    return getBookObject(fileName, 'fontFamily');
}
//缓存字体
export function saveFontFamily(fileName, fontFamily){
    return setBookObject(fileName, 'fontFamily', fontFamily);
}

//字号缓存
//获取字号
export function getFontSize(fileName){
    return getBookObject(fileName, 'fontSize');
}
//缓存字号
export function saveFontSize(fileName, fontSize){
    return setBookObject(fileName, 'fontSize', fontSize);
}

//双语
//缓存语言
export function saveLocale(locale){
    return setLocalStorage('locale', locale);
}
//获得语言
export function getLocale(){
    return getLocalStorage('locale');
}
