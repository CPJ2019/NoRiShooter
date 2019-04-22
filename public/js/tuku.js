// 声明SQL语句需要的变量
var start=0;
var count=6;
var sort="tid ASC";
// 获取图片列表
function get_images(){
  var xhr=new XMLHttpRequest();
  var url=`/tuku/get_images?sort=${sort}&start=${start}&count=${count}`;
  console.log(url)
  xhr.open('get',url,true);
  xhr.send(null);
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
      var result=xhr.responseText;
      // console.log(result);
      var arr=JSON.parse(result);
      var html="";
      // 图片列表模板
      for(i=0;i<count;i++){
        html+=`
        <li>
          <div>
            <a href="javascript:to_detail(eval(${start}+${i}))"><img src="${arr[i].imgs}"></a>
          </div>
          <span>作品编号-${arr[i].tid} 上传时间-${arr[i].upload_datetime}</span><br>
          <p class="img-bottom first">上传者-<a href="#">${arr[i].uploader}</a></p>
          <p class="img-bottom">热度:<span class="hot"> ${arr[i].click_count} </span></p>
        </li>
        `
        // 改写图片展示内容
        img_show.innerHTML=html;
        //改写排序按钮
        // sort_b.innerHTML=`
        // <div class="btn-group">
        // <button onclick="by_date()" class="btn btn-primary">按时间倒序</button>
        // <button onclick="by_hot()" class="btn btn-danger">按热度排序</button>
        // <button onclick="by_tid()" class="btn btn-success">按编号排序</button>
        // </div>
        // `;
        button.innerHTML=`
        <button class="left" onclick="last()"></button>
        <button class="right" onclick="next()"></button>   
        `
      }
    }
  } 
}
//上一页
function last(){
  console.log('上一页')
  if(start>=6){
    start=parseInt(start-=6);
    get_images()
  }else{
    alert("已经是首页")
  } 
}
//下一页
function next(){
  console.log('下一页') 
  start+=6;
  start=parseInt(start);
  get_images();
}
//下一页细节
function next_detail(start){
  console.log('下一页') 
  start=start;
  start=parseInt(start+=1);
  image_detail(start);
}
//上一页细节
function last_detail(start){
  console.log('上一页')
  start=start;
  console.log(start)
  console.log(count)
  if(start>=1){
    start=parseInt(start-1);
    image_detail(start)
  }else{
    alert("已经是首页")
  } 
}
//按时间倒序
function by_date(){
  start=0;
  sort="upload_datetime DESC,tid ASC";
  get_images();
}
//按热度排序
function by_hot(){
  start=0;
  sort="click_count DESC,tid ASC";
  get_images();
}
//按编号排序
function by_tid(){
  start=0;
  sort="tid ASC";
  get_images();
}
//返回
function return_list(start){
  count=6;
  start=start;
  console.log(start)
  document.getElementById("return_btn").style.display="none" ;
  document.getElementById("sort_btn").style.visibility="visible" ;
  get_images();
}
// 切换细节
function to_detail(start){
  document.getElementById("return_btn").style.display="block";
  document.getElementById("sort_btn").style.visibility="hidden";
  image_detail(start);
}
// 获取细节
function image_detail(start){
  console.log(start)
  count=1;
  var xhr=new XMLHttpRequest();
  var url=`/tuku/get_images?sort=${sort}&start=${start}&count=${count}`;
  console.log(url)
  xhr.open('get',url,true);
  xhr.send(null);
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
      var result=xhr.responseText;
      //console.log(result);
      var arr=JSON.parse(result);
      var html="";
      // 图片列表模板
      html+=`
      <li id="detail">
        <div>
          <img src="${arr[0].imgs}">
        </div>
        <span>作品编号-${arr[0].tid} 上传时间-${arr[0].upload_datetime}</span>
        <p class="img-bottom first">上传者-<a href="#">${arr[0].uploader}</a></p>
        <p class="img-bottom">热度:<span class="hot"> ${arr[0].click_count}</span></p>
      </li>
      `
      // 改写图片展示内容
      img_show.innerHTML=html;
      //改写按钮
      // sort_btn.innerHTML=`
      // <button onclick="return_list(${start})" class="btn btn-secondary">返回</button>
      // `;
      button.innerHTML=`
      <button class="left" onclick="last_detail(${start})"></button>
      <button class="right" onclick="next_detail(${start})"></button>  
      `     
    }
  } 
  console.log(start)
}