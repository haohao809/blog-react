// 工具类函数
/** 通用处理工具 **/
/**
 *
 * @param {时间戳} timeStamp
 */
function formatDateTime(time, format = 'YYYY-MM-DD HH:mm:ss') {
    let obj = {
        YYYY: time.getFullYear(),
        MM: ('0' + (time.getMonth() + 1)).slice(-2),
        DD: ('0' + time.getDate()).slice(-2),
        HH: ('0' + time.getHours()).slice(-2),
        mm: ('0' + time.getMinutes()).slice(-2),
        ss: ('0' + time.getSeconds()).slice(-2),
        w: ['日', '一', '二', '三', '四', '五', '六'][time.getDay()],
        YY: ('' + time.getFullYear()).slice(-2),
        M: time.getMonth() + 1,
        D: time.getDate(),
        H: time.getHours(),
        m: time.getMinutes(),
        s: time.getSeconds()
    };
    // 循环对象的键组成的数组
    Object.keys(obj).forEach(value => {
        format = format.replace(value, obj[value]);
    });

    return format;
}
export  {
    formatDateTime
}