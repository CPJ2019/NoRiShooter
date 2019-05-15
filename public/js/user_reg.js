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

	// 获取需要绑定函数的表单元素
	// 用户名
	var uname = document.getElementById("uname")
	// 密码
	var upwd = document.getElementById("upwd")
	// 二次密码
	var reupwd = document.getElementById("reupwd")
	// 邮箱
	var email = document.getElementById("email")
	// 手机
	var phone = document.getElementById("phone")

	//定义正则以及提示文字的数组对象
	var reg_data = [{ // 用户名
			reg: /^[\w_-]{1,11}$/, // 正则验证
			text1: "6到11位字母数字组合", // 聚焦提示文字
			text2: "*用户名不能为空", // 为空提示
			text3: "", // 通过提示文字
			text4: "*用户名不合法" // 非法提示文字
		},
		{ // 密码
			reg: /^[\w_-]{1,16}$/,
			text1: "8到16位字母数字组合",
			text2: "*密码不能为空",
			text3: "密码可以使用",
			text4: "*密码格式不正确"
		},
		{ // 二次密码
			reg: /^[\w]{1000}$/,
			text1: "请再输入一次同样的密码",
			text2: "*密码不能为空",
			text3: "",
			text4: "*两次输入密码不一致"
		},
		{ // 邮箱
			reg: /^[\w]+([-_.][\w\d]+)*@([\w]+[-_.])+[\w]{2,4}$/,
			text1: "填写邮箱,例如QQ邮箱,网易邮箱",
			text2: "*邮箱不能为空",
			text3: "邮箱可以使用",
			text4: "*请输入正确的邮箱"
		},
		{ // 手机
			reg: /^1[34578]\d{9}$/,
			text1: "请输入你的手机号码",
			text2: "*手机号码不能为空",
			text3: "手机号码可以使用",
			text4: "*请输入正确的手机号码"
		},
	]

	// 获取所有需要绑定函数的表单元素input
	var inputs = document.querySelectorAll("input[required='']")
	// for (var input of inputs) {
	// 	input.onfocus = function () {
	// 		// 定义i  i为data下标
	// 		var i=this.getAttribute("data-num")-1;
	// 		var msg = this.nextElementSibling;
	// 		msg.innerHTML = reg_data[i].text1
	// 	}
	// }
	// let防止污染
	for (let i = 0; i < inputs.length; i++) {
		// i为inputs data 共同下标
		inputs[i].onfocus = function () {
			var msg = this.nextElementSibling;
			msg.innerHTML = reg_data[i].text1
		}
	}
	//验证函数
	var reg_check = function (i) {
		var input = this;
		var msg = this.nextElementSibling;
		if (input.value == "") {
			input.className = "nopass";
			msg.innerHTML = reg_data[i].text2;
			return 0;
		} else if (reg_data[i].reg.test(input.value)) {
			input.className = "pass";
			msg.innerHTML = reg_data[i].text3;
			return 1;
		} else {
			input.className = "nopass";
			msg.innerHTML = reg_data[i].text4;
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
					uname.nextElementSibling.innerHTML = "用户名可以使用";
					uname_pass = 1;
				} else {
					uname.className = "nopass";
					uname.nextElementSibling.innerHTML = "用户名已经使用";
					uname_pass = 0;
				}
			}
		}
	};

	//注册用户名验证
	uname.onblur = uname_check = function () {
		var i = 0;
		// 如果用户名格式合法就查询重名
		reg_check.call(this, i) && uname_repeat.call(this);
	};

	//注册密码验证
	upwd.onblur = upwd_check = function () {
		var i = 1
		upwd_pass = reg_check.call(this, i)
	};

	//重输密码验证
	reupwd.onblur = reupwd_check = function () {
		if (reupwd.value == upwd.value && reupwd.value != "") {
			reupwd.className = "pass";
			reupwd.nextElementSibling.innerHTML = "两次输入密码一致";
			reupwd_pass = 1;
		} else {
			var i = 2;
			reupwd_pass = reg_check.call(this, i)
		}
	};

	//注册邮箱验证
	email.onblur = email_check = function () {
		var i = 3;
		email_pass = reg_check.call(this, i)
	};

	//注册手机验证
	phone.onblur = phone_check = function () {
		var i = 4;
		phone_pass = reg_check.call(this, i)
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
		uname.nextElementSibling.innerHTML = "用户名已经使用";
		uname_pass = 0;
	}
})()