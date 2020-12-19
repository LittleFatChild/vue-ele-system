import { MessageBox } from 'element-ui';

export default {
    install( Vue , options ){
        Vue.prototype.$confirm = ( { content, tip, type, center, callback } ) => {
            MessageBox.confirm(content, tip, {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: type,
                center: center,
            }).then(() => {
                console.log('This is global method');
                callback && callback();
            }).catch(() => {

            })
        }
    }
}