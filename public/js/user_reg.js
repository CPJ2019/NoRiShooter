//注册部分
var uname_pass = 0;
var uname_repeat_pass = 0;
var upwd_pass = 0;
var reupwd_pass = 0;
var email_pass = 0;
var phone_pass = 0;
var auto_skip;
//注册用户名提示
function uname_tips() {
	uname_msg.style.color = "#0066FF";
	uname_msg.innerHTML = "6到11位字母数字组合";
}
//注册用户名重复验证
function uname_repeat() {
	var xhr = new XMLHttpRequest();
	var url = `/user/unamecheck?uname=${uname.value}`;
	xhr.open("get", url, true);
	xhr.send(null);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			console.log('调用查询重名')
			var result = xhr.responseText;
			if (result === "1") {
				uname_msg.style.color = "#28a745";
				uname.style.borderColor = "#28a745";
				uname_msg.innerHTML = "用户名可以使用";
				uname_repeat_pass = 1;
			} else {
				uname_msg.style.color = "#dc3545";
				uname.style.borderColor = "#dc3545";
				uname_msg.innerHTML = "用户名已经使用";
				uname_repeat_pass = 0;
			}
		}
	};
}
//注册用户名验证
function uname_check() {
	var t = /^[a-zA-Z0-9_-]{1,11}$/;
	if (uname.value == "") {
		uname_msg.style.color = "#dc3545"
		uname.style.borderColor = "#dc3545";
		uname_msg.innerHTML = "*用户名不能为空";
	} else if (t.test(uname.value)) {
		uname_pass = 1;
		uname_repeat();
	} else {
		uname_msg.style.color = "#dc3545"
		uname.style.borderColor = "#dc3545";
		uname_msg.innerHTML = "*用户名不合法";
		uname_pass = 0;
	}
}
//注册密码提示
function upwd_tips() {
	upwd_msg.style.color = "#0066FF";
	upwd_msg.innerHTML = "8到16位字母数字组合";
}
//注册密码验证
function upwd_check() {
	var t = /^[a-zA-Z0-9_-]{1,16}$/
	var length = upwd.value.length;
	if (length == 0) {
		upwd_msg.style.color = "#dc3545";
		upwd.style.borderColor = "#dc3545";
		upwd_msg.innerHTML = "*密码不能为空";
		upwd_pass = 0;
	} else if (t.test(upwd.value)) {
		upwd_msg.style.color = "#28a745";
		upwd.style.borderColor = "#28a745";
		upwd_msg.innerHTML = "密码可以使用";
		upwd_pass = 1;
	} else {
		uupwd_msg.style.color = "#dc3545"
		upwd.style.borderColor = "#dc3545";
		upwd_msg.innerHTML = "*密码格式不正确"
		upwd_pass = 0;
	}
}
//重输密码提示
function reupwd_tips() {
	reupwd_msg.style.color = "#0066FF";
	reupwd_msg.innerHTML = "再输入一次同样的密码";
}
//重输密码验证
function reupwd_check() {
	if (reupwd.value == "") {
		reupwd_msg.style.color = "#dc3545";
		reupwd.style.borderColor = "#dc3545";
		reupwd_msg.innerHTML = "*密码不能为空";
		reupwd_pass = 0;
	} else if (reupwd.value == upwd.value) {
		
		reupwd_msg.style.color = "#28a745";
		reupwd.style.borderColor = "#28a745";
		reupwd_msg.innerHTML = "两次输入密码一致";
		reupwd_pass = 1;
	} else {
		reupwd_msg.style.color = "#dc3545";
		reupwd.style.borderColor = "#dc3545";
		reupwd_msg.innerHTML = "*两次输入密码不一致";
		reupwd_pass = 0;
	}
}
//注册邮箱提示
function email_tips() {
	email_msg.style.color = "#0066FF";
	email_msg.innerHTML = "填写邮箱,例如QQ邮箱,网易邮箱"
}
//注册邮箱验证
function email_check() {
	//console.log(1)
	var t = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-_.])+[A-Za-z\d]{2,4}$/;
	if (email.value == "") {
		email_msg.style.color = "#dc3545";
		email.style.borderColor = "#dc3545";
		email_msg.innerHTML = "*邮箱不能为空";
		email_pass = 0;
	} else if (t.test(email.value)) {
		email_msg.style.color = "#28a745";
		email.style.borderColor = "#28a745";
		email_msg.innerHTML = "邮箱可以使用";
		email_pass = 1;
	} else {
		email_msg.style.color = "#dc3545";
		email.style.borderColor = "#dc3545";
		email_msg.innerHTML = "*请输入正确的邮箱";
		email_pass = 0;
	}
}
//注册手机提示
function phone_tips() {
	phone_msg.style.color = "#0066FF";
	phone_msg.innerHTML = "请输入你的手机号码"
}
//注册手机验证
function phone_check() {
	var t = /^1[34578]\d{9}$/;
	if (phone.value == "") {
		phone_msg.style.color = "#dc3545";
		phone.style.borderColor = "#dc3545";
		phone_msg.innerHTML = "*手机号码不能为空";
		phone_pass = 0;
	} else if (t.test(phone.value)) {
		phone_msg.style.color = "#28a745";
		phone.style.borderColor = "#28a745";
		phone_msg.innerHTML = "手机号码可以使用";
		phone_pass = 1;
	} else {
		phone_msg.style.color = "#dc3545";
		phone.style.borderColor = "#dc3545";
		phone_msg.innerHTML = "*请输入正确的手机号码";
		phone_pass = 0;
	}
}

//注册按钮验证
function login_check() {
	// 判定是否可以注册
	if (!uname_pass) {
		uname_check();
		return;
	}
	if (!uname_repeat_pass) {
		return;
	}
	if (!upwd_pass) {
		upwd_check();
		return;
	}
	if (!reupwd_pass) {
		reupwd_check();
		return;
	}
	if (!email_pass) {
		email_check();
		return;
	}
	if (!phone_pass) {
		phone_check();
		return;
	}
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
			uname_repeat();
			// 显示跳转框
			show.innerHTML = 5;
			alert_div.style.display = "block";
			// 跳转读秒
			var t = 4;
			auto_skip = setInterval(function () {
				if (t == 0) {
					window.location.href = `user_login.html`
				} else {
					show.innerHTML = t;
				}
				t--;
			}, 1000)
		}
	}
}
// 停止自动跳转
function stop_skip() {
	clearInterval(auto_skip);
	alert_div.style.display = "none";
	return;
}