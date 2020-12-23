export const formatDate = (date) => {
    var newdate = new Date(date*1000);
    var year = newdate.getFullYear();
    var month = newdate.getMonth();
    var week = newdate.getDate();
    var hour = newdate.getHours();
    var minute = newdate.getMinutes();
    var seconds = newdate.getSeconds();
    return year + "-" + month + "-" + week + "-" + hour + "-" + minute + "-" + seconds;
}