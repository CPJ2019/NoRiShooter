(() => {
	//盒子轮播图部分

	// 定义原始角度
	var y_angle = -3600;
	// 定义定时器
	var autotimer = null;

	// 旋转
	// 获取旋转盒子的元素
	var banner_box = document.getElementById("banner_box")
	banner_rotate = function () {
		// console.log(`现在盒子角度为${y_angle}`);
		banner_box.style.transform = `rotateY(${y_angle}deg`;
		// 获取指示器位置
		var banner = (y_angle % 360) / -60 + 1;
		// 修改指示器
		banner_point(banner);
	};
	// 跳转指示器
	banner_point = function (banner) {
		// console.log(`现在是banner${Math.abs((this.y_angle%360)/60)+1}`);
		// 获得需要active的bannner的位置
		var i = banner
		// 获取指示圈
		var banner_to = document.getElementById("banner_to")
		// 获取已经是active状态的指示btn
		var point_has_active = banner_to.querySelector('button.active')
		// 重置
		point_has_active.className = "";
		// 获取应该显示为active的指示btn
		var banner_active = banner_to.querySelector(`button[value="${i}"]`)
		// 修改
		banner_active.className = "active";
	};
	// 轮播自动
	banner_auto = function () {
		autotimer = setInterval(() => {
			y_angle -= 60;
			banner_rotate();
		}, 3000)
	};
	// 轮播左右转
	// 指示器切换页
	// 获取需要父级元素banner  利用冒泡
	var banner = document.querySelector(".banner")
	// 绑定点击函数 
	banner.onclick = function (e) {
		var btn = e.target;
		// 判定是否点击到的是button标签
		if (btn.nodeName === "BUTTON") {
			console.log(btn.value)
			// 清除自动轮播
			clearInterval(autotimer)
			// 判断是否是左右按钮 非数字就是左右 数字就是指示器
			if (isNaN(btn.value)) {
				// +为右转 角度-60
				btn.value == "+" ? y_angle -= 60 : y_angle += 60;
			} else {
				// 获取当前指示位置 value=1就是盒子banner1应该展示 盒子旋转360*n-0deg
				var deg = (btn.value - 1) * 60;
				// 获取当前圈数向上取整再乘以360得到初始角度,并让盒子旋转到应该显示的一面 使旋转更加平滑
				y_angle = Math.ceil(y_angle / 360) * 360 - deg;
			}
			// 做banner动作
			banner_rotate()
			// 重新设置定时器
			banner_auto()
		}
	}

	// 微博轮播
	let weibo_auto;
	function w_banner() {
		let $weibo_b = $("div.weibo ul")
		weibo_auto = setInterval(() => {
			let $li = $weibo_b.children("li:first-child")
			// console.log($li)
			let $new_li = $li.clone()
			$li.css({
				width: 0,
				padding: 0
			})
			setTimeout(() => {
				$weibo_b.append($new_li)
				$li.remove();
			}, 500)
		}, 3000)
	}
	$("div.weibo ul").mouseenter(function () {
		clearInterval(weibo_auto)
	});
	$("div.weibo ul").mouseleave(function () {
		w_banner()
	});
	// 网页自动加载
	banner_auto()
	w_banner()
})()