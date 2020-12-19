import { ref } from '@vue/composition-api';
import { MessageBox } from 'element-ui';

export default global = () => {
    const str = ref('xxx');
    const confirm = ( { content, tip, type, center, callback } ) => {
        MessageBox.confirm(content, tip, {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: type,
            center: center,
        }).then(() => {
            console.log('This is vue 3.0  method');
            str.value = 'nice';
            callback && callback();
        }).catch(() => {

        })
    }

    return {
        str,
        confirm
    }
}