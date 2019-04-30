//注册部分
var reg = {
	// 用户名是否通过
	uname_pass: 0,
	// 密码是否通过
	upwd_pass: 0,
	// 二次密码是否通过 
	reupwd_pass: 0,
	// 邮箱是否通过
	email_pass: 0,
	// 手机号是否通过
	phone_pass: 0,
	// 自动跳转定时器
	auto_skip: null,
	// 注册用户名提示
	uname_tips: function () {
		// 修改提示字体颜色和内容
		uname_msg.style.color = "#0066FF";
		uname_msg.innerHTML = "6到11位字母数字组合";
	},
	//注册用户名重复验证
	uname_repeat: function () {
		var xhr = new XMLHttpRequest();
		var url = `/user/unamecheck?uname=${uname.value}`;
		xhr.open("get", url, true);
		xhr.send(null);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				// console.log('调用查询重名')
				var result = xhr.responseText;
				if (result === "1") {
					// 修改输入框边框颜色
					uname.style.borderColor = "#28a745";
					// 修改提示字体颜色和内容
					uname_msg.style.color = "#28a745";
					uname_msg.innerHTML = "用户名可以使用";
					// 用户名通过
					reg.uname_pass = 1;
				} else {
					uname.style.borderColor = "#dc3545";
					uname_msg.style.color = "#dc3545";
					uname_msg.innerHTML = "用户名已经使用";
					reg.uname_pass = 0;
				}
			}
		}
	},
	//注册用户名验证
	uname_check: function () {
		var t = /^[\w\d_-]{1,11}$/;
		if (uname.value == "") {
			uname.style.borderColor = "#dc3545";
			uname_msg.style.color = "#dc3545";
			uname_msg.innerHTML = "*用户名不能为空";
		} else if (t.test(uname.value)) {
			// 查询重名
			this.uname_repeat();
		} else {
			uname.style.borderColor = "#dc3545";
			uname_msg.style.color = "#dc3545";
			uname_msg.innerHTML = "*用户名不合法";
			this.uname_pass = 0;
		}
	},
	//注册密码提示
	upwd_tips: function () {
		upwd_msg.style.color = "#0066FF";
		upwd_msg.innerHTML = "8到16位字母数字组合";
	},
	//注册密码验证
	upwd_check: function () {
		var t = /^[\w\d_-]{1,16}$/
		if (upwd.value == "") {
			upwd.style.borderColor = "#dc3545";
			upwd_msg.style.color = "#dc3545";
			upwd_msg.innerHTML = "*密码不能为空";
			this.upwd_pass = 0;
		} else if (t.test(upwd.value)) {
			upwd.style.borderColor = "#28a745";
			upwd_msg.style.color = "#28a745";
			upwd_msg.innerHTML = "密码可以使用";
			this.upwd_pass = 1;
		} else {
			upwd.style.borderColor = "#dc3545";
			uupwd_msg.style.color = "#dc3545";
			upwd_msg.innerHTML = "*密码格式不正确"
			this.upwd_pass = 0;
		}
	},
	//重输密码提示
	reupwd_tips: function () {
		reupwd_msg.style.color = "#0066FF";
		reupwd_msg.innerHTML = "再输入一次同样的密码";
	},
	//重输密码验证
	reupwd_check: function () {
		if (reupwd.value == "") {
			reupwd.style.borderColor = "#dc3545";
			reupwd_msg.style.color = "#dc3545";
			reupwd_msg.innerHTML = "*密码不能为空";
			this.reupwd_pass = 0;
		} else if (reupwd.value == upwd.value) {
			reupwd.style.borderColor = "#28a745";
			reupwd_msg.style.color = "#28a745";
			reupwd_msg.innerHTML = "两次输入密码一致";
			this.reupwd_pass = 1;
		} else {
			reupwd.style.borderColor = "#dc3545";
			reupwd_msg.style.color = "#dc3545";
			reupwd_msg.innerHTML = "*两次输入密码不一致";
			this.reupwd_pass = 0;
		}
	},
	//注册邮箱提示
	email_tips: function () {
		email_msg.style.color = "#0066FF";
		email_msg.innerHTML = "填写邮箱,例如QQ邮箱,网易邮箱"
	},
	//注册邮箱验证
	email_check: function () {
		//console.log(1)
		var t = /^[\w\d]+([-_.][\w\d]+)*@([\w\d]+[-_.])+[\w\d]{2,4}$/;
		if (email.value == "") {
			email.style.borderColor = "#dc3545";
			email_msg.style.color = "#dc3545";
			email_msg.innerHTML = "*邮箱不能为空";
			this.email_pass = 0;
		} else if (t.test(email.value)) {
			email.style.borderColor = "#28a745";
			email_msg.style.color = "#28a745";
			email_msg.innerHTML = "邮箱可以使用";
			this.email_pass = 1;
		} else {
			email.style.borderColor = "#dc3545";
			email_msg.style.color = "#dc3545";
			email_msg.innerHTML = "*请输入正确的邮箱";
			this.email_pass = 0;
		}
	},
	//注册手机提示
	phone_tips: function () {
		phone_msg.style.color = "#0066FF";
		phone_msg.innerHTML = "请输入你的手机号码"
	},
	//注册手机验证
	phone_check: function () {
		var t = /^1[34578]\d{9}$/;
		if (phone.value == "") {
			phone.style.borderColor = "#dc3545";
			phone_msg.style.color = "#dc3545";
			phone_msg.innerHTML = "*手机号码不能为空";
			this.phone_pass = 0;
		} else if (t.test(phone.value)) {
			phone.style.borderColor = "#28a745";
			phone_msg.style.color = "#28a745";
			phone_msg.innerHTML = "手机号码可以使用";
			this.phone_pass = 1;
		} else {
			phone.style.borderColor = "#dc3545";
			phone_msg.style.color = "#dc3545";
			phone_msg.innerHTML = "*请输入正确的手机号码";
			this.phone_pass = 0;
		}
	},
	//注册按钮验证
	reg_check: function () {
		// 判定是否可以注册
		if (!this.uname_pass) {
			this.uname_check();
			return;
		}
		if (!this.upwd_pass) {
			this.upwd_check();
			return;
		}
		if (!this.reupwd_pass) {
			this.reupwd_check();
			return;
		}
		if (!this.email_pass) {
			this.email_check();
			return;
		}
		if (!this.phone_pass) {
			this.phone_check();
			return;
		}
		console.log(2);
		// 获取性别的值
		var sex = document.getElementsByName("Sex");
		for (i = 0; i < sex.length; i++) {
			if (sex[i].checked) {
				sex = sex[i].value;
			}
		}
		var xhr = new XMLHttpRequest();
		var url = `/user/reg?uname=${uname.value}&upwd=${upwd.value}&email=${email.value}&phone=${phone.value}&sex=${sex}`;
		xhr.open("get", url, true);
		xhr.send(null);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var result = xhr.responseText;
				// 显示跳转框
				show.innerHTML = 5;
				alert_div.style.display = "block";
				// 跳转读秒
				var t = 4;
				reg.auto_skip = setInterval(function () {
					if (t == 0) {
						window.location.href = `user_login.html#form`
					} else {
						show.innerHTML = t;
					}
					t--;
				}, 1000)
			}
		}
	},
	// 停止自动跳转
	stop_skip: function () {
		clearInterval(this.auto_skip);
		alert_div.style.display = "none";
		// 提示用户名被使用
		uname.style.borderColor = "#dc3545";
		uname_msg.style.color = "#dc3545";
		uname_msg.innerHTML = "用户名已经使用";
		this.uname_pass = 0;
	}
}