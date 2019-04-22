// 获取登录名
function person_msg(){
  var urlParams=new URLSearchParams(location.search);
	var uname=urlParams.get("uname")
	console.log(uname+"登录");
  if(uname){
  	var uname=uname.slice(0,4);
 	  login_msg.innerHTML=`欢迎回来 <span class="login_uname">${uname}</span>`;
    reg_msg.innerHTML=`<a href="#" title="点击登录">个人中心</a>`;
	}
}