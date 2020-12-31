<template>
    <div>

    </div>
</template>

<script>
import { ref , reactive , onMounted } from '@vue/composition-api';
export default {
    prop: {
        option: {
            type: Object,
            default:{

            }
        }
    },
    setup( props , context ){
        const data = reactive({
            defaultValue: '',
            option: [
                
            ]
        })
        return {

        }
    }
}
</script>

<style>

</style>