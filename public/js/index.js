//轮播图部分
var banner = {
	// 定义原始角度
	y_angle: -3600,
	// 定义定时器
	autotimer: null,
	// 旋转
	banner_rotate: function () {
		// console.log(`现在盒子角度为${this.y_angle}`);
		(() => {
			banner_box.style.transform = `rotateY(${this.y_angle}deg`;
		})()
	},
	// 跳转指示
	banner_point: function () {
		// console.log(`现在是banner${Math.abs((this.y_angle%360)/60)+1}`);
		for (var i = 1; i <= 6; i++) {
			if (i == (Math.abs((this.y_angle % 360) / 60) + 1)) {
				document.getElementById(`banner_page_${(Math.abs((this.y_angle%360)/60)+1)}`).style.background = "#CCFFFF";
			} else {
				document.getElementById(`banner_page_${i}`).style.background = "#FF99CC";
			}
		}
	},
	//  轮播自动
	banner_auto: function () {
		this.autotimer = setInterval(() => {
			this.y_angle -= 60;
			this.banner_rotate();
			this.banner_point();
		}, 3000)
	},
	// 整合函数 旋转+指示器+重新设置自动旋转定时器
	dobanner: function () {
		this.banner_rotate()
		this.banner_point()
		this.banner_auto()
	},
	// 轮播左转
	banner_to_left: function () {
		(() => {
			clearInterval(this.autotimer)
			this.y_angle += 60;
			this.dobanner();
		})()
	},
	// 轮播右转
	banner_to_right: function () {
		(() => {
			clearInterval(this.autotimer)
			this.y_angle -= 60;
			this.dobanner();
		})()
	},
	// 点击切换页
	banner_to: function (angle) {
		// angle为实际显示角度
		console.log(`切到第${angle/60+1}页`);
		(() => {
			clearInterval(this.autotimer)
			// 获取当前圈数向上取整再乘以360得到初始角度,并让盒子旋转应该显示的角度 使旋转更加平滑
			this.y_angle = Math.ceil(this.y_angle / 360) * 360 - angle;
			this.dobanner();
		})()
	}
};
// 回顶部
function to_top() {
	(() => {
		// 防止还在回顶部的过程中重复设置定时器
		clearInterval(timer);
		var timer;
		// 当前屏幕滚动位置
		var target = document.documentElement.scrollTop;
		// 回到首页字样隐藏
		to_top_hover.style.display = "none";
		// 开始回滚图标的动画并保持最后一帧
		to_top_btn.style.animation = "totop1 0.2s 1 forwards";
		var timer = setInterval(function () {
			console.log(target);
			//做减速运动 每次回滚当前的10%
			//向上取整是为了当位置为<=10时 每次回滚距离都为1 可以使回滚位置能到达0
			target -= Math.ceil(target / 10);
			window.scrollTo(0, target);
			if (target == 0) {
				clearInterval(timer);
				// 回滚图标恢复原样
				to_top_btn.style.animation = "totop2 0.2s 1 forwards";
				// 恢复原样后回到首页字样重新显示 0.5s更舒适
				setTimeout(function () {
					to_top_hover.style.display = "block";
				}, 500)
				return;
			}
		}, 10);
	})()
}
// 自动加载的内容
(() => {
	window.onload = banner.banner_auto();
})()