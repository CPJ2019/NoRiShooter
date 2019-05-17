var music_move = false;
var music_X;
var music_Y;
var music_m = document.querySelector("#music div")
music_m.onmousedown = function (e) {
  music_move = true;
  music_X = e.offsetX;
  music_Y = e.offsetY;
}
window.onmousemove = function (e) {
  if (music_move) {
    var left = e.clientX;
    var top = e.clientY;
    music_m.parentNode.style.left = left - music_X + 50 + "px"
    music_m.parentNode.style.top = top - music_Y + 215 + "px"
  }
}
window.onmouseup = function () {
  music_move = false;
}