// 自动加载
function auto_load(){
	uname_check()
	upwd_check()
}
//登录部分
// 用户名是否为空
var uname_pass=0;
// 密码是否为空
var upwd_pass=0;
// 全局自动跳转计时器
var auto_skip;
// 按钮部分
// function btn_check(){
// 	if(upwd_pass&&uname_pass){
// 		document.getElementById("btn").disabled=false;
// 	}else{
// 		document.getElementById("btn").disabled=true;
// 	}
// }
//网页验证用户名是否为空
function uname_check(){
	if(uname.value.length!=0){
		uname_msg.innerHTML="&nbsp;";
		uname_pass=1;
		// btn_check() 
	}else{
		uname_msg.innerHTML="*用户名不能为空";
		uname_pass=0;
		// btn_check()
	}
}
//网页验证密码是否为空
function upwd_check(){
	if(upwd.value.length!=0){
		upwd_msg.innerHTML="&nbsp;";
		upwd_pass=1;
		// btn_check()
	}else{
		upwd_msg.innerHTML="*密码不能为空";
		upwd_pass=0;
		// btn_check()
	}
}
//登录验证
function login_check(){
	if(!uname_pass) uname_check();
	if(!upwd_pass) upwd_check();
	if(uname_pass && upwd_pass){
		var xhr=new XMLHttpRequest();
		var url=`/user/login?uname=${uname.value}&upwd=${upwd.value}`;
		xhr.open("get",url,true);
		xhr.send(null);
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200){
				var result=xhr.responseText;
				var code=Number(result);
				switch(code){
					case 0:
						alert("密码错误");
						break;
					case 1:
						// alert("登陆成功");
						// var tohref=`index.html?uname=${uname.value}`;
						// console.log(tohref)
						// 显示跳转框
						show.innerHTML=5;
						var alert_div=document.getElementById("alert")
						alert_div.style.display="block";
						// 跳转读秒
						var t=4;
				   	auto_skip=setInterval(function(){
							if(t==0){
								window.location.href=`index.html?uname=${uname.value}`
							}else{
								show.innerHTML=t;
							}
							t--;
						},1000)
						break;
					case 2:
						alert("用户名不存在");
						break;
				}				
			}
		}
	}else{
		alert("请输入正确信息")
	}
}
// 停止自动跳转
function stop_skip(){
	clearTimeout(auto_skip);
	var alert_div=document.getElementById("alert")
	alert_div.style.display="none";
	return;
}	
//直接跳转
function skip(){
	window.location.href=`index.html?uname=${uname.value}`
} 