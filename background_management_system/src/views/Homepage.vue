<template>
    <div id="homeson" :class="[isCollapse ? 'close' : 'open']">
        <layoutHead/>
        <layoutNav/>
        <layoutMain/>
    </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from '@vue/composition-api';
import layoutNav from '@/components/homelayout/nav';
import layoutHead from '@/components/homelayout/header';
import layoutMain from '@/components/homelayout/main';
export default {
    components: {
        layoutNav,
        layoutHead,
        layoutMain  
    },
    setup( prop, { refs, root } ){
    //------------------------------------------------data----------------------------------------------
        const isCollapse = computed( () => root.$store.getters['app/isCollapse'] )
    //------------------------------------------------methods-------------------------------------------

        return {
            isCollapse
        }
    }
};
</script>

<style scoped lang="scss">

</style>
