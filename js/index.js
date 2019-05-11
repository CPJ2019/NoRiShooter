(() => {
	//轮播图部分
	// 定义原始角度
	var y_angle = -3600;
	// 定义定时器
	var autotimer = null;
	// 旋转
	banner_rotate = function () {
		// console.log(`现在盒子角度为${y_angle}`);
		banner_box.style.transform = `rotateY(${y_angle}deg`;
	};
	// 跳转指示
	banner_point = function () {
		// console.log(`现在是banner${Math.abs((this.y_angle%360)/60)+1}`);
		// 获取指示圈
		var banner_to = document.getElementById("banner_to")
		var point = banner_to.getElementsByTagName("button")
		// 跳转的点变色,其他变回本色
		// Math.abs((y_angle % 360) / 60的值为盒子显示的面 0是第一面 与point[0]第一个点相对应
		for (var i = 0; i < 6; i++) {
			if (i == (Math.abs((y_angle % 360) / 60))) {
				point[i].style.background = "#CCFFFF";
			} else {
				point[i].style.background = "#FF99CC";
			}
		}
	};
	// 轮播自动
	banner_auto = function () {
		autotimer = setInterval(() => {
			y_angle -= 60;
			banner_rotate();
			banner_point();
		}, 3000)
	};
	// 整合函数 旋转+指示器+重新设置自动旋转定时器
	dobanner = function () {
		banner_rotate()
		banner_point()
		banner_auto()
	};
	// 轮播左转
	banner_to_left.onclick = function () {
		clearInterval(autotimer)
		y_angle += 60;
		dobanner.call();
	};
	// 轮播右转
	banner_to_right.onclick = function () {
		clearInterval(autotimer)
		y_angle -= 60;
		dobanner.call();
	};
	// 点击切换页
	// 获取需要点击的圈的父级ul  利用冒泡
	var banner_to = document.getElementById("banner_to")
	// 绑定点击函数 
	banner_to.onclick = function (e) {
		var btn = e.target;
		// 判定是否点击到的是button标签
		if (btn.nodeName === "BUTTON") {
			// 获取当前指示位置 value=1就是盒子banner1应该展示 盒子旋转360*n-0deg
			var deg = (btn.value - 1) * 60;
			// 清除自动轮播
			clearInterval(autotimer);
			// 获取当前圈数向上取整再乘以360得到初始角度,并让盒子旋转到应该显示的一面 使旋转更加平滑
			y_angle = Math.ceil(y_angle / 360) * 360 - deg;
			// 做banner动作
			dobanner.call();
		}
	}
	// 网页自动加载
	window.onload = banner_auto()
})()