//轮播图部分
var banner = {
	// 定义原始角度
	y_angle: -3600,
	// 定义定时器
	autotimer: null,
	// 旋转
	banner_rotate: function () {
		console.log(`现在盒子角度为${this.y_angle}`);
		(() => {
			document.getElementById("banner-box").style.transform = `rotateY(${this.y_angle}deg`;
		})()
	},
	// 跳转指示
	banner_point: function () {
		console.log(`现在是banner${Math.abs((this.y_angle%360)/60)+1}`);
		for(var i=1;i<=6;i++){
			if(i==(Math.abs((this.y_angle%360)/60)+1)){
				document.getElementById(`banner_page_${(Math.abs((this.y_angle%360)/60)+1)}`).style.background="#CCFFFF"
		}else{
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
	// 轮播左转
	banner_to_left: function () {

		(() => {
			clearInterval(this.autotimer)
			this.y_angle += 60;
			this.banner_rotate()
			this.banner_point()
			this.banner_auto()
			return;
		})()
	},
	// 轮播右转
	banner_to_right: function () {
		(() => {
			clearInterval(this.autotimer)
			this.y_angle -= 60;
			this.banner_rotate()
			this.banner_point()
			this.banner_auto()
			return;
		})()
	},
	// 点击切换第一页
	banner_to_1: function () {
		console.log("切到第一页");
		(() => {
			clearInterval(this.autotimer)
			this.y_angle = Math.ceil(this.y_angle/360)*360;
			this.banner_rotate()
			this.banner_point()
			this.banner_auto()
		})()
	},
	// 点击切换第二页
	banner_to_2: function () {
		console.log("切到第二页");
		(() => {
			clearInterval(this.autotimer)
			this.y_angle =Math.ceil(this.y_angle/360)*360 -60;
			this.banner_rotate()
			this.banner_point()
			this.banner_auto()
		})()
	},
	// 点击切换第三页
	banner_to_3: function () {
		console.log("切到第三页");
		(() => {
			clearInterval(this.autotimer)
			this.y_angle =Math.ceil(this.y_angle/360)*360 -120;
			this.banner_rotate()
			this.banner_point()
			this.banner_auto()
		})()
	},
	// 点击切换第四页
	banner_to_4: function () {
		console.log("切到第四页");
		(() => {
			clearInterval(this.autotimer)
			this.y_angle =Math.ceil(this.y_angle/360)*360 -180;
			this.banner_rotate()
			this.banner_point()
			this.banner_auto()
		})()
	},
	// 点击切换第五页
	banner_to_5: function () {
		console.log("切到第五页");
		(() => {
			clearInterval(banner.autotimer)
			this.y_angle =Math.ceil(this.y_angle/360)*360 -240;
			this.banner_rotate()
			this.banner_point()
			this.banner_auto()
		})()
	},
	// 点击切换第六页
	banner_to_6: function () {
		console.log("切到六页");
		(() => {
			clearInterval(this.autotimer)
			this.y_angle =Math.ceil(this.y_angle/360)*360 -300;
			this.banner_rotate()
			this.banner_point()
			this.banner_auto()
		})()
	}
};
// 自动加载的内容
(() => {
	banner.banner_auto();
})()