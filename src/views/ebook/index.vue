<template>
<!-- 电子书入口文件 -->
<div class="ebook">
    <!-- 标题栏 -->
    <ebook-title></ebook-title>
    <!-- 电子书 -->
    <ebook-reader></ebook-reader>
    <!-- 菜单栏 -->
    <ebook-menu></ebook-menu>
</div>
</template>

<script>
import EbookReader from '../../components/ebook/EbookReader'
import EbookTitle from '../../components/ebook/EbookTitle'
import EbookMenu from '../../components/ebook/EbookMenu'
export default {
    components:{
        EbookReader,
        EbookTitle,
        EbookMenu
    }
}
</script>

<style lang="scss" scoped>

</style>