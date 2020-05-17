// 管理静态变量

export const FONT_SIZE_LIST=[
    {fontSize: 12},
    {fontSize: 14},
    {fontSize: 16},
    {fontSize: 18},
    {fontSize: 20},
    {fontSize: 22},
    {fontSize: 24}
]

export const FONT_FAMILY = [
    {font: 'Default'},
    {font: 'Cabin'},
    {font: 'Days One'},
    {font: 'Montserrat'},
    {font: 'Tangerine'}
]

export function themeList(vue){
    return [
        {
            alias: vue.$t('book.themeDefault'),//设置别名
            name: 'Default',
            style: {
                body: {
                'color': '#4c5059',
                'background': '#cecece'
                }
            }
        },
        {
            alias: vue.$t('book.themeGold'),
            name: 'Gold',
            style: {
                body: {
                'color': '#5c5b56',
                'background': '#c6c2b6',
                }
            }
        },
        {
            alias: vue.$t('book.themeEye'),
            name: 'Eye',
            style: {
                body: {
                'color': '#404c42',
                'background': '#a9c1a9',
                }
            }
        },
        {
            alias: vue.$t('book.themeNight'),
            name: 'Night',
            style: {
                body: {
                'color': '#cecece',
                'background': '#000000',
                }
            }
        }
    ]
}

// href: css位置
//动态创建link标签
export function addCss(href){
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    // 设置属性
    link.setAttribute('rel','stylesheet');
    link.setAttribute('type', 'text/css');//css文件
    link.setAttribute('href',href);
    // 将link标签添加到head下
    head.appendChild(link);
}

//删除link标签
export function removeCss(href){
    const links = document.getElementsByTagName('link');
    
    for(let i = links.length-1; i>=0;i--){
        const link = links[i];
        if(link && link.getAttribute('href') && link.getAttribute('href')===href){
            link.parentNode.removeChild(link);
        }
    }
}

//删除所有的css
export function removeAllCss() {
    removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
    removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
    removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
    removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
  }