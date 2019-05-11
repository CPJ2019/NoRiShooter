(function () {
	//注册部分

	// 用户名是否通过
	var uname_pass = 0;

	// 密码是否通过
	var upwd_pass = 0;

	// 二次密码是否通过 
	var reupwd_pass = 0;

	// 邮箱是否通过
	var email_pass = 0;

	// 手机号是否通过
	var phone_pass = 0;

	// 自动跳转定时器
	var auto_skip = null;

	// 注册用户提示
	uname.onfocus = function () {
		// 修改提示内容
		uname_msg.innerHTML = "6到11位字母数字组合";
	};

	// 注册密码提示
	upwd.onfocus = function () {
		upwd_msg.innerHTML = "8到16位字母数字组合";
	};

	// 重输密码提示
	reupwd.onfocus = function () {
		reupwd_msg.innerHTML = "再输入一次同样的密码";
	};

	// 注册邮箱提示
	email.onfocus = function () {
		email_msg.innerHTML = "填写邮箱,例如QQ邮箱,网易邮箱"
	};

	// 注册手机提示
	phone.onfocus = function () {
		phone_msg.innerHTML = "请输入你的手机号码"
	};

	//验证函数
	var reg_check = function (reg, text1, text2, text3, ) {
		var input = this;
		var msg = this.nextElementSibling;
		if (input.value == "") {
			input.className = "nopass";
			msg.innerHTML = text1;
			return 0;
		} else if (reg.test(input.value)) {
			input.className = "pass";
			msg.innerHTML = text2;
			return 1;
		} else {
			input.className = "nopass";
			msg.innerHTML = text3;
			return 0;
		}
	}

	// 注册用户名重复验证
	var uname_repeat = function () {
		var xhr = new XMLHttpRequest();
		var url = `/user/unamecheck?uname=${this.value}`;
		xhr.open("get", url, true);
		xhr.send(null);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				console.log('调用查询重名')
				var result = xhr.responseText;
				if (result === "1") {
					uname.className = "pass";
					uname_msg.innerHTML = "用户名可以使用";
					uname_pass = 1;
				} else {
					uname.className = "nopass";
					uname_msg.innerHTML = "用户名已经使用";
					uname_pass = 0;
				}
			}
		}
	};

	//注册用户名验证
	uname.onblur = uname_check = function () {
		var reg = /^[\w_-]{1,11}$/;
		var text1 = "*用户名不能为空";
		var text2 = "";
		var text3 = "*用户名不合法";
		// 如果用户名格式合法就查询重名
		reg_check.call(this, reg, text1, text2, text3) && uname_repeat.call(this);

	};

	//注册密码验证
	upwd.onblur = upwd_check = function () {
		var reg = /^[\w_-]{1,16}$/
		var text1 = "*密码不能为空";
		var text2 = "密码可以使用";
		var text3 = "*密码格式不正确";
		upwd_pass = reg_check.call(this, reg, text1, text2, text3)
	};

	//重输密码验证
	reupwd.onblur = reupwd_check = function () {
		if (reupwd.value == upwd.value) {
			reupwd.className = "pass";
			reupwd_msg.innerHTML = "两次输入密码一致";
			reupwd_pass = 1;
		} else {
			var reg = /^[\w]{1000}$/
			var text1 = "*密码不能为空";
			var text2 = "";
			var text3 = "*两次输入密码不一致";
			reupwd_pass = reg_check.call(this, reg, text1, text2, text3)
		}
	};

	//注册邮箱验证
	email.onblur = email_check = function () {
		var reg = /^[\w]+([-_.][\w\d]+)*@([\w]+[-_.])+[\w]{2,4}$/;
		var text1 = "*邮箱不能为空";
		var text2 = "邮箱可以使用";
		var text3 = "*请输入正确的邮箱";
		email_pass = reg_check.call(this, reg, text1, text2, text3)
	};

	//注册手机验证
	phone.onblur = phone_check = function () {
		var reg = /^1[34578]\d{9}$/;
		var text1 = "*手机号码不能为空";
		var text2 = "手机号码可以使用";
		var text3 = "*请输入正确的手机号码";
		phone_pass = reg_check.call(this, reg, text1, text2, text3)
	};
	//注册按钮验证
	btn.onclick = function () {
		// 判定是否可以注册
		if (!uname_pass) {
			uname_check.call(uname);
			return;
		}
		if (!upwd_pass) {
			upwd_check.call(upwd);
			return;
		}
		if (!reupwd_pass) {
			reupwd_check.call(reupwd);
			return;
		}
		if (!email_pass) {
			email_check.call(email);
			return;
		}
		if (!phone_pass) {
			phone_check.call(phone);
			return;
		}
		// 获取性别的值
		var sex = document.querySelector("div.sex input:checked").value
		// 创建异步
		var xhr = new XMLHttpRequest();
		xhr.open("post", "/user/reg", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		var FormData = `uname=${uname.value}&upwd=${upwd.value}&email=${email.value}&phone=${phone.value}&sex=${sex}`;
		xhr.send(FormData);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var result = xhr.responseText;
				// 显示跳转框
				alert_div.style.display = "block";
				// 跳转读秒
				var t = 5;
				show.innerHTML = t;
				auto_skip = setInterval(function () {
					t--;
					if (t == 0) {
						window.location.href = `user_login.html#form`
					} else {
						show.innerHTML = t;
					}
				}, 1000)
			}
		}
	};
	// 停止自动跳转
	var stop_skip = document.querySelector("#alert_div>div:first-child");
	stop_skip.onclick = function () {
		clearInterval(auto_skip)
		alert_div.style.display = "none";
		// 提示用户名被使用
		uname.className = "nopass";
		uname_msg.innerHTML = "用户名已经使用";
		uname_pass = 0;
	}
})()