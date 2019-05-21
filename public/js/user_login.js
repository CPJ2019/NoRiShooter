(function () {
	//登录部分
	// 用户名是否为空
	var uname_pass = 0;
	// 密码是否为空
	var upwd_pass = 0;
	// 自动跳转计时器
	var auto_skip = null;
	// 获取弹窗
	var alert_div = document.getElementById("alert_div")
	// 获取需要绑定函数的表单元素input
	var uname = document.getElementById("uname")
	var upwd = document.getElementById("upwd")
	// 用户名提示
	uname.onfocus = function () {
		this.nextElementSibling = "请输入你的用户名";
	};
	// 密码提示
	upwd.onfocus = function () {
		this.nextElementSibling = "请输入你的密码";
	};
	//网页验证用户名是否正确
	uname.onblur = uname_check = function () {
		if (uname.value.length != 0) {
			uname.className = "pass";
			uname.style.padding = "5px 15px";
			uname.nextElementSibling.innerHTML = "用户名通过";
			uname_pass = 1;
		} else {
			uname.className = "nopass";
			uname.style.padding = "5px 15px";
			uname.nextElementSibling = "*用户名不能为空";
			uname_pass = 0;
		}
	}
	//网页验证密码是否为空
	upwd.onblur = function () {
		if (upwd.value.length != 0) {
			upwd.className = "pass";
			upwd.style.padding = "5px 15px";
			upwd.nextElementSibling = "密码通过";
			upwd_pass = 1;
		} else {
			upwd.className = "nopass";
			upwd.style.padding = "5px 15px";
			upwd.nextElementSibling = "*密码不能为空";
			upwd_pass = 0;
		}
	}
	//登录验证
	btn.onclick = function () {
		if (!uname_pass) {
			uname_check.call(uname);
		}
		if (!upwd_pass) {
			upwd_check.call(upwd);
		}
		if (uname_pass && upwd_pass) {
			var xhr = new XMLHttpRequest();
			xhr.open("post", "/user/login", true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			var formdata = `uname=${uname.value}&upwd=${upwd.value}`
			xhr.send(formdata);
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4 && xhr.status == 200) {
					var result = xhr.responseText;
					var code = Number(result);
					switch (code) {
						case 0:
							upwd.className = "nopass";
							upwd.nextElementSibling.innerHTML = "*密码错误";
							upwd_pass = 0;
							break;
						case 1:
							// 自动跳转
							// 显示跳转框
							alert_div.className="active"
							// 出现读秒
							var t = 5
							show.innerHTML = t;
							// 读秒开始 
							auto_skip = setInterval(function () {
								console.log(t)
								t--;
								if (t == 0) {
									// 读秒结束跳转
									window.location.href = `index.html?uname=${uname.value}`
								} else {
									// 更改剩下秒数
									show.innerHTML = t;
								}
							}, 1000)
							break;
						case 2:
							uname.className = "nopass";
							uname.nextElementSibling.innerHTML = "*用户名不存在";
							uname_pass = 0;
							break;
					}
				}
			}
		}
	}
	// 停止自动跳转
	var stop_skip = document.querySelector("#alert_div>div:first-child")
	stop_skip.onclick = function () {
		clearInterval(auto_skip)
		alert_div.className=""
	}
	//直接跳转
	var skip = document.querySelector("#alert_div a");
	skip.onclick = function () {
		window.location.href = `index.html?uname=${uname.value}`
	}
})()