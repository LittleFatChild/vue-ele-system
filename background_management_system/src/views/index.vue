<template>
    <div class="index">
        <h1 class="ha">
            {{ message }}
        </h1>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from '@vue/composition-api'
export default {
    setup( prop, context ){
        let message = ref('Hello World');
        console.log(message);
        console.log(message.value);
        let object = reactive([
            {
                id: 55, name: 'lili'
            },
            {
                id: 65, name: 'lisa'
            }
        ])
        object[1].name = 'Sab'
        console.log(object)
        return {
            message
        }
    }

    
};
</script>

<style scoped lang="scss">
.index{
    padding-top: 50px;
    height: 100vh;
    background-color: deeppink;
    .ha{
        font-size: 22px;
        font-weight: bold;
    }
}

</style>
