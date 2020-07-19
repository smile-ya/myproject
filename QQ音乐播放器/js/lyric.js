/*面向对象*/
(function(window)
{
	function Lyric(path){
		return new Lyric.prototype.init(path);
	}
	Lyric.prototype = {
		constructor:Lyric,
		
		init:function ( path){
			this.path = path;
		},
		times:[],
		lyrics:[],
		index:-1,
		loadLyric:function (callBack){
			var $this=this;
			$.ajax({
				url:$this.path,
				dataType:"text",
				success:function(data){
					// console.log(data);
					$this.parseLyric(data);
					callBack();
				},
				error:function (e){
					console.log(e);
				}
			});
		},
		parseLyric:function(data){
			var $this=this;
			//一定要清空上一首歌曲的歌词和时间
			$this.times = [];
			$this.lyrics = [];
			var array=data.split("\n");
			// console.log(array);
			//[00:00:92]
			var timeReg = /\[(\d*:\d*\.\d*)\]/
			//遍历取出每一条歌词
			$.each(array,function(index,ele){
				
				//处理歌词
				var lrc = ele.split("]")[1];
				//判断歌词是否为空，如果是空字符，则排除
				if(lrc.length==1) return true;
				
				$this.lyrics.push(lrc);
				// console.log(ele);
				var res= timeReg.exec(ele);
				// console.log(res);
				if(res ==null) return true;
				var timeStr=res[1];
				var res2 = timeStr.split(":");
				var min = parseInt(res2[0])*60;
				var sec=parseFloat(res2[1]);
				var time = parseFloat(Number(min+sec).toFixed(2));//保留两位小数后是字符串类型，因此要parseFloat转为number
				// console.log(typeof(time));
				$this.times.push(time);
				
				
			});
			
		},
		currentIndex:function (currentTime){
			// console.log(currentTime);
			if(currentTime>=this.times[0]){
				this.index++;
				this.times.shift();//删除数组最前面的一个元素
			}
			return this.index;
		}
	}	
	Lyric.prototype.init.prototype =Lyric.prototype;
	window.Lyric=Lyric;
})(window);