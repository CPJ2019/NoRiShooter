(function () {
  // 获取标题文本
  var t_txt = document.title+" "
  // 间隔定时器
  setInterval(() => {
    //  拼接字符串 文本向前一位
    t_txt = t_txt.slice(1, t_txt.length) + t_txt.slice(0, 1)
    // 重新写入
    document.title = t_txt
  }, 600)
})()