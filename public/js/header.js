$.ajax({
	url: "header.html",
	type: "get",
	success: function (html) {
		$(html).replaceAll("#header")
		$(`<link rel="stylesheet" href="css/header.css">`)
			.appendTo("head")
		// 获取登录名
		var urlParams = new URLSearchParams(location.search);
		var uname = urlParams.get("uname")
		if (uname) {
			console.log(uname + "登录");
			var uname = uname.slice(0, 4);
			var login_msg=document.getElementById("login_msg")
			login_msg.innerHTML = `欢迎回来 <a href="javascript:;" class="login_uname">${uname}</a>`;
			var reg_msg=document.getElementById("reg_msg")
			reg_msg.innerHTML = `<a href="#" title="点击注销用户">注销</a>`;
		}
	}
})