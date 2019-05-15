// 现在选择的武器类型
var wuqi_class_select;
// 武器类型选择绑定函数
// 获得武器类型sel
var wqt = document.getElementById("wqt")
wqt.onchange = function () {
  wqt = this;
  var i = wqt.selectedIndex - 1;
  wuqi_class_select = wuqi_class[i];
  if (i >= 0) {
    var wuqis = wuqi_class[i];
    var frag = document.createDocumentFragment();
    frag.appendChild(new Option("-请选择武器-"));
    for (var wuqi of wuqis) {
      frag.appendChild(new Option(wuqi.wname))
    }
    wq_list.length = 0;
    wq_list.appendChild(frag);
    wq_list.className = "";
  } else {
    wq_list.className = "hide";
  }
}
// 现在选中的武器
var wuqi_select;
// 武器选择绑定函数
wq_list.onchange = function () {
  var i = this.selectedIndex - 1;
  // 获取当前武器类型列表
  var list_now = wuqi_class_select
  wuqi_select = wuqi_class_select[i]
  if (i >= 0) {
    // 获取介绍文本内容元素
    var wuqi_intro_text = document.getElementById("wuqi_intro_text");
    // html片段
    var html = `
    <h4>基础属性</h4>
    <p>武器名称；<span>${list_now[i].wname}</span></p>
    <p>武器类型：<span>${list_now[i].wclass}</span></p>
    <p>解锁等级：<span>${list_now[i].wle}</span></p>
    <p>购买金币：<span>${list_now[i].wcost}</span></p>
    <p>武器伤害：<span>${list_now[i].dmg}</span></p>
    <p>武器射程：<span>${list_now[i].shc}</span></p>
    <p>主武器耗墨：<span>${list_now[i].miu}%</span></p>
    <p>副武器：<span>${list_now[i].sub}</span>
    <img src="images/wuqi/sub_${list_now[i].subimg}_logo.png"></p>
    <p>副武器耗墨：<span>${list_now[i].siu}%</span></p>
    <p>基础游速：<span>${list_now[i].wsp}%</span></p>
    <p>基础走速：<span>${list_now[i].rsp}%</span></p>
    <p>特殊武器：<span>${list_now[i].spw}</span>
    <img src="images/wuqi/spe_${list_now[i].spwimg}_logo.png"></p>
    <p>大招点数：<span>${list_now[i].spp}P</span></p>
    `
    // 修改介绍内容
    wuqi_intro_text.innerHTML = html;
    // 获取武器图片元素
    var wuqi_intro_img = document.getElementById("wuqi_intro_img");
    // 修改图片
    wuqi_intro_img.innerHTML = `<img src="images/wuqi/${list_now[i].wimg}.jpg">`
    // 生成range条
    create_range1();
  }
}
// 获取range条展示的元素对象
// 伤害
var dmg_range = document.getElementById("dmg_range");
// 射程
var shc_range = document.getElementById("shc_range");
// 主墨水消耗
var miu_range = document.getElementById("miu_range");
// 副墨水消耗
var siu_range = document.getElementById("siu_range");
// 游速
var wsp_range = document.getElementById("wsp_range");
// 走速
var rsp_range = document.getElementById("rsp_range");
// 大招P数
var spp_range = document.getElementById("spp_range");
// 墨水回复
var iru_range = document.getElementById("iru_range");
// 超级跳
var qsj_range = document.getElementById("qsj_range");
// 复活缩短
var qrt_range = document.getElementById("qrt_range");
// sp保留
var ses_range = document.getElementById("ses_range");

function create_range1() {
  // 根据武器数据以及技能影响计算出实际数据 视情况是否取两数 并为了显示效果分别放大不同的倍数
  // 伤害
  var dmg_num = wuqi_select.dmg;
  create_range2.call(dmg_range, dmg_num * 2, dmg_num);
  // 射程
  var shc_num = wuqi_select.shc;
  create_range2.call(shc_range, shc_num * 2.5, shc_num);
  // 主墨水消耗)
  var miu_num = (wuqi_select.miu * miu_effect).toFixed(2);
  create_range2.call(miu_range, miu_num * 2.5, miu_num);
  // 副墨水消耗)
  var siu_num = (wuqi_select.siu * siu_effect).toFixed(2);
  create_range2.call(siu_range, siu_num * 2.5, siu_num);
  // 大招P数
  var spp_num = Math.round(wuqi_select.spp * spp_effect);
  create_range2.call(spp_range, spp_num * 1.25, spp_num);
  // 游速
  var wsp_num = (wuqi_select.wsp * wsp_effect).toFixed(2);
  create_range2.call(wsp_range, wsp_num * 2.5, wsp_num);
  // 走速
  var rsp_num = (wuqi_select.rsp * rsp_effect).toFixed(2);
  create_range2.call(rsp_range, rsp_num * 2.5, rsp_num);
  // 超级跳时间
  var qsj_num = qsj.toFixed(2);
  create_range2.call(qsj_range, qsj_num * 30, qsj_num);
  // 复活时间
  var qrt_num = qrt.toFixed(2);
  create_range2.call(qrt_range, qrt_num * 30, qrt_num);
  // 墨水回复速度
  var iru_num = (iru * iru_effect).toFixed(2);
  create_range2.call(iru_range, iru_num * 2.5, iru_num);
  // sp保留
  var ses_num = parseInt(ses * ses_effect);
  create_range2.call(ses_range, ses_num * 2.5, ses_num);
}

// 修改range样式和后边文字
function create_range2(num1, num2) {
  this.style.width = `${num1}px`;
  this.nextElementSibling.innerHTML = `${num2}`
}

// 获取技能div
var skill_div = document.querySelector("div.skill_div");
//获取模拟下拉
var selects = document.querySelectorAll(".select_box span")
// 定义模拟option选项(li)
var option_html = `
<li class="miu" title="主省"></li>
<li class="siu" title="副省"></li>
<li class="wsp" title="游速"></li>
<li class="rsp" title="走速"></li>
<li class="spp" title="SP加快"></li>
<li class="ses" title="SP保留"></li>
<li class="iru" title="回墨速度"></li>
<li class="qsj" title="超级跳"></li>
<li class="qrt" title="复活加速"></li>
`
// 往模拟select后的ul插入模拟option(li)
for (var select of selects) {
  select.nextElementSibling.innerHTML = option_html;
}
// 给window绑定事件 冒泡
window.onclick = function (e) {
  var click = e.target;
  // 点击模拟select
  if (click.nodeName === "SPAN" && click.nextElementSibling.nodeName === "UL") {
    click.nextElementSibling.className = "active"
  }
  // 点击模拟option 
  else if (click.nodeName === "LI") {
    // 获取模拟option列表
    var ul = click.parentNode;
    // 获取模拟select
    var select = ul.previousElementSibling;
    // 获取click的className并重新修改select的classname 下拉列表的效果
    select.className = e.target.className;
    // 关闭option列表
    ul.className = "";
    // 获取data对象对应的下标i data-num为自定义select的编号 1对应data的下标0
    var i = select.getAttribute("data-num") - 1;
    // 获取要写入的技能名字
    var sname = click.className;
    // 调用写入函数
    get_skill(i, sname)
  }
  // 点击其他
  else {
    // 关闭模拟select
    for (var select of selects) {
      select.nextElementSibling.className = "";
    }
  }
}
// 获得技能名并写入已选择技能对象
function get_skill(i, sname) {
  skill_selected[i].skill_name = sname
  get_effect()
}

// 计算技能效果
function get_effect() {
  // 先获得每个技能的技能点的数量
  // 主省
  var miu_point = get_point("miu");
  // 副省
  var siu_point = get_point("siu");
  // SP加快
  var spp_point = get_point("spp");
  // 游速
  var wsp_point = get_point("miu");
  //走速
  var rsp_point = get_point("rsp");
  //回墨速度
  var iru_point = get_point("iru");
  //超级跳跃速度
  var qsj_point = get_point("qsj");
  //复活缩短
  var qrt_point = get_point("qrt");
  //sp保留
  var ses_point = get_point("ses");

  // 根据技能点数计算影响
  // 主省影响效果
  miu_effect = skill_miu_min[miu_point]
  // 副省影响效果
  siu_effect = skill_siu_min[siu_point]
  // sp加快影响效果
  spp_effect = 1 / skill_spp[spp_point]
  // 游速影响效果
  wsp_effect = skill_wsp_min[wsp_point] / 1.92
  // 走速影响效果
  rsp_effect = skill_rsp_min[rsp_point] / 0.96
  // 回墨速度影响效果
  iru_effect = 180 / skill_iru_swin[iru_point]
  // 超级跳跃速度影响效果
  qsj = eval(skill_qsj[qsj_point]) / 60
  // 超级跳跃速度影响效果
  qrt = eval(`${skill_qrt[qrt_point]}*4+150`) / 60
  // 超级跳跃速度影响效果
  ses_effect = skill_ses[ses_point] * 2

  // 重新生成
  create_range1()
}
// 从已选择技能对象计算出每个技能的点数
function get_point(sname) {
  var point = 0;
  for (var skill of skill_selected) {
    (skill.skill_name == sname) && (point += parseInt(skill.point))
  }
  return point;
}

// 定义固定属性
// 回墨速度
const iru = 100;
// sp保留
const ses = 50;

// 重置技能
var rebtn = document.getElementById("rebtn")
rebtn.onclick = function () {
  // 重置模拟select
  for (var select of selects) {
    select.className = "sel_base";
  }
  // 重置技能影响
  set_effect();
  // 重置已选技能对象
  set_select_skill()
  // 重新生成
  create_range1()
}

// 定义技能影响effect
function set_effect() {
  // 主省
  miu_effect = 1;
  // 副省
  siu_effect = 1;
  // 游速
  wsp_effect = 1;
  // 走速
  rsp_effect = 1;
  // 超级跳
  qsj = 3.98;
  // 复活时间
  qrt = 8.5;
  // 回墨速度
  iru_effect = 1;
  // 大招P数
  spp_effect = 1;
  // sp保留
  ses_effect = 1;
}

// 定义已选择选择技能以及技能点
function set_select_skill() {
  skill_selected = [{
      skill_name: 0,
      point: 10
    },
    {
      skill_name: 0,
      point: 3
    },
    {
      skill_name: 0,
      point: 3
    },
    {
      skill_name: 0,
      point: 3
    },
    {
      skill_name: 0,
      point: 10
    },
    {
      skill_name: 0,
      point: 3
    },
    {
      skill_name: 0,
      point: 3
    },
    {
      skill_name: 0,
      point: 3
    },
    {
      skill_name: 0,
      point: 10
    },
    {
      skill_name: 0,
      point: 3
    },
    {
      skill_name: 0,
      point: 3
    },
    {
      skill_name: 0,
      point: 3
    },
  ]
}
// 网页加载时定义技能初始效果effect
window.onload = set_effect();
// 定义选择技能对象
window.onload = set_select_skill();