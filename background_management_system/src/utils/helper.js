import { MessageBox } from 'element-ui';

const confirm = ({ content , tip , type , center , callback }) => {
    MessageBox.confirm( content , tip , {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: type,
        center: center,
    } ).then( () => {
        callback && callback()
    } ).catch( () => {

    } )
}

const ProConfirm = ({ content, tip, type, center, callback }) => {
    return new Promise((resolve, reject) => {
        MessageBox.confirm(content, tip, {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: type,
            center: center,
        } ).then( () => {
            resolve( 'confirm' )
        } ).catch(() =>{
            reject( 'cancel' )
        } )
    })
}




export default {
    confirm,
    ProConfirm
}