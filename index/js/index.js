/*nav*/
window.onscroll = function(){
	var topScroll = document.documentElement.scrollTop||document.body.scrollTop;//滚动的距离,距离顶部的距离
	var innavTop = getId("innav").offsetTop;

	var h = document.documentElement.clientHeight || document.body.clientHeight ;  //窗口的可视高
	//console.log(topScroll);
	//console.log(h)
	if(topScroll>innavTop){	
    innav.style.cssText = "position:fixed;top:0; width :100%;z-index:999;";
	//console.log(topScroll-h);
	}

	if(topScroll<h){
	innav.style.position = 'static';
	 }
     

  
}
/*aboutme*/

	var abmel = getId("abmel");
	var abmer = getId("abmer");

	var n= 0;
	var code = ` 
	     <li><i class="fa fa-user"></i> &nbsp王鹏</li>
	     <li><i class="fa fa-location-arrow" ></i> &nbsp1993-11</li>
	     <li><i class="fa fa-bolt"></i></i> &nbsp北京市</li>
	     <li><i class="fa fa-envelope"></i><a href="mailto:wxfeiang@foxmail.com"> &nbspwxfeiang@foxmail.com</a></li>
	     <li><i class="fa fa-phone"></i><a href="tel:18309469751"> &nbsp18309469751</a></li>

	     `;
	     //console.log(code.length);
	var coder = `
	   <h3 class="right-title">关于我</h3>
	   <p class="right-dec">在前端开发工作中，让我变得更有耐心，思维更活跃， 也培养了我独立思考和自主学习的能力，在压力和困难面前我有很好的分析能力和解决问题的能力。 我更是一位富有团队精神的人，能够相互协作和充分的沟通。谋求公司的<span>Web前端开发<span>职位。
	   </p> 
	  `;
   var timer1 = setInterval(abauto,50);
   function abauto(){
   	if(n<=code.length ||n<=coder.length  ){
   		 abmel.innerHTML = code.substring(0,n);
	     abmer.innerHTML = coder.substring(0,n);
	     n++;
   	   }
   	   else{
   	   	  return false;
   	   }
   }

  // clearInterval(timer1);

 /* app 下点击效果*/
var navbtn = getId("navbtn");
var navlist = getId("navlist");
var onOff = true;;
navbtn.onclick = function() {
	if(onOff){
		navlist.style.display = 'block';
         navlist.onclick = function(){
          navlist.style.display = 'none';

         }

		onOff = false;
	}else{
		navlist.style.display = 'none';
		onOff = true;
	}

	
}
// 楼层跳转
var nlarr = navlist.children;
var flarr = document.getElementsByClassName("flarr");

for (var i=0;i<nlarr.length; i++){
  nlarr[i].index = i;
  nlarr[i].onclick = function (){
  
  objto(flarr[this.index]);
  
  }
}

/*滚动*/
function objto (obj){
	var target = 0;  // 目标位置
	var timer = null; 
	var leader = 0;  // 滚动条初始外置

	  target = obj.offsetTop;
	  clearInterval(timer);
	  timer =setInterval(function(){
	  //console.log(leader) ;
	    var speed = (target-leader)/10;  
	    // 判断方向  
	    speed = speed>0?Math.ceil(speed):Math.floor(speed);  
	    //下一步到的位置  
	    leader = leader+speed;  
	    //移动  
	    window.scrollTo(0,leader);  
	    //判断是否到达，到达清除定时器  
	    if(leader == target){  
	        //console.log(1); 

	        clearInterval(timer);  
	    }  


	  },30);

    }
// 首页按钮
var spbtn = document.querySelectorAll(".ba-sbtn span");
spbtn[0].onclick = function (){
	objto(flarr[1]);
}

spbtn[1].onclick = function (){
	objto(flarr[4]);
}




   
/*contact-me*/
//  初始化数据库对象
var config = {
  syncURL: "https://wd9064896835arjzau.wilddogio.com/" //输入节点 URL
};
wilddog.initializeApp(config);
// 调用数据库提供的方法  链接数据库  到指定的表
var messageRef = wilddog.sync().ref("massage");
// 添加提交事件
var myform = getId("myform");
myform.addEventListener("submit",submitForm);
function submitForm(e){
   /*阻止默认刷新*/
    e.preventDefault();
    var message = getId("message").value ;
 /*事件对象*/
	var date =  new Date();
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var da = date.getDate();
	var h = date.getHours();
	var min = date.getMinutes();
	var s = date.getSeconds();
	var nowday = y +"-"+m +"-"+da ;
	var nowtime =  toTwo(h) +":"+toTwo(min) +":"+toTwo(s) ;
	var inalert = document.querySelector(".con-alert");
	var inalertp = document.querySelector(".al-dec1");
	var sure = document.querySelector(".al-dec2");
	sure.addEventListener("click",onSure);
	 function onSure(){
      	inalert.style.display = 'none';
	}
	//验证是否为空和字数小于 100个字
   if(message==""){
     aotoNone("block","请输入内容吧!");
     return false;
   }
   if(message.length>100){
   	 aotoNone("block","字数不能超过100个哦!");
    return false;
   }
   
  // 存储数据
	saveMessage(message,nowday,nowtime);
	 // 提示框显示
	aotoNone("block","留言成功!");
	 // 清除表单
	 myform.reset(); 
    //弹框
    function aotoNone(inB,inHtml){
      inalert.style.display = inB ;
      inalertp.innerHTML = inHtml ; 
      setTimeout(onSure,2000);
    }


}
/*数据存储  josn*/
function saveMessage (message,nowday,nowtime){
 messageRef. push({
        message : message,
        nowday : nowday,
        nowtime : nowtime
     });
}
// 服务器获取数据 
messageRef.orderByKey().limitToLast(5).on('value',function (snapshot){
	  // console.log(snapshot.key());  数据表
	   //console.log(snapshot.val());  5调objact
       //
	var getarr= snapshot.val();
	var getpu=[];
	for(i in getarr){
	   getpu.push({
	    mg: getarr[i].message,
	    da:	getarr[i].nowday,
	    dd:	getarr[i].nowtime
	   })
	   }
	var showmg = getpu.reverse();
	/*最新数据倒叙 添加内容*/
	var str= '';
	for(i in showmg ){
	//console.log(showmg[i].mg);
	str +=` 
	      <li class="clearfix new-li">  
	         <p class=" fl use-cont">
	         	${showmg[i].mg}
	         </p>
	          <p class="fr new-right">${showmg[i].da}<br>
	             ${showmg[i].dd}
	          </p>
	     </li>
	`;
	}

	getId("newlist").innerHTML = str;
});


/*获取ID元素*/
function getId(id){
	return document.getElementById(id);
}

//时间对象处理
 function  toTwo(date) {
   return  date < 10 ?  "0"+date :date;
 }

 