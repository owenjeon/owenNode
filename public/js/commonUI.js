window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
	  window.setTimeout(callback, 1000 / 60);
	};
 })();

var OwenMotionScl = function(params){
	var defaults = {
		appearCl : ".bx_parallax",
		parallCl : ".img_para",
	};
	params = params || {};
	for (var prop in defaults) {
		if (prop in params && typeof params[prop] === 'object') {
			for (var subProp in defaults[prop]) {
				if (! (subProp in params[prop])) params[prop][subProp] = defaults[prop][subProp];
			}
		} else if (! (prop in params)) params[prop] = defaults[prop];
	};
	var _this = this, trans = transName;
	var appear, appLen, arrApp = [];
	var parall, parLen, arrPar = [];
	var motionT = quadEaseOut;

	this.animation = function(opts){ //자바스크립트 애니메이션
		if(!$(opts.ele).hasClass("show")){
			if(opts.finish)opts.finish();
			return;
		}else{
			var timePassed = new Date - opts.start;
			var progress = timePassed / opts.duration;
			if (progress > 1) progress = 1;
			var delta = opts.delta(progress);
			opts.step(delta);
			if (progress != 1) {
				requestAnimFrame(function(){
					_this.animation(opts);
				});
			}else{
				if(opts.finish)opts.finish();
			}
		}
	};

	this.move = function (ele, delta, duration, interval) {
		ele.className += " moving";
		var to = 100;
		setTimeout(function(){
			_this.animation({
				delay: 10,
				duration: duration || 1000, // 1 sec by default
				start : new Date(),
				delta: delta,
				ele : ele,
				step: function (delta) {
					ele.style.opacity = delta;
					ele.style[transName] = 'translateY('+(to-delta*to)+'px)';
				},
				finish : function(){
					ele.className = ele.className.replace(/\b moving\b/,'');
				}
			});
		},interval*1000);
	};

	this.align = function(){
		var trans = transName;
		var wT = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop,
			wH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
			wB = wT + wH;
			 //나타나는 모션
		var len = arrApp.length, i;
		for(i = 0 ; i < len ; i++){
			var bx = arrApp[i];
			var bxHead = Math.round(bx.offset().top - ((trans ? parseInt(bx.css(trans).replace(/[^0-9\-.,]/g, '').split(',')[5]) : parseInt(bx.css(trans))) || 0));
			var bxFoot = bxHead + bx.outerHeight();
			if(wT < bxFoot && wB > bxHead){
				if(!bx.hasClass('show')){
					bx.addClass('show');
					if(!bx.hasClass('moving')) _this.move(bx[0], motionT, 1500, bx.data('para-delay') || 0);
				}
			}else if(wT >= bxFoot){
				if(!bx.hasClass('show'))bx.addClass('show').css({"opacity":1});
			}else{
				if(bx.hasClass('show'))bx.removeClass('show').css({"opacity":0});
			}
		}

		//시차 모션
		var paraLen = arrPar.length, j;
		for(j = 0 ; j < paraLen ; j++){
			var paraBx = arrPar[j];
			var paraBxHead = Math.round(paraBx.offset().top || 0);
			var paraH = paraBx.outerHeight();
			var paraBxFoot = paraBxHead + paraH;
			if(paraBx.hasClass("ani")){
				var flag = true;
			}else{
				var flag = true;
			}

			if(wT < paraBxFoot && wB > paraBxHead){
				var imgT = paraBx.offset().top;
				var rate = ((paraBx.data('rate') || 0.5));
				var delta = paraBx.hasClass('front') ? Math.max(Math.min((wT+wH-imgT)/(wH+paraH),1),0) : Math.max(Math.min(1-(wT+wH-imgT)/(wH),1),-1);
				if( paraBx.hasClass('front') )console.log(Math.max(Math.min((wT+wH-imgT)/(wH+paraH),1),0))
				var dist =  -Math.floor(delta*paraH*rate); //시차 길이
				if(trans){
					motion(paraBx, dist);
				}else{
					paraBx.find(">*").stop().animate({"margin-top":dist}, 300);
				}
			}
		}

		function motion(paraBx, dist){
			requestAnimFrame(function(){
				paraBx.find(">*")[0].style[trans] = 'translateY('+dist+'px)';
			});
		}
	};

	this.init = function(){
		if(isieLw) return;
		arrApp = [], arrPar = [];
		appear = $(params.appearCl)
		appLen = appear.length;
		var i;
		for(i = 0 ; i < appLen ; i++) arrApp.push(appear.eq(i));
		parall = $(params.parallCl)
		parLen = parall.length;
		var i;
		for(i = 0 ; i < parLen ; i++) arrPar.push(parall.eq(i));

		if(appLen || parLen){
			_this.align();
			$(window).off('resize scroll', _this.align).on('resize scroll',_this.align);
		}
	};
	this.init();
};

var OwenLayout = function(ele, params){ //owen edit 2016-06-15
	var defaults = {
		minW : 1024,
		minH : 700,
		sect : ".owen_sect",
		pageStop : ".owen_pageStop",
		windowHCl : 'winHeit',
		wheelMotion : false,
		bg_change : false,
		nav : ''
	};
	params = params || {};
    for (var prop in defaults) {
        if (prop in params && typeof params[prop] === 'object') {
            for (var sProp in defaults[prop]) {if (! (sProp in params[prop])) params[prop][sProp] = defaults[prop][sProp];}
        } else if (! (prop in params)) params[prop] = defaults[prop];
    };

    _this = this;
	var sect, pageStop, aniFlag = false, nav, html = $("html"), sectArr, sectLen;


	this.scrollMotion = function(){
		var i, sec;
		for (i = 0; i < sectLen; i++) {
			sec = sectArr[i].item, id = sectArr[i].id;
			if (sec.offset().top + (sec.height()/2) > $(window).scrollTop()) {
				if(!sec.hasClass("shown")){
					sec.addClass('shown');
					_this.eachSectFnShow && _this.eachSectFnShow[id] && typeof _this.eachSectFnShow[id] === 'function' ? _this.eachSectFnShow[id]() : null;
				}
				if(!sec.hasClass("on")){
					sect.filter('.on').removeClass('on');
					sec.addClass('on');
					if(nav) {
						if(sectArr[i].navIdx !== undefined){
							nav.find('> *').eq(sectArr[i].navIdx).siblings().removeClass('on').end().addClass('on');
						}else{
							nav.find('> *').removeClass('on');
						}
					}
				}

				if(params.bg_change && !html.hasClass('bd_bg'+(i))){
					for(var j = 0 ; j < sect.length ;j++)html.removeClass('bd_bg'+j);
					html.addClass('bd_bg'+(i));
				}
				break;
			}
		}
	};

    this.align = function(){
    	var vW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var vH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		for(var i = 0 ; i < sectLen ; i++){
			var bx = sectArr[i].item;
			if(sectArr[i].winH){
				var min = sectArr[i].minH;
				if((min === 'none'|| ((min || params.minH) && vH >= min) && vW >= params.minW)) bx.css({'height':vH});
				else if(sectArr[i].conPosi === 'abs') bx.css({'height':min});
				else bx.css({'height':''});
			}
		}

		if(params.wheelMotion){
			if(vW > params.minW && vH > params.minH){
				var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel"; //FF doesn't recognize mousewheel as of FF3.x
				_this.outBx.on(mousewheelevt,function(e){_this.scroll(e);});
			}else{_this.outBx.off(mousewheelevt);}
		}
		_this.scrollMotion();
    };


	this.init = function(o){
		o = o || {};
	    this.outBx = $(ele);
	    sect = this.outBx.find(params.sect);
	    pageStop = sect.filter(params.pageStop);
	    aniFlag = false;
		nav = (o.nav && $(o.nav)) || (params.nav && $(params.nav));
		sectArr = [];
		for(var k = 0 ; k < sect.length ; k++){
			var item = sect.eq(k);
			var minH = item.data('minh');
			sectArr.push({
				item : item,
				title : item.data('title') || '',
				minH : minH ? (minH === 'none' ? minH : parseInt(minH)) : (params.minH ? parseInt(params.minH) : 0),
				conPosi : item.data('con-posi'),
				id : item.prop('id'),
				winH : item.hasClass(params.windowHCl)
			});
		}
		sectLen = sectArr.length;
	    this.align();
		$(window).off("resize",_this.align).on("resize",_this.align);
	    $(window).off('scroll',_this.scrollMotion).on('scroll',_this.scrollMotion);

		if(nav){
			var navSect = [], str = "", navIdx = 0;
			for(var i = 0 ; i < sectLen ; i++) if(sectArr[i].title) navSect.push(sectArr[i]), sectArr[i].navIdx = navIdx++;
			for(var j = 0, len = navSect.length ; j < len ; j++){
				str +='<li><a href="javascript:;" data-idx="'+j+'"><span class="tit">'+navSect[j].title+'</span><span class="ico"><span>&nbsp;</span></span><span class="h100"></span></a></li>\n';
			}
			nav.html(str);
			nav.find('a').on('click',function(){
				var wT = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
				var wH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				var tOffTop = navSect[$(this).data('idx')].item.offset().top;
				if(Math.abs(wT - tOffTop) > wH) window.scrollTo(0,tOffTop);
				else $("html,body").animate({scrollTop : tOffTop},600);
			});
		}
	};
	this.init();

    this.scroll = function(e){
		if(aniFlag){e.preventDefault(); return;}
		var direc, delta;
		e.originalEvent.wheelDelta ? delta = -e.originalEvent.wheelDelta : delta = e.originalEvent.detail;
		delta > 0 ? direc = 1 : direc = -1;
		var wsc = $(window).scrollTop();
		var wH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		for(var i = 0; i < pageStop.length ; i++){
			var iEle = pageStop.eq(i);
			if(iEle.offset().top+(direc == 1 ? iEle.height()-1 : 1) > wsc){
				if(direc == -1 && i == 0) return;
				if(!pageStop.eq(i+direc).length) return;
				if(iEle.height() > wH){if(direc == 1 && (pageStop.eq(i+direc).offset().top+200) > (iEle.height()+wsc)) return;}
				e.preventDefault();
				aniFlag = true;
				$("html, body").animate({scrollTop:pageStop.eq(i+direc).offset().top}, 700, "easeInOutQuad", function(){
					setTimeout(function(){aniFlag = false;},400);
				});
				break;
			}
		}
	};
};

function transitionName () {
	var i,
		undefined,
		el = document.createElement('div'),
		transforms = {
			'transform':'transform',
			'OTransform':'-o-transform',  // oTransitionEnd in very old Opera
			'msTransform':'-ms-transform',
			'MozTransform':'-moz-transform',
			'webkitTransform':'-webkit-transform'
		};

	for (i in transforms) {
		if (transforms.hasOwnProperty(i) && el.style[i] !== undefined) {
			return transforms[i];
		}
	}
}
var transName = transitionName();


var multiSilde = function(el, params){
	var defaults = {
		list : " > .owen-ms-wrap > li",
		paging : "",
		speed : 300,
		initialSlide : 0,
		activeW : 0,
		slidesW : 0,
		autoplay : "",
		easing : "swing",
		mode : 'horizontal',
		onLoad : function(){},
		onSlideChangeStart : function(){},
		onSlideChangeEnd : function(){}
	};
	params = params || {};
	for (var prop in defaults) {
		if (prop in params && typeof params[prop] === 'object') {
			for (var subProp in defaults[prop]) {if (! (subProp in params[prop])) params[prop][subProp] = defaults[prop][subProp];}
		} else if (! (prop in params)) {params[prop] = defaults[prop];}
	};

	var _this = this;
	this.bx = $(el);
	this.activeIdx = "";
	var bx = this.bx, area = ( params.mode === 'horizontal' ? 'width' : 'height' ), dirc = ( params.mode === 'horizontal' ? 'left' : 'top' ) ,space = bx.css(area);
	var oriLi = bx.find(params.list), oriLen = oriLi.length, ul = oriLi.parent(), interval = "";
	var li, len, page = bx.find(params.paging), flag = true, activeSlide;
	this.list = [];

	this.adjustW = function(active){
		li.css(area, params.slidesW || space);
		if(params.activeW) active.css(area, params.activeW);
	};

	this.slideTo = function(idx, speed, flg){
		if(flg === undefined) flg = true;
		var sd = this.list[idx];
		if(!flag) return;
		flag = false;
		speed = (speed === undefined) ? params.speed : speed;
		var mo, sdIdx = sd.index(), dist = sd.position()[dirc] - (params.activeW && activeSlide && activeSlide.index() < sd.index()  ? params.activeW - params.slidesW : 0);
		_this.activeIdx = sdIdx;
		if(flg) params.onSlideChangeStart();
		var aniEle = {};
		aniEle[area] = params.slidesW;
		if(activeSlide && params.slidesW) activeSlide.animate(aniEle,speed, params.easing);
		aniEle = {}, aniEle[area] = params.activeW;
		if(params.activeW) sd.animate(aniEle,speed, params.easing);

		aniEle = {}, aniEle[dirc] = -dist;
		ul.animate(aniEle,speed, params.easing, function(){
			if(sdIdx <= 1 || sdIdx >= len-2){ //솔루션화 하려면 이 부분을 좀더 보강해야 한다.
				sd = sdIdx <= 1 ? _this.list[sdIdx+oriLen] : _this.list[sdIdx-oriLen];
				dist = sd.position()[dirc] - (params.activeW && activeSlide && sdIdx <= 1  ?params.activeW - params.slidesW : 0 );
				sdIdx = sd.index();
				_this.adjustW(sd);
				ul.css(dirc,-dist);
			}

			activeSlide = sd.siblings('.active').removeClass('active').end().addClass('active');
			_this.activeIdx = sdIdx;
			if(!flg) params.onSlideChangeEnd();
			flag = true;
		});
	};

	this.slideNext = function(){_this.slideTo(_this.activeIdx+1)};
	this.slidePrev = function(){_this.slideTo(_this.activeIdx-1)};

	this.init = function(){
		space = bx.css(area,'').css(area);
		this.adjustW(_this.list[_this.activeIdx]);
		this.slideTo(_this.activeIdx,0,false);
	};
	this.align = function(){
		{ //솔루션화 하려면 이 부분을 좀더 보강해야 한다.
			var addSlide = oriLi.eq(0).add(oriLi.eq(1)).clone().addClass('duplicate');
			ul.append(addSlide);
			addSlide = oriLi.eq(oriLen-1).add(oriLi.eq(oriLen-2)).clone().addClass('duplicate');
			ul.prepend(addSlide);
		}
		var initSlide = oriLi.eq(params.initialSlide);
		li = bx.find(params.list), len = li.length;
		var list = _this.list;
		for(var i = 0 ; i < len ; i++) list.push(li.eq(i));
		len = list.length;
		this.adjustW(initSlide);
		$(li).checkImgsLoad(function(){
			var wd = 0;
			for(var j = 0 ; j < len ; j++){
				wd += parseInt(list[j].css(area));
			}
			ul.css(area, wd);
			_this.slideTo(initSlide.index(),0, false);
			params.onLoad();
		});
	};
	this.align();
};//multiSilde

var FadeSlide = function(el, params){
	var defaults = {
		list : " > ul.owen-fs-wrap > li",
		paging : "",
		speed : 6000,
		initialSlide : 0,
		autoplay : "",
		onFadeStart : function(){},
		onFadeEnd : function(){}
	};
	params = params || {};
	for (var prop in defaults) {
		if (prop in params && typeof params[prop] === 'object') {
			for (var subProp in defaults[prop]) {if (! (subProp in params[prop])) params[prop][subProp] = defaults[prop][subProp];}
		} else if (! (prop in params)) {params[prop] = defaults[prop];}
	};

	var _this = this;
	this.bx = $(el);
	this.activeIdx = "";
	var bx = this.bx, li = bx.find(params.list), interval = "";
	var len = li.length, page = bx.find(params.paging), flag = true;

	this.rolling = function(){ //루프
		interval = setTimeout(function(){
			var nowIdx = li.filter(".on").index() || 0;
			var idx = (nowIdx+1)%len;
			_this.fadeTo(idx, 'roll');
		},params.autoplay);
	};

	this.fadeTo = function(idx, type){ //모션
		var liOn = li.eq(idx);
		this.activeIdx = idx;
		if(flag){
			flag = false;
			if(type !== "roll")clearTimeout(interval);
			params.onFadeStart(_this);
			if(params.paging) page.find('a').eq(idx).siblings('.on').removeClass('on').end().addClass('on'); //페이지네이션
			liOn.siblings('.on').removeClass('on').end().addClass('on').animate({opacity:1}, params.speed, 'linear' ,function(){
				params.onFadeEnd(_this);
				flag = true;
				liOn.siblings().css({opacity:0});
				if(params.autoplay) _this.rolling();
			});
		}
	};
	this.align = function(){ //초기 정렬 함수
		li.eq(params.initialSlide).addClass('on').siblings().css({opacity:0}).parent().children().css("visibility","visible");
		if(params.paging){
			var str = "";
			for(var i = 0 ; i < len ; i++) str +="<a class='"+(i == params.initialSlide ? "on" : "")+"' href='javascript:;'>&nbsp;</a>\n";
			page.html(str);
			for(var j = 0 ; j < len ; j++) page.find(">a").eq(j).off('click').on('click',function(){_this.fadeTo($(this).index())});
		}

		_this.fadeTo(params.initialSlide)
	};
	this.align();

};

var AlginHeightTiles = function(el,target, resize){
	var resizeTimer
	var ele = $(el);
	var len = ele.length;
	var bx = ele.parent();
	var _this = this;


	var list = {ele : [],height : []};
	var tLen = target ? target.length : 1;
	for(var k = 0 ; k < tLen ; k++ ){
		list.ele[k] = [],list.height[k] = [];
	}
	this.setHeight = function(idx){
		for(var j = 0 ; j < tLen ; j++ ){
			var liH = Math.max.apply(Math, list.height[j]); //대상들 끼리 높이 비교
			for( l = 0 ; l < idx ; l++){
				list.ele[j][l].height(liH); //대상들끼리 높이 세팅
			}
			list.ele[j] = [],list.height[j] = [];
		}
	};
	this.align = function(){
		var pos1, pos2;
		var idx = 0;
		for(var i = 0; i < len ; i++){
			var ee = ele.eq(i);
			pos2 = parseInt(ee.offset().top);
			if((pos1 !== undefined && pos1 !== pos2)){
				_this.setHeight(idx);
				pos2 = parseInt(ee.offset().top);
				idx = 0;
			}
			for(var m = 0 ; m < tLen ; m++ ){
				list.ele[m][idx] = target ? ee.find(target[m]) : ee;
				list.height[m][idx] = list.ele[m][idx].css('height','').height();
			}
			pos1 = pos2;
			idx++;
			if(i === (len-1))_this.setHeight(idx);
		}
	};
	this.align();
	if(!resize){
		$(window).on('resize',_this.align);
	}
};

function scrollToAni(o){
	var t = typeof o.target === "string" ? $(o.target) : o.target;
	var du = o.du || 400;
	var margin = o.mg || 0;
	$('body,html').animate({scrollTop : t.offset().top - margin},du);
}
function headerFixing(){
	var hd = $("#header");
	var lnb = $("#area_lnb");
	var gnb = $("#gnb"), gnbH = gnb.height();
	$(window).on('scroll',function(){
		var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		var sct = document.body.scrollTop  + document.documentElement.scrollTop;
		if(sct <= 0 && hd.hasClass('fix'))hd.removeClass('fix');
		else if(sct > 0 && !hd.hasClass('fix'))hd.addClass('fix');

		if(sct > 20 &&  !lnb.hasClass('min'))lnb.addClass('min');
		else if(sct <= 20 &&  lnb.hasClass('min'))lnb.removeClass('min');
	})
}

function doOnOrientationChange(ladnFn, portFn) {
    switch (window.orientation) {
        case -90:
        case 90:
            if(ladnFn) ladnFn();
            break;
        default:
            if(portFn) portFn();
            break;
    }
}
