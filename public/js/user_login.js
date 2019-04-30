//登录部分
var login = {
	// 用户名是否为空
	uname_pass: 0,
	// 密码是否为空
	upwd_pass: 0,
	// 自动跳转计时器
	auto_skip: null,
	// 用户名提示
	uname_tips: function () {
		uname_msg.style.color = "#0066FF";
		uname_msg.innerHTML = "请输入你的用户名";
	},
	//网页验证用户名是否为空
	uname_check: function () {
		if (uname.value.length != 0) {
			uname.style.borderColor = "#28a745";
			uname.style.padding = "5px 15px";
			uname_msg.style.color = "#28a745";
			uname_msg.innerHTML = "用户名通过";
			this.uname_pass = 1;
		} else {
			uname.style.borderColor = "#dc3545";
			uname.style.padding = "5px 15px";
			uname_msg.style.color = "#dc3545"
			uname_msg.innerHTML = "*用户名不能为空";
			this.uname_pass = 0;
		}
	},
	// 密码提示
	upwd_tips: function () {
		upwd_msg.style.color = "#0066FF";
		upwd_msg.innerHTML = "请输入你的密码";
	},
	//网页验证密码是否为空
	upwd_check: function () {
		if (upwd.value.length != 0) {
			upwd.style.borderColor = "#28a745";
			upwd.style.padding = "5px 15px";
			upwd_msg.style.color = "#28a745";
			upwd_msg.innerHTML = "密码通过";
			this.upwd_pass = 1;
		} else {
			upwd.style.borderColor = "#dc3545";
			upwd.style.padding = "5px 15px";
			upwd_msg.style.color = "#dc3545"
			upwd_msg.innerHTML = "*密码不能为空";
			this.upwd_pass = 0;
		}
	},
	//登录验证
	login_check: function () {
		if (!this.uname_pass) {
			this.uname_check();
			return;
		}
		if (!this.upwd_pass) {
			this.upwd_check();
			return;
		}
		var xhr = new XMLHttpRequest();
		xhr.open("post","/user/login", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		var formdata = `uname=${uname.value}&upwd=${upwd.value}`
		xhr.send(formdata);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var result = xhr.responseText;
				var code = Number(result);
				switch (code) {
					case 0:
						upwd.style.borderColor = "#dc3545";
						upwd_msg.style.color = "#dc3545";
						upwd_msg.innerHTML = "*密码错误";
						this.upwd_pass = 0;
						break;
					case 1:
						login.start_skip();
						break;
					case 2:
						uname.style.borderColor = "#dc3545";
						uname_msg.style.color = "#dc3545"
						uname_msg.innerHTML = "*用户名不存在";
						this.uname_pass = 0;
						break;
				}
			}
		}
	},
	// 开始自动跳转
	start_skip: function () {
		// 显示跳转框
		alert_div.style.display = "block";
		// 出现读秒
		show.innerHTML = 5;
		// 读秒开始 
		var t = 4;
		this.auto_skip = setInterval(function () {
			if (t == 0) {
				// 读秒结束跳转
				window.location.href = `index.html?uname=${uname.value}`
			} else {
				// 更改剩下秒数
				show.innerHTML = t;
			}
			t--;
		}, 1000)
	},
	// 停止自动跳转
	stop_skip: function () {
		clearInterval(this.auto_skip)
		alert_div.style.display = "none";
		return;
	}
}

//直接跳转
function skip() {
	console.log(1)
	window.location.href = `index.html?uname=${uname.value}`
}