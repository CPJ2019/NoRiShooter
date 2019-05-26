// 获取介绍内容的图片展示元素
var pic_box = document.querySelectorAll(".intro_box .intro_img")
// console.log(pic_box);
// 遍历绑定
// 结合css实现图片点击换位
for (p of pic_box) {
  p.onclick = function () {
    if (this.classList.contains("active")) {
      this.classList.remove("active")
    } else {
      this.classList.add("active")
    }
  }
}
// 获取介绍内容的文本展示元素
var text = document.querySelectorAll(".intro_box .intro_text")
// console.log(intro_control)
// 遍历绑定
for (t of text) {
  // console.log(t);
  // 获取整个单项介绍
  let box = t.parentNode
  // console.log(box)
  // 获取控制展示 控制器在文本盒子内
  let control = t.querySelector(".intro_control")
  // console.log(control)
  // 当鼠标进入文本盒子时
  t.onmouseenter = function () {
    // 盒子下的图片和文本盒子宽度会发生改变
    box.classList.add("active")
    // 改变控制器样式
    if (control.classList.contains("left")) {
      control.classList.remove("left")
      control.classList.add("right")
    } else {
      control.classList.remove("right")
      control.classList.add("left")
    }
  }
  // 鼠标离开
  t.onmouseleave = function () {
    // console.log(t)
    // 恢复原本布局
    box.classList.remove("active")
    // 改变控制器样式
    if (control.classList.contains("left")) {
      control.classList.remove("left")
      control.classList.add("right")
    } else {
      control.classList.remove("right")
      control.classList.add("left")
    }
  }
}