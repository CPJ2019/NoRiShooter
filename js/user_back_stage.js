//用户列表查询
var $start=0;
var $count=10;
function 	user_list(){
	//console.log('调用查询')
	//console.log($start)
	//console.log($count)
	var xhr=new XMLHttpRequest();
	var url=`/user/list?start=${$start}&count=${$count}`;
	xhr.open("get",url,true);
	xhr.send(null);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			var result=xhr.responseText;
			var arr=JSON.parse(result);
			var html=`
			<table border="1px" align="center">
			<tr>
				<th id="th1">编号</th>
				<th id="th2">用户名</th>
				<th id="th3">密码</th>
				<th id="th4">邮箱</th>
				<th id="th5">电话</th>
				<th id="th6">真实姓名</th>
				<th id="th7">性别</th>
				<th id="th8">管理</th>
			</tr>`
				for(var i=0;i<arr.length;i++){
				var sex;
				if(arr[i].sex==1){
					sex="男"
				}else if(arr[i].sex==0){
					sex="女"
				}else{
					sex="不详"
				}
				html+=`
				<tr>
					<td>${arr[i].uid}</td>
					<td>${arr[i].uname}</td>
					<td>${arr[i].upwd}</td>
					<td>${arr[i].email}</td>
					<td>${arr[i].phone}</td>
					<td>${arr[i].user_name}</td>
					<td>${sex}</td>
					<td><a href="javascript:user_delete(${arr[i].uid})">删除</a>&nbsp;&nbsp;<a href="javascript:user_detail(${arr[i].uid})" ">详细</a></td>
				</tr>		
				
				`
			}
			html+="</table>";
			d1.innerHTML=html;

			//console.log($count)
			switch($count){
				case 1: s1="selected";
								s2="";
								s5="";
								s10="";
								s15="";
				break;
				case 2: s1="";
								s2="selected";
								s5="";
								s10="";
								s15="";
				break;
				case 5: s1="";
								s2="";
								s5="selected";
								s10="";
								s15="";
				break;
				case 10: s1="";
								 s2="";
								 s5="";
								 s10="selected";
								 s15="";
				break;
				case 15: s1="";
								 s2="";
								 s5="";
								 s10="";
								 s15="selected";
				break;
			}	

			//console.log("s1"+s1,"s2"+s2,"s5"+s5,"s10"+s10,"s15"+s15)
			var d2_html=`
			<button onclick="first_page()">首页</a></button>
			<button onclick="last()">上一页</button>
			<button onclick="next()">下一页</button>
			设置显示数量
			<select  id="count">
				<option value="1" ${s1}>1</option>
				<option value="2" ${s2}>2</option>
				<option value="5" ${s5}>5</option>
				<option value="10" ${s10}>10</option>
				<option value="15" ${s15}>15</option>
			</select>	
			`
			d2.innerHTML=d2_html
			
		}
	}
}
//返回主页
function first_page(){
	$start=0;
	$count=parseInt(count.value)
	user_list()
}
//列表下页
function next(){
	$count=parseInt(count.value)
	$start+=$count;
	user_list()
}
//列表上页
function last(){
	$count=parseInt(count.value)
	if(($start-$count)>=0){
		$start-=$count;
		user_list()
	}else{
		alert('这已经是首页了');	
	}
	
}
//删除用户
function user_delete(uid){
	//var uid=uid;
	console.log(uid)
	var xhr=new XMLHttpRequest();
	var url=`/user/delete?uid=${uid}`;
	xhr.open("get",url,true);
	xhr.send(null);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			var result=xhr.responseText;
			alert(result)
			user_list()	
    }
	}
}
//用户详情
function user_detail(uid){
	//console.log(uid)
	var uid=uid;
	var xhr=new XMLHttpRequest();
	var url=`/user/detail?uid=${uid}`;
	xhr.open("get",url,true);
	xhr.send(null);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			var result=xhr.responseText;
			if(result==0){
				alert('用户不存在');
			}else{
			var user_arr=JSON.parse(result);
			//alert(result)
			//d1.innterHTML=result;
			console.log(user_arr[0].sex)
			if(user_arr[0].sex==1){
				var select_1="checked";
				var select_0="";
				var select_2="";
			}else if(user_arr[0].sex==0){
				var select_0="checked";
				var select_1="";
				var select_2="";
			}else{
				var select_2="checked";
				var select_1="";
				var select_0="";
			}
			var html=`
			<div id="user_detail">
			编号:<input type="text" disabled value="${user_arr[0].uid}"></br>
			用户:<input type="text" disabled value="${user_arr[0].uname}"></br>
			密码:<input type="text" id="upwd" value="${user_arr[0].upwd}"></br>
			邮箱:<input type="text" id="email" value="${user_arr[0].email}"></br>
			电话:<input type="text" id="phone" value="${user_arr[0].phone}"></br>
			姓名:<input type="text" id="user_name" value="${user_arr[0].user_name}"></br>
			<div aligin="left">
			性别:
			男<input type="radio" name="sex" ${select_1} value="1">&nbsp;&nbsp;
			女<input type="radio" name="sex" ${select_0} value="0">&nbsp;&nbsp;
			不详<input type="radio" name="sex" ${select_2} value="2"><br>
			</div>
			<button onclick="user_update(${uid})">修改</button>	
			<button onclick="user_list()">返回</button>
			</div>
			`
			d1.innerHTML=html;
			d2.innerHTML="";
//			search.innerHTML="";
			}
    }
	}
}
function tolist(){
	window.location.href="user_back_stage.html";
}
//修改用户
function user_update(uid){
	//var uid=uid;
	var sex=document.getElementsByName("sex");
	for(i=0;i<sex.length;i++){
		if(sex[i].checked){
			sex=sex[i].value;
		}
	}
	console.log(uid)
	var xhr=new XMLHttpRequest();
	var url=`/user/update`;
	xhr.open("post",url,true);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	var formdata=`upwd=${upwd.value}&email=${email.value}&phone=${phone.value}&user_name=${user_name.value}&sex=${sex}&uid=${uid}`
	xhr.send(formdata);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			var result=xhr.responseText;
			//alert(result)
			//var result=JSON.parse(result);
			if(result==1){
				alert('修改成功')
			}else if(result==0){
				alert('修改失败')
			}else{
				alert(result+"不能为空")	
			}
			user_list(uid)
    }
	}
}
function user_search(){
	//search_uid.innerHTML="";
	var $search_uid=search_uid.value
	//console.log(!$search_uid)
	if(!$search_uid){
		alert('用户编号不能为空')
	}else{
	user_detail(search_uid.value)
  }

}
	