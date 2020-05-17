import Vue from 'vue'
import VueI18N from 'vue-i18n'
import en from './en'
import cn from './cn'
import { getLocale, saveLocale } from '../utils/localStorage'

Vue.use(VueI18N)

const messages = {
  en,
  cn
}

// const locale='en'
let locale = getLocale();
//缓存为空
if(!locale){
  locale = 'cn',
  saveLocale(locale);
  // console.log(locale);
}

const i18n = new VueI18N({
  locale,
  messages
})

export default i18n
