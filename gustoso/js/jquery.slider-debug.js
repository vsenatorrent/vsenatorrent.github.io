/*
婆婆滑 V 0.3

author:YC
date:2014/01/16
email:129#jinzhe.net
demo:http://jinzhe.net/demo/slider/
*/
(function($){
	$.fn.slider=function(options){
		var that=$(this);
		var page=0;
		var left=0;
		var interval=null;
		var options=$.extend({
			direction:0,
			prev:'#prev',
			next:'#next',
			prev_disable_class:'',
			next_disable_class:'',
			prev_callback:function(){},
			next_callback:function(){},
			pager:'',
			pager_event:'click', //页码事件类型
			pager_callback:function(){},
			size:1,//每页显示几个单元
			step:1,//每页移动多少步伐（单元）
			speed:300,
			easing:'swing',
			autoplay:false,
			interval:5000,
			mousewheel:false,
			drag:true,
			callback:function(){}
		},options);

		that.attr({
			'onSelectStart'	:'return false;',
			'style'			:'-moz-user-select: none; -khtml-user-select: none; user-select: none;'
		});
		if(options.direction==0){
			var sw=that.width(); //获取显示宽度
			var iw=that.find("li").width();//获取滑动项总数
		}else{
			var sh=that.height(); //获取显示高度
			var ih=that.find("li").height();//获取滑动项总数
		}
		var ic=that.find("li").length;//获取滑动项总数
		var pc=Math.ceil(ic/options.size);//获取共有多少组
		var last=options.size-1;
		var walk=ic-last-1;
		var prev_event=function(){
			page--;
			if(page<0)page=0;
			go(page);
			options.prev_callback(page);
		};
		var next_event=function(){
			page++;
			if(options.step>1){
				if(page>pc-1)page=pc-1;
			}else{
				if(page>walk)page=walk;
			}
			go(page);
			options.next_callback(page);
		};
		var go=function(page){
			if(options.step>1){
				page=page*options.step;
				if(page>walk)page=walk;
			}
			if(options.direction==0){
				that.find("ul").stop().animate({"margin-left":-(page*iw)+"px"},options.speed,options.easing);
			}else{
				that.find("ul").stop().animate({"margin-top":-(page*ih)+"px"},options.speed,options.easing);	
			}
			if(options.autoplay){
				clearTimeout(interval);
				interval=setTimeout(function(){
					page++;
					if(page == ic)page = 0;
					go(page);
				},options.interval);
			}
			//有数字分页
			$(options.prev).removeClass(options.prev_disable_class);
			$(options.next).removeClass(options.next_disable_class);
			//如果是第一个页面就锁定上一页
			if(page==0){
				$(options.prev).addClass(options.prev_disable_class);//变灰
			}
			//如果是最后一页，分两种情况，一种是一次走一页，另则是多页

			if(page==walk){
				$(options.next).addClass(options.next_disable_class);//变灰
			}
			if(options.pager!=''){
				$(options.pager).find("span").removeClass("current");
				if(options.step>1){
					pointNo=Math.ceil(page/options.step);
					$(options.pager).find("span:eq("+pointNo+")").addClass("current");
				}else{
					$(options.pager).find("span:eq("+pointNo+")").addClass("current");
				}
			}
		};
		if(pc>1){//大于一页的时候
			$(options.prev).addClass(options.prev_disable_class);
			$(options.prev).on("click",function(){//上一组
				prev_event();
			});
			$(options.next).on("click",function(){//下一组
				next_event();
			});
		}else{//箭头变灰(不可点击)
			$(options.prev).addClass(options.prev_disable_class);
			$(options.next).addClass(options.next_disable_class);
		}
		//分页
		if(options.pager!=''){
			btn='';
			for(var i=0; i<pc; i++) {
				btn += "<span data-id='"+i+"' "+(i==0?"class='current'":"")+">"+(i+1)+"</span>";
			}
			$(options.pager).html(btn);
			$(options.pager).find("span").on(options.pager_event,function(){
				var me=$(this);
				$(options.pager).find("span").removeClass("current");
				me.addClass("current");
				page=parseInt(me.data("id"));
				go(page);
				options.pager_callback(page);
			});
		}
		//自动播放
		if(options.autoplay){
			interval=setTimeout(function(){
				page++;
				go(page);
			},options.interval);
		}
		//支持拖拽
		if(options.drag){
			var isTouch=('ontouchstart' in window);
			//触摸支持
			if(isTouch){
				that.on('touchstart', function(e){
					var touch = e.originalEvent.changedTouches[0];
					var startX = touch.pageX;
					var startY = touch.pageY;
					$(document).on('touchmove',function(e){
						touch = e.originalEvent.touches[0] ||e.originalEvent.changedTouches[0];
						var endX=touch.pageX - startX;
						var endY=touch.pageY - startY;
						if(options.direction==0){
							if(Math.abs(endY)<Math.abs(endX)){
								if(endX > 10){
									$(this).off('touchmove');
									prev_event();
								}else if (endX < -10){
									$(this).off('touchmove');
									next_event();

								}
								return false;
							}
						}else{
							if(Math.abs(endY)>Math.abs(endX)){
								if(endY > 10){
									$(this).off('touchmove');
									prev_event();
								}else if (endY < -10){
									$(this).off('touchmove');
									next_event();
								}
								return false;
							}
						}
					});
				});
				$(document).on('touchend',function(){
					$(this).off('touchmove');
		
				});	
			}
    	}
		//支持滚轮
		if(options.mousewheel){
			that.mousewheel(function(event, delta, deltaX, deltaY) {
				if(delta>0){
					prev_event();
				}else{
					next_event();
				}
				return false;
			});
		}
		options.callback();
		return this;	
	};
})(jQuery);