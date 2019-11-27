/**
 * @desc 时间格式处理
 * @param time
 * @returns {string} e.g. 2019-11-20 08:50:01
 */
export const getTime = (time = new Date()) => {
  const _f = num => num < 10 ? "0" + num : num;
  let _s = new Date(time),
    Y = _s.getFullYear(),
    M = _s.getMonth() + 1,
    D = _s.getDate(),
    h = _s.getHours(),
    m = _s.getMinutes(),
    s = _s.getSeconds();
  return `${Y}年${_f(M)}月${_f(D)}日 ${_f(h)}:${_f(m)}:${_f(s)}`;
};

/**
 * @desc 获取周几
 * @param time
 * @returns {string} e.g. 周三
 */
export const getWeek = (time = new Date()) => {
  let arr = ["日", "一", "二", "三", "四", "五", "六"];
  let _s = new Date(time);
  let _w = _s.getDay();
  return `星期${arr[_w]}`;
};

export const getWeather = () => {
  let arr = ["晴", "多云", "阴", "小雨", "中雨", "大雨", "暴雨", "雨夹雪", "小雪", "中雪", "大雪", "暴雪", "大风"];
  let _i = Math.floor(Math.random() * 13);
  return arr[_i] || "晴";
};