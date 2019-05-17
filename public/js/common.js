// 获取标题文本
var t_txt = document.title
// 间隔定时器
setInterval(() => {
  //  拼接字符串 文本向前一位
  t_txt = t_txt.slice(1, t_txt.length) + t_txt.slice(0, 1)
  // 重新写入
  document.title = t_txt
}, 600)
// 网易播放器
// 是否可以移动
var music_move = false;
// 记录鼠标相对元素位置
var music_X;
var music_Y;
// 获取播放器
var music_m = document.querySelector("#music div")
// 按下
music_m.onmousedown = function (e) {
  music_move = true;
  music_X = e.offsetX;
  music_Y = e.offsetY;
}
// 拖拽
window.onmousemove = function (e) {
  if (music_move) {
    var left = e.clientX;
    var top = e.clientY;
    music_m.parentNode.style.left = left - music_X + 50 + "px"
    music_m.parentNode.style.top = top - music_Y + 215 + "px"
  }
}
// 鼠标放开
window.onmouseup = function () {
  music_move = false;
}