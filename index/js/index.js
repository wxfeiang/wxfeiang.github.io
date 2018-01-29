/*nav*/
window.onscroll=function(){
	var topScroll = document.body.scrollTop;//滚动的距离,距离顶部的距离
	var innavTop = getId("innav").offsetTop;
	var abmeTop = getId("aboutme").offsetTop;
	var h = document.documentElement.clientHeight || document.body.clientHeight ;
	//console.log(topScroll);
	//console.log(h)
	if(topScroll>innavTop){
	innav.style.position = 'fixed';
	innav.style.top = '0';
	innav.style.left = '0';
	innav.style.width = '100%';

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
   









/*获取ID元素*/
function getId(id){
	return document.getElementById(id);
}