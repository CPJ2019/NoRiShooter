// 声明SQL语句需要的变量
var start = 0;
var count = 6;
var key = "";
var sort = ""
// 获取图片列表
function get_images() {
  // console.log(start)
  // console.log(count)
  var xhr = new XMLHttpRequest();
  var url = `/tuku/get_images?sort=${key+sort}&start=${start}&count=${count}`;
  xhr.open('get', url, true);
  xhr.send(null);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var result = xhr.responseText;
      console.log(result);
      var pics = JSON.parse(result);
      // 图片列表模板
      var html = "";
      // classname
      var c_name;
      // data-num
      var my;
      var n = 0;
      if (pics.length == 1) {
        c_name = "full";
        my = "full-num";

      } else {
        c_name = "normal";
        my = `data-num`;
      }
      for (var pic of pics) {
        html += `
       <div class="${c_name}">
       <div class="img_show">
         <img ${my}="${n}" src="${pic.imgs}" alt="${pic.tid}">
       </div>
       <div class="img_msg">
         <p>作品编号-${pic.tid}</p>
         <p>热度-<span>${pic.click_count}</span></p>
         <p>
           <span>上传者-<a class="my_a" href="#">${pic.uploader}</a></span>
           <span>上传时间-${pic.upload_datetime}</span>
         </p>
       </div>
     </div>
       `
        n++;
      }
      // 改写图片展示内容
      $main = $("div.main")
      $main.html(html)
    }
  }
}
var mark;
var $container = $("div.container");
$container.click(function (e) {
  var $tar = $(e.target)
  if ($tar.is("div.img_show img")) {
    if ($tar.attr("data-num")) {
      var n = parseInt($tar.attr("data-num"));
      mark = start;
      start += n;
      count = 1;
      btn_rever()
      get_images()
    } else {
      start = mark;
      count = 6;
      btn_rever()
      get_images()
    }
  } else if ($tar.is("button")) {
    if ($tar.attr("btn-sort")) {
      if (!$tar.is(".active")) {
        $tar.addClass("active")
          .siblings().removeClass("active")
          .removeClass("asc")
        sort = " DESC,"
      } else {
        if (!$tar.is(".asc")) {
          $tar.addClass("asc")
          sort = " ASC,"
        } else {
          $tar.removeClass("asc")
          sort = " DESC,"
        }
      }
      key = $tar.attr("btn-sort");
      get_images()
      return;
    } else if ($tar.attr("btn-return")) {
      start = mark;
      count = 6;
      btn_rever()
      get_images()
      return;
    } else if ($tar.attr("data-change")) {
      ($tar.attr("data-change") == "+") ?
      (start += count) :
      (start - count >= 0) && (start -= count)
      get_images()
    }
  }
});
var btn_deg = 0;

function btn_rever() {
  btn_deg += 180
  $(".img_btn").css("transform", `rotateY(${btn_deg}deg)`)
}
window.onload = get_images()