import cookie from 'cookie_js';
const username = 'admn_username';
const token = 'admn_token';

//  设置用户
const setUsername = ( value ) => {
    return cookie.set( username, value )
}
//  获取用户
const getUsername = () => {
    return cookie.get( username )
}
//  清空用户
const removeUsername = () => {
    return cookie.remove(username)
}
//  设置token
const setToken = (value) => {
    // console.log(value);
    return cookie.set(token, value)
}
//  获取token
const getToken = () => {
    return cookie.get(token)
}
//  清空token
const removeToken = () => {
    return cookie.remove(token)
}

export default {
    sU: setUsername,
    gU: getUsername,
    rU: removeUsername,
    sT: setToken,
    gT: getToken,
    rT: removeToken
}