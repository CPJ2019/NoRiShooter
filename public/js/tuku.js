$(function () {
  // 声明SQL语句需要的变量
  var start = 0; // 查询位置
  var count = 6; // 查询条数
  var key = ""; // 查询关键字
  var sort = "" //查询排序
  // ajax获取图片数据
  function get_pics() {
    return new Promise(function (open) {
      var xhr = new XMLHttpRequest();
      var url = `/tuku/get_images?sort=${key + sort}&start=${start}&count=${count}`;
      xhr.open('get', url, true);
      xhr.send(null);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var json = xhr.responseText;
          var pics = JSON.parse(json);
          open(pics)
        }
      }
    })
  }
  // ajax修改图片点击数
  function update_count(tid, c_num) {
    return new Promise(function (open) {
      var xhr = new XMLHttpRequest();
      xhr.open('post', "tuku/add_count/", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      var formdata = `click_count=${c_num}&tid=${tid}`
      xhr.send(formdata);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          open()
        }
      }
    })
  }

  // 获取6图加载元素 div.main
  var $main = $("div.main")
  // 生成基础6图
  function get_normal_images() {
    get_pics()
      .then(function (pics) {
        // html片段
        var html = "";
        // 标记图片顺序
        var n = 0;
        for (var pic of pics) {
          html += `
          <div>
            <div class="img_show">
              <img data-num="${n}" src="${pic.imgs}" alt="${pic.tid}">
            </div>
            <div class="img_msg">
              <p>作品编号-${pic.tid}</p>
              <p>热度-<span class="hot">${pic.click_count}</span></p>
              <p>
                <span>上传者-<a class="my_a" href="javascript:;">${pic.uploader}</a></span>
                <span>上传时间-${pic.upload_datetime}</span>
              </p>
            </div>
          </div>
            `
          n++;
        }
        // 改写图片展示内容
        $main.html(html)
      })
  }
  // 获取单张大图的img元素 单独修src 不重排
  var $full_img = $("div.full_show div.img_show img")
  // 获取大图信息
  var $img_msg = $("div.full_show div.img_msg")
  // 生成满屏图片
  function get_full_image() {
    get_pics()
      .then(function (pics) {
        // 改写图片src
        $full_img.attr("src", pics[0].imgs)
        var html = `
          <p>作品编号-${pics[0].tid}</p>
          <p>热度-<span>${pics[0].click_count}</span></p>
          <p>
            <span>上传者-<a class="my_a" href="javascript:;">${pics[0].uploader}</a></span>
            <span>上传时间-${pics[0].upload_datetime}</span>
          </p>
        `
        // 改写信息内容
        $img_msg.html(html)

      })
  }
  // 标记页面正在查询的起始位置
  var mark;
  // 获取单张图片展示大框
  var $full = $("div.full_show")
  // 获取单张图片展示框
  var $full_img_show = $("div.full_show div.img_show")
  // 获取需要绑定事件的父级元素 div.container 托管事件
  var $container = $("div.container");
  // 绑定事件
  $container.click(function (e) {
    var $tar = $(e.target)
    // 判断是否点击的是图片
    if ($tar.is("div.img_show img")) {
      // 点击的是6张图片中的其中一张
      if ($tar.attr("data-num")) {
        // 获取图片编号0~6
        var n = parseInt($tar.attr("data-num"));
        // 记录现在的请求位置
        mark = start;
        // 加上编号得出应该查询的start
        start += n;
        // 设置查询条数为1 单独显示
        count = 1;
        // 单独图片窗口显示
        $full.addClass("active")
        // 按键翻转
        btn_rever()
        // 更新点击
        // 获取图片id
        var tid = $tar.attr("alt")
        // 获取热度内容(点击数)
        var $click = $tar.parent().next().children("p:nth-child(2)").children()
        var c_num = $click.html()
        // 自增1
        c_num++;
        // 重新写入网页
        $click.html(c_num)
        // 特效动画
        $click.addClass("my_click");
        setTimeout(() => {
          $click.removeClass("my_click");
        }, 500)
        // ajax更新点击
        update_count(tid, c_num)
          // 生成图片以及图片信息
          .then(get_full_image)
        // 点击的是单独图片
      } else {
        // 重新给start赋值 mark是点击生成大图时记录下来的值
        start = mark;
        // 改变查询的数目 回到6图状态
        count = 6;
        // 关闭单独窗口
        $full.removeClass("active")
        // 按钮翻转
        btn_rever()
        return;
      }
      // 点击的不是图片 各种功能按钮  
      // 是否是排序或者返回按钮
    } else if ($tar.is(".btn_div button>div")) {
      // 按钮button
      var $tar = $tar.parent();
      // 是否为排序按钮
      if ($tar.attr("btn-sort")) {
        // 重新排序
        start = 0;
        // 非激活状态
        if (!$tar.is(".active")) {
          // 添加class 激活状态 向下位移 同时默认渐变上深下浅的背景 :after的content为倒序 默认
          $tar.addClass("active")
            //清除其他排序的激活状态
            .siblings(".active").removeClass("active")
            // 清除排序渐变背景
            .removeClass("asc")
          // 设置默认排序方式为倒序
          sort = " DESC,"
          // 已激活状态  
        } else {
          // 是否为正序 
          if (!$tar.is(".asc")) {
            // 不是的话添加asc class :after的content为正序 button会显示上浅下深的背景色
            $tar.addClass("asc")
            // 修改排序为
            sort = " ASC,"
          } else {
            // 是正序的话
            // 移除正序class
            $tar.removeClass("asc")
            // 修改排序为倒序
            sort = " DESC,"
          }
        }
        // 修改关键字为排序按钮中的 btn-sort:"XXX" XXX为排序关键字
        key = $tar.attr("btn-sort");
        // 重新生成图片
        get_normal_images()
        return;
        // 如果是返回按钮
      } else if ($tar.attr("btn-return")) {
        // 操作与点击大图一致
        start = mark;
        count = 6;
        $full.removeClass("active")
        btn_rever()
        get_normal_images()
        return;
      }
      // 如果是切换按钮
    } else if ($tar.is("[data-change]")) {
      // change是图片切换时显示框位移距离
      var change;
      // 是否向右
      if ($tar.attr("data-change") == "+") {
        // 向右切换
        // 查询位置增加 +6为6图 +1为单独展示
        start += count;
        // 展示框向位移距离 负数为右移 margin-left
        change = -1100;
        // 向左切换
      } else {
        // 是否为第一页/张
        if (start - count >= 0) {
          // 不是
          start -= count
          change = 1100
        } else {
          // 是 无操作
          return
        }
      }
      // 6图情况下
      if (count == 6) {
        // 调用切换函数 动画效果
        $main.show_change(change)
        // 展示框消失时加载内容 动画持续 0.55s
        setTimeout(() => {
          get_normal_images()
        }, 275)
        // 大图情况下
      } else {
        $full_img_show.show_change(change)
        // 先清空对话框里的图片信息内容
        $img_msg.html("")
        setTimeout(() => {
          get_full_image()
        }, 275)
      }
    }
  });
  // 给jq库添加新的函数 切换动画效果
  jQuery.fn.show_change = function (change) {
    // 位移 先移出展示框 然后消失 位移到另外一端 其这段时间内重新生成页面 到另一端展示框外后显示 最后回到原点 最终效果为左出右进 或者右出左进
    $(this).animate({
        marginLeft: `${change}`,
      }, 250, function () {
        $(this).hide() //隐藏
      })
      //反方向位移
      .animate({
        marginLeft: `${0 - change}`,
      }, 50, function () {
        $(this).show() //显示
      })
      .animate({
        marginLeft: 0, //回到显示框正中间
      }, 250)
  }
  // 按钮组翻转角度
  var btn_deg = 0;
  // 按钮组翻转动画
  function btn_rever() {
    // 180度翻转
    btn_deg += 180
    $(".img_btn").css("transform", `rotateY(${btn_deg}deg)`)
  }



  // 大图下信息可拖拽移动
  // 提示信息可位移 锁定
  var msg_move = false;
  // 图片提示信息
  var full_msg = document.querySelector("div.full_show div.img_msg")
  // 图片展示框 
  var full_show = document.querySelector("div.full_show")
  // 点击点在提示信息的相对偏移
  var offsetX;
  var offsetY;
  // 屏幕相对网页顶点的相对高度
  var targetY;
  // 鼠标在信息框上按下的时候
  full_msg.onmousedown = function (e) {
    // 位移解锁
    msg_move = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    // 获取相对高度
    targetY = document.documentElement.scrollTop || document.body.scrollTop;
  }
  // 在大图展示框上移动时
  full_show.onmousemove = function (e) {
    // 解锁情况下
    if (msg_move) {
      // 鼠标相对显示屏的位置
      var left = e.clientX
      var top = e.clientY
      // 修改绝对定位位置
      full_msg.style.left = left - offsetX - 245 + "px"
      full_msg.style.top = top - offsetY - 215 + targetY + "px"
    }
  }
  // 鼠标提起时
  full_show.onmouseup = function (e) {
    msg_move = false;
  }
  // 自动加载
  $(get_normal_images())
})