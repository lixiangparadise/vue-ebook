<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  // computed:{
  //   ...mapGetters([
  //     'filename'
  //   ])
  // },
  // mounted(){
  //   this.$store.dispatch()
  // }
}
document.addEventListener('DOMContentLoaded',()=>{
  const html = document.querySelector('html');
  let fontsize = window.innerWidth / 10;
  fontsize= fontsize>50 ? 50: fontsize;
  html.style.fontSize = fontsize+'px';
})
</script>


<style lang="scss" scoped>
#app{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>