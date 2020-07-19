window.onload = function()
			{
			var image=document.getElementById("image");
			var start = document.getElementById("start");
			var stop = document.getElementById('stop');
			var sort = document.querySelector('#sort');
			var speed = document.getElementById('speed');
			var play = document.getElementById(('play'));
			var bdy = document.querySelector('body');
			var home = document.getElementById('home');
			var game = document.getElementById('game');
			var wrong = document.getElementById('wrong');
			
			var position =new Array(34);
			
			var position =[[ "1410px","-35px"],["1365px", "-50px"],["1331px", "-50px"],["1300px", "-43px"],["1289px", "-35px"],["1260px", "-31px"], ["1151px", "24px"],
						   ["1090px", "30px"],["1029px", "36px"],["971px", "28px"], ["918px", "20px"],["862px", "16px"],
						   ["790px", "-16px"],["750px", "-8px"],["740px", "-5px"], ["713px", "13px"],["702px", "-3px"],
						   ["690px", "16px"],["671px", "35px"],["608px", "52px"],["570px", "60px"],["480px", "52px"],
						   ["402px", "45px"], ["365px", "41px"],["321px", "35px"],["285px", "28px"],["241px", "18px"],
						   ["214px", "-1px"],["168px", "-13px"],["122px", "-15px"],["87px", "-26px"],["60px", "-38px"],
						   ["16px", "-40px"],["17px", "-40px"],["-40px", "-36px"]		 
			]
			
		    var minute,second,millisecond;// 分 秒
		    minute=second=millisecond=0;//初始化
		    
		    var interval = 10;

		    //计时函数
		    function timer()
	      {
		      millisecond=millisecond+interval;
		      if(millisecond>=1000)
		      {
		        millisecond=0;
		        second=second+1;
		      }
		      if(second>=60)
		      {
		        second=0;
		        minute=minute+1;
		      }
		        // str=toDou(minute)+toDou(second)+toTre(millisecond);
				var p = document.querySelector('p');
				var span = p.getElementsByTagName('span');
				span[0].innerHTML = toDou(minute);
				span[1].innerHTML = toDou(second);
				span[2].innerHTML = toTre(millisecond);

		    }
		
		function toDou(n)
		{
			if(n<10)
			{
				return '0'+n;
			}
			else
			{
				return ''+n;
			}
		}
		  
		function toTre(n)
		{
			
			if(n<10)
			{
				return '00'+n;
			}
			else if(n<100)
			{
				return '0'+n;
			}
			else 
			{
				return ''+n;
			}
		}
		
		var place=0,id=0;
		var staflag=0 ;//游戏是否开始的标志
		var isHide = false;//排行榜是否隐藏的标志
		var posi = 0;//位置标记
		
		play.onclick = function(){
			
			// bdy.style.background = 'none';
			bdy.style.background='url(image/mountain.png) no-repeat';
			bdy.style.backgroundSize = '1540px 730px';
			home.style.visibility='hidden';
			game.style.visibility='visible';
			game.style.marginTop = '-200px';
		}
		
		hideTab();//初始时隐藏排行榜
		//开始游戏点击事件
		start.onclick = function(){	
			
			image.style.transform='rotateY(360deg)';
			start.style.display = 'none';//点击开始后，按钮消失
			speed.style.display = 'block';//加速按钮显示
			image.src = 'image/person.gif';
			staflag++;
			if(staflag>1)
			{
				staflag--;
				return;
			}
			
			image.style.left = '1410px';//每次开始时重置
			image.style.top = '-35px';
			var i = 0;
			posi = 0;
			timer1 = setInterval(function(){ //爬山动画定时器
				
				if(i<position.length-1 && posi<position.length-1)
				{
					image.style.left=position[i][0];
					image.style.top=position[i][1];
					i++;
					posi = i;
					
				}
				else{
					
					image.style.left=position[posi][0];
					image.style.top=position[posi][1];
					posi--;
					
					image.style.transform='rotateY(180deg)';
					if(posi<0)
						{
							image.style.transform='rotateY(360deg)';
							i = 0;
							
						}
					// image.style.-webkit-transform = 'rotateY(180deg); /* Safari and Chrome */
					
					// image.src = 'image/person.png';
					// clearInterval(timer1);
				}
			},800);
			
			minute=second=millisecond=0;//初始化
			timer2=setInterval(timer,interval);//时间计时器
			
			isHide = false;//隐藏排行榜
			hideTab();
			
		};
		
		var sposi=0;//记录加速过程中的当前位置
		
		var sptime = 800;//加速时间
		
		//加速
		speed.onclick = function(){
			
			image.style.transform='rotateY(360deg)';
			clearInterval(timer1);
			if(sptime !=50)
			{
				sptime *=0.5;
			}
			timer1 = setInterval(function(){ //爬山动画定时器
				
				if(posi<position.length-1 && sposi<position.length-1)
				{
					image.style.left=position[posi][0];
					image.style.top=position[posi][1];
					posi++;
					sposi = posi;
					
				}
				else{
					
					image.style.left=position[sposi][0];
					image.style.top=position[sposi][1];
					sposi--;
					
					image.style.transform='rotateY(180deg)';
					if(sposi<0)
						{
							image.style.transform='rotateY(360deg)';
							posi = 0;
							
						}
					// image.style.-webkit-transform = 'rotateY(180deg); /* Safari and Chrome */
					
					// image.src = 'image/person.png';
					// clearInterval(timer1);
				}
			},sptime);
			
		}
		
		//动态创建排行榜数据
		 var table = document.querySelector('table');
		 
		 var tbody = document.querySelector('tbody');
		 
		 document.onkeydown=function (ev)
		 {
		 	
		 	var oEvent = ev||event;
		 	if(oEvent.keyCode == 32)
			{
				// 促发stop的点击事件
				 if(document.all) {
						  stop.click();
					 }
						    // 兼容其它浏览器
				else {
						  var e = document.createEvent("MouseEvents");
						   e.initEvent("click", true, true);
						   stop.dispatchEvent(e);
					}
			
			};
		 };
		 
		 
		 
		 //停止游戏点击事件
		 stop.onclick=function(){
			 
			start.style.display = 'block';//点击停止时，start按钮出现
		
			speed.style.display = 'none';//加速按钮消失
			image.src = 'image/person.png';
		
			
			staflag--;//避免点击多次stop按钮时，创建出重复的排行榜信息
			if(staflag!=0){
				staflag++;
				return ;
			}
			
			if(toDou(second)<10)
			{
				
				wrong.style.display = 'block';
				setTimeout(function(){
					wrong.style.display = 'none';
				},2000);
				clearInterval(timer1);
				clearInterval(timer2);
				return ;
			}
			
			
			isHide = true;//显示排行榜
			
			hideTab(); 
			
			
			time = toDou(minute)+":"+toDou(second)+"."+toTre(millisecond);
			place++;
			id++;
			var tr = document.createElement('tr');
			
			for(var i = 0 ;i<3;i++){
						 var td = document.createElement('td');
						 if(i == 0)
						 {
							 td.innerHTML = place;
						 }
						 if(i == 1)
						 {
							 td.innerHTML = '玩家'+id; 
						 }
						 if(i == 2)
						 {
							 td.innerHTML = time;
						 }
						 tr.appendChild(td);
							
			}
			
			if(tbody.innerHTML=='')
			{
				tbody.appendChild(tr);
			}
			else {
				tbody.appendChild(tr);
				Sort();
			}
			clearInterval(timer1);
			clearInterval(timer2);
		}
		
		
		//排行榜点击事件 ????
		
		
		function hideTab(){
				
		        var table = document.querySelector('table');
		        var rows=table.rows;
		        var len=table.rows.length;
		        // tab.style.display='';
				if(isHide)
				{
					table.style.width = '500px';
					table.style.border = '1px solid';
				}
				else{
					table.style.width = '0px';
					table.style.border = '0px';
					
				}
		        for(var i=0;i < len;i++){
		            if (isHide) {
						
		                rows[i].style.display='';
						
		            }else{
		                rows[i].style.display='none';
						
		            }
		        }
		        isHide=!isHide;
		}
		
		sort.onclick = function(){
			rules.style.display = 'none';
			hideTab();
		};
		
		
		//排行榜排序算法
		function Sort(){
					var arr = tbody.getElementsByTagName('tr');
		            var len=arr.length;
		            var temp,index;
					var td,mtime,stime,milltime,place;
					for(var i=0;i<len;i++)
					{
						td = arr[i].getElementsByTagName('td');
						mtime = td[2].innerHTML.substr(0,2);
						stime = td[2].innerHTML.substr(3,2);
						milltime = td[2].innerHTML.substr(6,3);
						arr[i].time = Number(mtime)*60*1000+Number(stime*1000)+Number(milltime);
						arr[i].place = Number(td[0].innerHTML);
						
					}
					
					//用时排序
		            for(var i=0;i<len-1;i++){
						index = i;
		                for(var j=i+1;j<len;j++){
							if(arr[j].time<arr[index].time)
								index = j;
		                }
						if(arr[index].time < arr[i].time){	
							tbody.insertBefore(arr[index],arr[i]);
						}
						
					}
					
					//名次排序
			        for(var i=0;i<len-1;i++)
					{
						index = i;
						for(var j=i+1;j<len;j++)
						{
							if(arr[j].place<arr[index].place)
								index = j;
						}
						if(arr[index].place < arr[i].place)
						{
						
							
							//在进行排行榜用时排序的同时将名次也交换过来
							//不仅dom元素中的innerHTML要变
							temp = arr[i].getElementsByTagName('td')[0].innerHTML;
							arr[i].getElementsByTagName('td')[0].innerHTML = arr[index].getElementsByTagName('td')[0].innerHTML;
							arr[index].getElementsByTagName('td')[0].innerHTML = temp;
							
							//数组的place值也需要交换，因为是通过place值来判断是否需要交换的，如果只改innerHTML，不改place，排序算法会出错
							temp = arr[i].place;
							arr[i].place = arr[index].place;
							arr[index].place = temp				
						}
					}
		        };
				
				function toggleSound() {
				            var music = document.getElementById("music");//获取ID  
				            if (music.paused) { //判读是否播放  
				                music.paused=false;
				                music.play(); //没有就播放 
				            	}         
				        }
				
				setInterval(toggleSound,1);
				
		
			
			
			//游戏规则点击事件
			var rule = document.getElementById('rule');
			var rules = document.getElementById('rules');
			rule.onclick = function(){
				if(rules.style.display == 'block')
				{
					rules.style.display = 'none';
				}
				else{
					rules.style.display = 'block';
				}
				// rules.style.display = (rules.style.display == 'none')?'block':'none';
				isHide = false;
				hideTab();
				
			}
			
	}