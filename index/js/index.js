/*nav*/
window.onscroll=function(){
	var topScroll = document.body.scrollTop;//滚动的距离,距离顶部的距离
	var innavTop = getId("innav").offsetTop;
	var abmeTop = getId("aboutme").offsetTop;
	var h = document.documentElement.clientHeight || document.body.clientHeight ;  //窗口的可视高
	//console.log(topScroll);
	//console.log(h)
	if(topScroll>innavTop){
	innav.style.position = 'fixed';
	innav.style.top = '0';
	innav.style.left = '0';
	innav.style.width = '100%';
	innav.style.zIndex = "9999";

	//console.log(topScroll-h);
	}
	if(topScroll<h){
	innav.style.position = 'static';

	
	 }

  /*baout me*/
 

 }
/*点击按钮*/
var navbtn = getId("navbtn");
var onOff = true;;
navbtn.onclick = function() {
	if(onOff){
		getId("navlist").style.display = 'block';
		onOff = false;
	}else{
		getId("navlist").style.display = 'none';
		onOff = true;
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
	var coder = `
	   <h3 class="right-title">关于我</h3>
	   <p class="right-dec">在前端开发工作中，让我变得更有耐心，思维更活跃， 也培养了我独立思考和自主学习的能力，在压力和困难面前我有很好的分析能力和解决问题的能力。 我更是一位富有团队精神的人，能够相互协作和充分的沟通。谋求公司的<span>Web前端开发<span>职位。
	   </p> 
	  `;
   var timer = setInterval(abauto,50);
   function abauto(){
   	 abmel.innerHTML = code.substring(0,n);
	 abmer.innerHTML = coder.substring(0,n);
	   n++;
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
	sure.onclick = function (){
      	inalert.style.display = 'none';
	}
	//验证是否为空和字数小于 100个字
   if(message==""){
     inalert.style.display = 'block';
     inalertp.innerHTML = "请输入内容吧!";

     return false;
   }
   if(message.length>100){
   	inalert.style.display = 'block';
    inalertp.innerHTML = "字数不能超过100个!";
    return false;
   }
   
  // 存储数据
	saveMessage(message,nowday,nowtime);
	 // 提示框显示
	inalert.style.display = "block";
     inalertp.innerHTML = "留言成功!";
	 // 清除表单
	 myform.reset();
	 
	 //提示框消失
     

	 setTimeout(aotoNone,3000);

    function aotoNone(){
      inalert.style.display = "none";
    }




}






/*获取ID元素*/
function getId(id){
	return document.getElementById(id);
}

//时间对象处理
 function  toTwo(date) {
   return  date < 10 ?  "0"+date :date;
 }

 /*数据存储  josn*/
function saveMessage (message,nowday,nowtime){
 messageRef. push({
        message : message,
        nowday : nowday,
        nowtime : nowtime
     });
}
// 获取数据 
messageRef.orderByKey().limitToLast(5).on('value',function (snapshot){
	  // console.log(snapshot.key());
	   //console.log(snapshot.val());
	   // console.log("the previous key is",prev)
	var getarr= snapshot.val();
	var getpu=[];
	for(i in getarr){
	   getpu.push({
	    mg:getarr[i].message,
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
