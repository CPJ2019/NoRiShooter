(function () {
  $.ajax({
    type: "get",
    url: "player.html",
    success: function (html) {
      $(html).replaceAll("#music")
      $(`<link rel="stylesheet" href="css/player.css">`)
        .appendTo("head")
      // 定义歌单
      var list = [
        {
          m_name: "Into The Light",
          m_author: "Vgr",
          src: "./player/p02.png",
          url: "./player/Vgr - Into The Light.mp3",
        },
        {
          m_name: "Chip Damage",
          m_author: "ABXY",
          src: "./player/p01.png",
          url: "./player/ABXY - Chip Damage.mp3",
        },
        {
          m_name: "Ebb and Flow",
          m_author: "Cement City",
          src: "./player/p02.png",
          url: "./player/Cement City - Ebb and Flow.mp3",
        },
        {
          m_name: "イマ・ヌラネバー!",
          m_author: "テンタクルズ",
          src: "./player/p01.png",
          url: "./player/テンタクルズ - イマ・ヌラネバー!.mp3",
        },
        {
          m_name: "ウルトラ・カラーパルス",
          m_author: "テンタクルズ",
          src: "./player/p01.png",
          url: "./player/テンタクルズ - ウルトラ・カラーパルス.mp3",
        },
        {
          m_name: "フルスロットル・テンタクル",
          m_author: "テンタクルズ",
          src: "./player/p01.png",
          url: "./player/テンタクルズ - フルスロットル・テンタクル.mp3",
        },
        {
          m_name: "フレンド・フロム・ファラウェイ",
          m_author: "テンタクルズ",
          src: "./player/p01.png",
          url: "./player/テンタクルズ - フレンド・フロム・ファラウェイ.mp3",
        },
        {
          m_name: "リップル・リフレイン",
          m_author: "テンタクルズ",
          src: "./player/p01.png",
          url: "./player/テンタクルズ - リップル・リフレイン.mp3",
        },
        {
          m_name: "Don't Slip",
          m_author: "峰岸透",
          src: "./player/p03.png",
          url: "./player/峰岸透 - Don't Slip.mp3",
        },
        {
          m_name: "Endolphin Surge",
          m_author: "峰岸透",
          src: "./player/p03.png",
          url: "./player/峰岸透 - Endolphin Surge.mp3",
        },
        {
          m_name: "Inkoming!",
          m_author: "峰岸透",
          src: "./player/p03.png",
          url: "./player/峰岸透 - Inkoming!.mp3",
        },
        {
          m_name: "Now or Never!",
          m_author: "峰岸透",
          src: "./player/p03.png",
          url: "./player/峰岸透 - Now or Never!.mp3",
        },
        {
          m_name: "Undertow",
          m_author: "峰岸透",
          src: "./player/p03.png",
          url: "./player/峰岸透 - Undertow.mp3",
        },
        {
          m_name: "Seafoam Shanty 荒波ロデオ",
          m_author: "永松亮",
          src: "./player/p03.png",
          url: "./player/永松亮 - Seafoam Shanty ～荒波ロデオ～.mp3",
        },
        {
          m_name: "Shipwreckin 沈まばもろとも",
          m_author: "永松亮",
          src: "./player/p03.png",
          url: "./player/永松亮 - Shipwreckin' ～沈まばもろとも～.mp3",
        },
        {
          m_name: "可憐なタクティクス",
          m_author: "永松亮",
          src: "./player/p03.png",
          url: "./player/永松亮 - 可憐なタクティクス.mp3",
        },
      ]

      var vm = new Vue({
        el: "#music",
        data: {
          list,
          music_i: 0,
          now_time: 0,
          total: 0,
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
          total_time() {
            let miu = Math.floor(this.total / 60).toFixed(0)
            let sec = Math.ceil(this.total % 60)
            sec = sec >= 10 ? sec : "0" + sec
            let total_time = miu + ":" + sec
            return total_time
          },
          minues() {
            return Math.floor(this.now_time / 60).toFixed(0)
          },
          seconds() {
            var seconds = Math.ceil(this.now_time % 60)
            seconds = seconds >= 10 ? seconds : "0" + seconds
            return seconds
          },
          range_style() {
            return {
              width: this.now_time / this.total * 300 + "px"
            }
          },
        },
      })
      var m_audio = document.getElementById("audio");
      // 音量30%
      m_audio.volume = 0.5;
      m_audio.addEventListener("canplay", function () {
        time = Math.floor(audio.duration);
        // console.log(time)
        vm.total = time
      })
      var m_timer;
      function play() {
        clearInterval(m_timer)
        var total = vm.total
        m_timer = setInterval(() => {
          // 修改歌曲已播放时间
          vm.now_time = Math.ceil(m_audio.currentTime)
          if (vm.now_time >= total && total!=0) {
            // 0.5秒后下一首
            setTimeout(() => {
              vm.m_next()
            }, 500)
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
        audio.currentTime = vm.total * (left) / 300
        vm.now_time = Math.ceil(m_audio.currentTime)
      }
      m_range.onmousemove = function (e) {
        if (m_range_move) {
          var left = e.offsetX
          audio.currentTime = vm.total * (left) / 300
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
          music.style.left = left - music_X + 310 + "px"
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
