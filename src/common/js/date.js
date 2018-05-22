export function formatDate(time, format) {
  let date = new Date(time);
  let o = {
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp(`(${k}+)`).test(format)) {
      let str = o[k];
      if (RegExp.$1.length > `${str}`.length) {
        str = '0' + str;
      }
      format = format.replace(RegExp.$1, str);
    }
  }
  return format;
}
