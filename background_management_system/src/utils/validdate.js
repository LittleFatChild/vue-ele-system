/*
    *过滤特殊字符*
*/ 
const validate_inputValue = ( value, type) => {
    if( type == 'email'){
        var pattern = new RegExp("[`%~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）&;—|{}【】‘；：”“'。，、？]")
    }else{
        var pattern = new RegExp("[`%~!#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？.]")
    }
    var rs = "";
    for (var i = 0; i < value.length; i++) {
        rs = rs + value.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

// 验证码校验;
const getCode = ( value ) =>{
    let reg = /^[a-z0-9]{6}$/;
    return !reg.test( value )
}

// 密码校验;
const getPass = (value) => {
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return reg.test(value)
}

// 邮箱校验;
const getUser = (value) => {
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return !reg.test(value)
}

export default {
    iVp: validate_inputValue,
    gC: getCode,
    gP: getPass,
    gU: getUser
}







    

    

