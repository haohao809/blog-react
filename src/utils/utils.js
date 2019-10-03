import { Message } from "element-react";
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
/**
 * 封装POST请求
 * @param {*} url 
 * @param {*} data 
 */
function postData(url,data) {
    return fetch(url, {
      body: JSON.stringify(data),
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      referrer: 'no-referrer'

    }).then(res => res.json())
  }

  // 消息框
function open(value) {
    let text = "";
    let type = "";
    if (value === 0) {
      text = "成功";
      type = "success";
    } else {
      text = "失败";
      type = "error";
    }
    Message({
      message: text,
      type: type
    });
  }
export default{
    formatDateTime,
    postData,
    open
}