<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="name"></use>
    </svg>
</template>

<script>
import { computed, onMountd, reactive, ref } from '@vue/composition-api'
export default {
    props:{
        iconName: {
            type: String,
            default: '',
            // required: true
        }
    },
    setup( props, { root, refs } ){
        const svgClass = ref( "svg-icon" );
        // const name = ref( "#icon-menu" );
        const name = computed( () => `#icon-${props.iconName}` )
        return {
            svgClass,
            name
        }
    }
}
</script>

<style  lang="scss">
    .svg-icon{
        width: 1.5em;
        height: 1.5em;
        fill: currentColor;
        color: #fff;
        margin-right: 10px !important;
    }
    .exit{
        font-size: 15px;
    }
</style>