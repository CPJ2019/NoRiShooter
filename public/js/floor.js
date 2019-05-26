(() => {
  // 获取需要跳转的层数元素
  var floors = document.querySelectorAll("[target-floor]")
  // console.log(floors);
  // 创建一个空的数组
  var floor = [];
  // 遍历数组将内容和距离文档的高度写入 i为数组下标
  for (let i = 0; i < floors.length; i++) {
    floor[i] = {
      fname: floors[i].textContent.replace(/\s/g, ""),
      // -100是为了跳转时 目标位置距离顶部向下100单位
      target: floors[i].offsetTop - 100
    }
  }
  // console.log(floor)
  // 创建vue
  var fl_nav = new Vue({
    el: "#floor_nav",
    data: {
      // 当前屏幕滚动距离 
      scrollTop: 0,
      // 写入了数据的数据
      floor,
    },
    methods: {
      // 楼层点击跳转
      to_floor(i) {
        // 向上
        if (this.scrollTop > this.floor[i].target) {
          console.log("up")
          scrollup(this.floor[i].target, this.scrollTop)
          // 向下
        } else if (this.scrollTop < this.floor[i].target) {
          console.log("down")
          scrolldown(this.floor[i].target, this.scrollTop)
        }
      }
    },
    computed: {
      // 当前楼层
      f_index() {
        var s = this.scrollTop
        var f_index;
        for (let i = this.floor.length - 1; i >= 0; i--) {
          if (s > this.floor[i].target - 200) {
            // console.log(i)
            f_index = i;
            break;
          }
        }
        return f_index
      }
    },
  })
  // 获取楼层指示器
  var floor_nav = document.getElementById("floor_nav")
  // window监听滚动并传入vue data
  window.addEventListener("scroll", function () {
    fl_nav.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log("滚动距离" + fl_nav.scrollTop);
    // 当滚动位置到达1f时 楼层指示器显示
    if (fl_nav.scrollTop >= fl_nav.floor[0].target) {
      floor_nav.className = "active";
    } else { //楼层指示器显示
      floor_nav.className = "";
    }
  })
  // 向上回滚
  // target为目标位置
  // now为当下位置
  function scrollup(target, now) {
    var now = document.documentElement.scrollTop || document.body.scrollTop;
    var timer = setInterval(() => {
      // 做减速运动
      now -= now / 100
      if (now - 1 <= target) { //超过位置停下 确保floor_i 正常指示
        clearInterval(timer)
      } else {
        // 回滚动作
        window.scrollTo(0, now);
      }
    }, 5);
  }
  // 向下回滚
  function scrolldown(target, now) {
    var timer = setInterval(() => {
      var d = target - now
      // 做减速运动
      now += ((d / 100) + 5)
      // 回滚动作
      window.scrollTo(0, now);
      if (now - 1 >= target) { //快到达停下 确保floor_i 正常指示
        clearInterval(timer)
      }
    }, 5);
  }
})()