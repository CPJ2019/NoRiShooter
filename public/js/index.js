// 自动加载的内容
function auto_load(){
	banner_auto();
	person_msg()
}
function person_msg(){
	var urlParams=new URLSearchParams(location.search);
	var uname=urlParams.get("uname")
	console.log(uname+"登录");
	if(uname){
		var uname=uname.slice(0,4);
		 login_msg.innerHTML=`欢迎回来 <span class="login_uname">${uname}</span>`;
		reg_msg.innerHTML=`<a ref="#" title="点击登录">个人中心</a>`;
	}
}
//轮播图部分
 // 定义全局原始角度
 var y_angle=3600;
 // 定义全局定时器
 var autotimer;
 // 轮播图向右判定
 function to_right_check(){
	 var now=y_angle%360;
	 switch(now){
		 case 60:
		 document.getElementById("banner-box").style.animation="toright_banner1 0.3s 0s 1 ease-out";
		 document.getElementById("banner-box").style.animationFillMode="both";
		 break;
		 case 120:
		 document.getElementById("banner-box").style.animation="toright_banner2 0.3s 0s 1 ease-out";
		 document.getElementById("banner-box").style.animationFillMode="both";
		 break;
		 case 180:
		 document.getElementById("banner-box").style.animation="toright_banner3 0.3s 0s 1 ease-out";
		 document.getElementById("banner-box").style.animationFillMode="both";
		 break;
		 case 240:
		 document.getElementById("banner-box").style.animation="toright_banner4 0.3s 0s 1 ease-out";
		 document.getElementById("banner-box").style.animationFillMode="both";
		 break;
		 case 300:
		 document.getElementById("banner-box").style.animation="toright_banner5 0.3s 0s 1 ease-out";
		 document.getElementById("banner-box").style.animationFillMode="both";
		 break;
		 case 0:
		 document.getElementById("banner-box").style.animation="toright_banner6 0.3s 0s 1 ease-out";
		 document.getElementById("banner-box").style.animationFillMode="both";
		 break;
	 }
	 return;
 }
 // 轮播图向左判定
 function to_left_check(){
	 var now=y_angle%360;
	 switch(now){
		 case 60:
		 document.getElementById("banner-box").style.animation="toleft_banner3 0.3s 0s 1 ease-out";
		 document.getElementById("banner-box").style.animationFillMode="both";
		 break;
		 case 120:
		 document.getElementById("banner-box").style.animation="toleft_banner2 0.3s 0s 1 ease-out";
		 document.getElementById("banner-box").style.animationFillMode="both";
		 break;
		 case 180:
		 document.getElementById("banner-box").style.animation="toleft_banner1 0.3s 0s 1 ease-out";
		 document.getElementById("banner-box").style.animationFillMode="both";
		 break;
		 case 240:
		 document.getElementById("banner-box").style.animation="toleft_banner6 0.3s 0s 1 ease-out";
		 document.getElementById("banner-box").style.animationFillMode="both";
		 break;
		 case 300:
		 document.getElementById("banner-box").style.animation="toleft_banner5 0.3s 0s 1 ease-out";
		 document.getElementById("banner-box").style.animationFillMode="both";
		 break;
		 case 0:
		 document.getElementById("banner-box").style.animation="toleft_banner4 0.3s 0s 1 ease-out";
		 document.getElementById("banner-box").style.animationFillMode="both";
		 break;
	 }
	 return;
 }
 自动轮播
 function banner_auto(){
		 autotimer=setInterval(()=>{
		 y_angle+=60;
		 to_right_check()
		 },3500)  
		 return;             
 }
 function banner_to_left(){ 
	 clearInterval(autotimer)
	 y_angle-=60;
	 to_left_check()
	 banner_auto()  
	 return;  
 }
 function banner_to_right(){
	 clearInterval(autotimer)
	 y_angle+=60;
	 to_right_check()
	 banner_auto()  
	 return;  
 }