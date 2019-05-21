(function () {
  $.ajax({
    type: "get",
    url: "player.html",
    success: function (html) {
      $(html).replaceAll("#music")
      $(`<link rel="stylesheet" href="css/player.css">`)
        .appendTo("head")
      // 定义歌单
      var list = [{
        m_name: "石徑",
        m_author: "張敬軒+麥家瑜",
        src: "./player/張敬軒+麥家瑜石徑.jpg",
        url: "./player/張敬軒+麥家瑜石徑.mp3",
        time: "4:44",
        total: 284
      },
      {
        m_name: "Into The Light",
        m_author: "Vgr",
        src: "./player/Vgr - Into The Light.jpg",
        url: "./player/Vgr - Into The Light.mp3",
        time: "3:22",
        total: 202
      },
      {
        m_name: "石徑",
        m_author: "張敬軒+麥家瑜",
        src: "./player/張敬軒+麥家瑜石徑.jpg",
        url: "./player/張敬軒+麥家瑜石徑.mp3",
        time: "4:44",
        total: 284
      },
      {
        m_name: "Into The Light",
        m_author: "Vgr",
        src: "./player/Vgr - Into The Light.jpg",
        url: "./player/Vgr - Into The Light.mp3",
        time: "3:22",
        total: 202
      },
      {
        m_name: "石徑",
        m_author: "張敬軒+麥家瑜",
        src: "./player/張敬軒+麥家瑜石徑.jpg",
        url: "./player/張敬軒+麥家瑜石徑.mp3",
        time: "4:44",
        total: 284
      },
      {
        m_name: "Into The Light",
        m_author: "Vgr",
        src: "./player/Vgr - Into The Light.jpg",
        url: "./player/Vgr - Into The Light.mp3",
        time: "3:22",
        total: 202
      },
      {
        m_name: "石徑",
        m_author: "張敬軒+麥家瑜",
        src: "./player/張敬軒+麥家瑜石徑.jpg",
        url: "./player/張敬軒+麥家瑜石徑.mp3",
        time: "4:44",
        total: 284
      },
      {
        m_name: "Into The Light",
        m_author: "Vgr",
        src: "./player/Vgr - Into The Light.jpg",
        url: "./player/Vgr - Into The Light.mp3",
        time: "3:22",
        total: 202
      },
      {
        mid: 5,
        m_name: "石徑",
        m_author: "張敬軒+麥家瑜",
        src: "./player/張敬軒+麥家瑜石徑.jpg",
        url: "./player/張敬軒+麥家瑜石徑.mp3",
        time: "4:44",
        total: 284
      },
      {
        mid: 6,
        m_name: "Into The Light",
        m_author: "Vgr",
        src: "./player/Vgr - Into The Light.jpg",
        url: "./player/Vgr - Into The Light.mp3",
        time: "3:22",
        total: 202
      },
      ]

      var vm = new Vue({
        el: "#music",
        data: {
          list,
          music_i: 0,
          now_time: 0,
          isplay: true
        },
        methods: {
          m_pause() {
            if (m_audio.paused) {
              console.log("播放")
              this.isplay = true;
              m_audio.play()
            } else {
              console.log("暂停")
              this.isplay = false;
              m_audio.pause()
            }
          },
          m_last() {
            if (this.music_i > 0) {
              this.music_i--;
            } else {
              this.music_i = this.list.length - 1
            }
            this.now_time = 0
            play(this.music_i)
          },
          m_next() {
            if (this.music_i < this.list.length - 1) {
              this.music_i++;
            } else {
              this.music_i = 0
            }
            this.now_time = 0
            play(this.music_i)
          },
          m_change(i) {
            this.isplay = true;
            this.music_i = i;
            this.now_time = 0
            play(this.music_i)
          }
        },
        computed: {
          minues() {
            return Math.floor(this.now_time / 60).toFixed(0)
          },
          seconds() {
            var seconds = this.now_time % 60
            seconds = seconds >= 10 ? seconds : "0" + seconds
            return seconds
          },
          range_style() {
            return {
              width: this.now_time / list[this.music_i].total * 300 + "px"
            }
          },
        },
      })
      var m_audio = document.getElementById("audio")
      var m_timer;
      function play() {
        clearInterval(m_timer)
        var i = vm.music_i
        var total = list[i].total
        m_timer = setInterval(() => {
          vm.now_time = Math.ceil(m_audio.currentTime)
          if (vm.now_time >= total) {
            vm.m_next();
          }
        }, 1000)
      }
      var m_range_move = false;
      var m_down;
      var m_move;
      var m_range = document.querySelector("#music div.m_range")
      m_range.onmousedown = function (e) {
        clearInterval(m_timer)
        m_audio.pause();
        vm.isplay = false;
        m_range_move = true;
        var left = e.offsetX
        audio.currentTime = list[vm.music_i].total * (left) / 300
        vm.now_time = Math.ceil(m_audio.currentTime)
      }
      m_range.onmousemove = function (e) {
        if (m_range_move) {
          var left = e.offsetX
          audio.currentTime = list[vm.music_i].total * (left) / 300
          vm.now_time = Math.ceil(m_audio.currentTime)
        }
      }
      m_range.onmouseup = (function () {
        m_range_move = false;
        play();
        vm.isplay = true;
        m_audio.play();
      })
      // 是否可以移动
      var music_move = false;
      // 记录鼠标相对元素位置
      var music_X;
      var music_Y;
      // 获取播放器
      var music_m = document.querySelector("#music div.audio div.m_img")
      var music = document.querySelector("#music")
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
          music.style.left = left - music_X + 50 + "px"
          music.style.top = top - music_Y + 215 + "px"
        }
      }
      // 鼠标放开
      window.onmouseup = function () {
        music_move = false;
      }
      // 加载自动
      play()
    }
  })
})()
