//check browser
var isie=(/msie/i).test(navigator.userAgent); //ie
var isie6=(/msie 6/i).test(navigator.userAgent); //ie 6
var isie7=(/msie 7/i).test(navigator.userAgent); //ie 7
var isie8=(/msie 8/i).test(navigator.userAgent); //ie 8
var isie9=(/msie 9/i).test(navigator.userAgent); //ie 9
var isie10=(/msie 10/i).test(navigator.userAgent); //ie 9
var isfirefox=(/firefox/i).test(navigator.userAgent); //firefox
var isapple=(/applewebkit/i).test(navigator.userAgent); //safari,chrome
var isopera=(/opera/i).test(navigator.userAgent); //opera
var isios=(/(ipod|iphone|ipad)/i).test(navigator.userAgent);//ios
var isipad=(/(ipad)/i).test(navigator.userAgent);//ipad
var isandroid=(/android/i).test(navigator.userAgent);//android
var device;
var isieLw;
if(isie6 || isie7 || isie8){ isieLw=true;}
//if(isie9){ isie=false;}
//if(isapple || isios || isipad || isandroid){}else{}

var mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}


$.fn.extend({
    ensureLoad: function(handler) {//개별 이미지 로드 완료 체크
        return this.each(function() {
            if(this.complete) {
                handler.call(this);
            }else{
                $(this).load(handler);
                this.onerror = function(){
                	handler.call(this);
                }
            }
        });
    },
    checkImgsLoad : function(fn){ //다중 이미지 로드 완료 체크
		var img = this.find('img[src!=""]');
		var cntLoad = 0;
		if(img.length === 0){
			fn();
		}else{
			return img.ensureLoad(function(){
				cntLoad++;
				if(cntLoad === img.length){
					fn();
				}
			});
		}
	},
    imagesLoaded : function (fn) {
        var $imgs = this.find('img[src!=""]');
        if (!$imgs.length) {fn();return;}
        var dfds = [], cnt = 0;
        $imgs.each(function(){
            var dfd = $.Deferred();
            dfds.push(dfd);
            var img = new Image();
            img.onload = function(){check();}
            img.onerror = function(){check();}
            img.src = this.src;
        });
        function check(){
            cnt++;
            cnt === $imgs.length ? fn() : null;
        }
    }
});


/* common 팝업 */
var popFn = {
	show : function(t, params){
		var defaults = {
            onStart : "",
			onLoad : function(){},
			onClose : "",
			btnCloseCl : 'btn_close',
			bgId : '#pop_bg_common.t1',
            bgClickAble : true,
			align : true,
			htmlCl : "",
            resize : true
		};
		params = params || {};
	    for (var prop in defaults) {
	        if (prop in params && typeof params[prop] === 'object') {
	            for (var subProp in defaults[prop]) {if (! (subProp in params[prop])) params[prop][subProp] = defaults[prop][subProp];}
	        } else if (! (prop in params)) {params[prop] = defaults[prop];}
	    };
        var _this = this;
		if($("body > "+params.bgId).length === 0){
            var bg_id = params.bgId.substring(params.bgId.indexOf('#')+1, params.bgId.indexOf('.') === -1 ? params.bgId.length : params.bgId.indexOf('.'));
            var bg_class = params.bgId.replace("#"+bg_id,"").replace("."," ");
			$("body").append($("<div></div>").prop({id : bg_id}).addClass(bg_class));
		}
		var bg = $("body > "+params.bgId);
		params.htmlCl && $('html').addClass(params.htmlCl);
        t.css('display','block');
		bg.css('display','block');
        !params.onStart ? show() : params.onStart(t, show);
        function show(){
    		var posi = t.css('position');
    		t.checkImgsLoad(function(){
    			bg.addClass('on');
    			if(params.bgClickAble) bg.off('click').on('click',function(){popFn.hide(t,'',params.bgId, params.onClose);});
    			if(params.align){popFn.resize({data : {tg : t, posi : posi}});};
    			t.addClass('on');
    			t.find('.'+params.btnCloseCl).on('click',function(){popFn.hide(t,'',params.bgId, params.onClose);});
    			if(params.onLoad)params.onLoad();
    		});
    		if(params.align && params.resize){$(window).on('resize', {tg : t, posi : posi}, popFn.resize);};
            _this.close = function(){popFn.hide(t,'',params.bgId, params.onClose);}
        }
	},
	hide : function(t, change, bgId, onClose){
		var bg = bgId ? $(bgId): $("#pop_bg_common");
		onClose ? onClose() : "";
		bg.off('click');
		if(!change)bg.removeClass('on');
		t.removeClass('on notrans');
		$('html').removeClass('of_hide2');
		setTimeout(function(){
			if(!change)bg.remove();
			t.css('display','none');
			t.css({'max-height':'', "top":''});
		},500);
		$(window).off('resize', popFn.resize);
        this.close = null;
	},
	resize : function(e){
		var t = e.data.tg;
		var vH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		var bxH = t.outerHeight();
		var scl = e.data.posi =='fixed' ? 0 : $(window).scrollTop();
		t.css({"top":( bxH > vH ? scl : (vH-bxH)/2+scl )+"px"});
	}
};


/* imgAlign */
function imgAlign(obj, o){
    o = o || {};
	if (typeof(obj) == "object"){
		for( var i = 0 ; i < obj.length ; i++){
			var divs = $(obj[i]);
			action();
		}
	}else{
		var divs = $(obj);
		action();
	}

	function action(){
		divs.each(function(){
			var $this = $(this);
			var divAspect = $this.outerHeight() / $this.outerWidth();
			var img = $this.find('>img');
			img.ensureLoad(function(){
				var imgAspect = img.outerHeight() / img.outerWidth();
				if (imgAspect <= divAspect) {
					var imgWidthActual = $this.outerHeight() / imgAspect, imgWidthToBe = $this.outerHeight() / divAspect, marginLeft;
					if(!img.parent().hasClass('no_center')){
						marginLeft = -Math.round(((imgWidthActual/$this.outerWidth())-1) / 2 * 100000)/1000;
					}else{
						marginLeft = 0;
					}
					img.removeClass('w100p').addClass('h100p').css({"margin-left":marginLeft+"%", "top":0});
				} else {
					var imgHeightActual = $this.outerWidth() * imgAspect, imgHeightToBe = $this.outerWidth() * divAspect, marginTop
					if(!img.parent().hasClass('no_center')){
						marginTop = -Math.round(((imgHeightActual/$this.outerHeight())-1) / 2 * 100000)/1000;
					}else{
						marginTop = 0;
					}
					img.removeClass('h100p').addClass('w100p').css({"top":marginTop+"%", "margin-left":0});
				}
				if(img.hasClass('ict_hide'))img.removeClass('ict_hide');
			});
		});//each
	}
    if(o.resize){
        $(window).resize(action);
    }
}//imgAlign

/*ajax 팝업 띄우기*/
function ajaxShowPopCont(o){
	var t = o.target ? $(o.target) : $("#pop_bx_common");
	o.data = o.data || {};
	o.bg = o.bg || "#pop_bg_common.t1";
	$.ajax({
		url : o.url,
		type : o.type || "get",
		dataType : "html",
		data : o.data,
		success : function(data){
			if(!o.append)t.html('');
			t.append(data);
			var popup = o.pop ? $(o.pop) : t.find(">*").eq(0);
			popFn.show(popup, {motion : o.motion || true, bgId : o.bg, onStart : o.onStart, onLoad : o.onLoad, onClose : o.onClose, resize : o.resize === undefined ?  true : o.resize});
		},
		error : function(a,b,c){
			alert(c);
		}
	})
}

(function($) {
	$.fn.customSelect = function(settings) {
		var config = {
			replacedClass: 'custom-select-replaced', // Class name added to replaced selects
			customSelectClass: 'custom-select', // Class name of the (outer) inserted span element
			activeClass: 'custom-select-isactive', // Class name assigned to the fake select when the real select is in hover/focus state
			wrapperElement: '<div class="custom-select-container" />' // Element that wraps the select to enable positioning
		};
		if (settings) {
			$.extend(config, settings);
		}
		this.each(function() {
			var select = $(this);
			if(select.parent().hasClass('custom-select-container')){
				var par = select.parent();
				val = par.find('option:selected', this).text();
				par.find('.'+config.customSelectClass+' span span').text(val);
				return;
			}
			select.addClass(config.replacedClass);
			select.wrap(config.wrapperElement);
			var update = function() {
				val = $('option:selected', this).text();
				span.find('span span').text(val);
			};
			// Update the fake select when the real select’s value changes
			select.change(update);
			select.keyup(update);
			var span = $('<span class="' + config.customSelectClass + '" aria-hidden="true"><span><span>' + $('option:selected', this).text() + '</span></span></span>');
			select.after(span);
			// Change class names to enable styling of hover/focus states
			select.on({
				mouseenter: function() {
					span.addClass(config.activeClass);
				},
				mouseleave: function() {
					span.removeClass(config.activeClass);
				},
				focus: function() {
					span.addClass(config.activeClass);
				},
				blur: function() {
					span.removeClass(config.activeClass);
				},
				change: function() {
					span.removeClass(config.activeClass);
				}
			});
		});
	};
})(jQuery);

var translateOptions = {
    getTranslate : function (el, axis) {
        'use strict';
         var matrix, curTransform, curStyle, transformMatrix;
        if (this.support.transforms) {
            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {transformMatrix = new WebKitCSSMatrix(curStyle.webkitTransform === 'none' ? '' : curStyle.webkitTransform);}
            else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }

            if (axis === 'x') {
                if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; //Latest Chrome and webkits Fix
                else if (matrix.length === 16) curTransform = parseFloat(matrix[12]);//Crazy IE10 Matrix
                else curTransform = parseFloat(matrix[4]);//Normal Browsers
            }
            if (axis === 'y') {
                if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; //Latest Chrome and webkits Fix
                else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); //Crazy IE10 Matrix
                else curTransform = parseFloat(matrix[5]);//Normal Browsers
            }
        }
        else {
            if (axis === 'x') curTransform = parseFloat(el.style.left, 10) || 0;
            if (axis === 'y') curTransform = parseFloat(el.style.top, 10) || 0;
        }
        return curTransform || 0;
    },

    /*==================================================
        Helpers
    ====================================================*/
    setTransform : function (el, transform) {
        'use strict';
        var es = el.style;
        es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = transform;
    },
    setTranslate : function (el, translate) {
        'use strict';
        var es = el.style;
        var pos = {x : translate.x || 0, y : translate.y || 0, z : translate.z || 0};
        var transformString = this.support.transforms3d ? 'translate3d(' + (pos.x) + 'px,' + (pos.y) + 'px,' + (pos.z) + 'px)' : 'translate(' + (pos.x) + 'px,' + (pos.y) + 'px)';
        es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = transformString;
        if (!this.support.transforms) {
            es.left = pos.x + 'px';
            es.top = pos.y + 'px';
        }
    },
    setTransition : function (el, duration) {
        'use strict';
        var es = el.style;
        es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = duration + 'ms';
    },

    /*==================================================
        Feature Detection
    ====================================================*/
    support: {
        touch : (window.Modernizr && Modernizr.touch === true) || (function () {
            'use strict';
            return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
        })(),
        transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
            'use strict';
            var div = document.createElement('div').style;
            return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
        })(),
        transforms : (window.Modernizr && Modernizr.csstransforms === true) || (function () {
            'use strict';
            var div = document.createElement('div').style;
            return ('transform' in div || 'WebkitTransform' in div || 'MozTransform' in div || 'msTransform' in div || 'MsTransform' in div || 'OTransform' in div);
        })(),
        transitions : (window.Modernizr && Modernizr.csstransitions === true) || (function () {
            'use strict';
            var div = document.createElement('div').style;
            return ('transition' in div || 'WebkitTransition' in div || 'MozTransition' in div || 'msTransition' in div || 'MsTransition' in div || 'OTransition' in div);
        })(),
        classList : (function () {
            'use strict';
            var div = document.createElement('div');
            return 'classList' in div;
        })()
    }
};


/*라디오 버튼*/
function checkradio(me){
	var name = me.getAttribute("name");
	setTimeout(function(){
	    if($(me).prop("checked") == false){
	    }else{
	    	$("input[name='"+name+"']").parent().removeClass("on");
	    	$(me).parent().addClass("on");
	    }
	},1)
    return $(me).prop("checked");
}

/*체크박스*/
function checkChkbox(me, p){
	var t;
	p ? t = $(me).closest(p) : t = $(me).parent();
    if($(me).prop("checked") == false) t.removeClass("on");
    else t.addClass("on");
    return $(me).prop("checked");
}
var checkCallbackFn = function(){};
var radioCallbackFn = function(){};

function setChkAndRadio(el){
    el = el || $('.chk_motion');
    var t = $(el);
    t.find('input').filter(function(){return $(this).prop('checked')}).parent().addClass('on');
    t.find('input').filter(function(){return $(this).prop('checked') === false}).parent().removeClass('on');
    t.find('input[type=radio]').off('click', checkCallbackFn).on('click', window.checkCallbackFn = function(){checkradio(this)});
    t.find('input[type=checkbox]').off('click', radioCallbackFn).on('click', window.radioCallbackFn = function(){checkChkbox(this)});
}


/* placeholder */
var placeHFn = {
	align : function(){
		var t = $(".placeh");
		var lb, ip, id;
		var _this = this;
		for(var i = 0 ; i < t.length ; i++){
			lb = t.eq(i).find("label");
			ip = t.eq(i).find("input").length > 0 ? t.eq(i).find("input") : t.eq(i).find("textarea");
			id = lb.attr('for');
			_this.fns(id, lb, ip);
		}
	},
    fns : function(id, lb, ip){
        var _this = this;
        lb.off('click').on('click',function(){placeHFn.focus(id);});
        ip.off('focus').on('focus',function(){_this.hideLabel(id);});
        ip.off('blur').on('blur',function(){_this.showLabel(id);});
        if($("#"+id).val() !== "")_this.hideLabel(id);
    },
	focus : function(id){
		$("#"+id).focus();
	},
	hideLabel : function(id){
		var ele = $("label[for='"+id+"']");
		ele.css("display","none");
	},
	showLabel : function(id){
		if($("#"+id).val() == ""){
			var ele = $("label[for='"+id+"']");
			ele.css("display","");
		}
	}
}


function setLocalData(o){
	if(typeof(Storage) !== "undefined") {
	    localStorage.setItem(o.name, o.data);
	} else {
	    setCookie(o.name, o.data, 1);
	}
}

function getLocalData(o){
	if(typeof(Storage) !== "undefined") {
	    return localStorage.getItem(o.name);
	} else {
	    return getCookie(o.name);
	}
}

function removeLocalData(o){
	if(typeof(Storage) !== "undefined") {
	    return localStorage.removeItem(o.name);
	} else {
		document.cookie = o.name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
}

function initFileUploads(type, str) {
    var W3CDOM = (document.createElement && document.getElementsByTagName);
    str = str || "";
	if (!W3CDOM) {
		return;
	}
	var fakeFileUpload = document.createElement('div');
	fakeFileUpload.className = 'fakefile';
	var inputbox = document.createElement('input')
	fakeFileUpload.appendChild(inputbox);
	fakeFileUpload.getElementsByTagName('input')[0].className = 'ipt';
	fakeFileUpload.getElementsByTagName('input')[0].readOnly = true;
	if (type == 'btn') {
		var btn = document.createElement('button');
		fakeFileUpload.appendChild(btn);
	} else {
		var image = document.createElement('img');
		image.src = '/images/btn/btn_upload_off.gif';
		fakeFileUpload.appendChild(image);
	}

	var x = document.getElementsByTagName('input');

	for (var i = 0; i < x.length; i++) {
		if (x[i].type != 'file') continue;
		if (x[i].parentNode.className != 'fileinputs' || $(x[i]).next().hasClass('fakefile')) continue;
		//x[i].className = 'file';
		x[i].className = "file"+str;
		var clone = fakeFileUpload.cloneNode(true);
		x[i].parentNode.appendChild(clone);
		x[i].relatedElement = clone.getElementsByTagName('input')[0];
		x[i].onchange = x[i].onmouseout = function() {
			this.relatedElement.value = this.value;
		}
		if (type == 'btn') {
			var btn_txt = x[i].parentNode.getAttribute("data-text");
			x[i].parentNode.getElementsByTagName('button')[0].innerHTML = btn_txt;
			$(x[i].parentNode.getElementsByTagName('button')[0]).on('click', function() {
				return false;
			})
		}
	}

}

(function() {
  if (!Event.prototype.preventDefault) {Event.prototype.preventDefault=function() {this.returnValue=false;};}
  if (!Event.prototype.stopPropagation) {Event.prototype.stopPropagation=function() {this.cancelBubble=true;};}
  if (!Element.prototype.addEventListener) {var eventListeners=[];
    var addEventListener=function(type,listener /*, useCapture (will be ignored) */) {
      var self=this;
      var wrapper=function(e) {
        e.target=e.srcElement;
        e.currentTarget=self;
        if (typeof listener.handleEvent != 'undefined') {
          listener.handleEvent(e);
        } else {
          listener.call(self,e);
        }
      };
      if (type=="DOMContentLoaded") {
        var wrapper2=function(e) {
          if (document.readyState=="complete") {wrapper(e);}
        };
        document.attachEvent("onreadystatechange",wrapper2);
        eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper2});

        if (document.readyState=="complete") {
          var e=new Event();
          e.srcElement=window;
          wrapper2(e);
        }
      } else {
        this.attachEvent("on"+type,wrapper);
        eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper});
      }
    };
    var removeEventListener=function(type,listener /*, useCapture (will be ignored) */) {
      var counter=0;
      while (counter<eventListeners.length) {
        var eventListener=eventListeners[counter];
        if (eventListener.object==this && eventListener.type==type && eventListener.listener==listener) {
          if (type=="DOMContentLoaded") this.detachEvent("onreadystatechange",eventListener.wrapper);
          else this.detachEvent("on"+type,eventListener.wrapper);
          eventListeners.splice(counter, 1);
          break;
        }
        ++counter;
      }
    };
    Element.prototype.addEventListener=addEventListener;
    Element.prototype.removeEventListener=removeEventListener;
    if (HTMLDocument) {
      HTMLDocument.prototype.addEventListener=addEventListener;
      HTMLDocument.prototype.removeEventListener=removeEventListener;
    }
    if (Window) {
      Window.prototype.addEventListener=addEventListener;
      Window.prototype.removeEventListener=removeEventListener;
    }
  }
})();

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


var chkAccount = {
	id : function(id){
		var t = $(id), list = t.closest('li'), meg = list.find(".status");
		if(this.nul(t,meg, list)) return;
		if(t.val().length < 4 || t.val().length > 13 ){
			list.removeClass("good").addClass('bad');
			meg.html("4 ~ 13자를 입력해주세요.");
			return;
		}else{
			list.addClass("good").removeClass('bad');
			meg.html("&nbsp;");
		}
	},
	charactor : function(id){
		var t = $(id), list = t.closest('li'), meg = list.find(".status");
		if(this.nul(t,meg, list)) return;
		if(t.val().length < 4 || t.val().length > 13 ){
			list.removeClass("good").addClass('bad');
			meg.html("4 ~ 13자를 입력해주세요.");
			return;
		}else{
			list.addClass("good").removeClass('bad');
			meg.html("&nbsp;");
		}
	},
	pw01 : function(id){
		var t = $(id), list = t.closest('li'), meg = list.find(".status");
		if(this.nul(t,meg, list)) return;
		var chk = 0;
		if(t.val().search(/[0-9]/g) != -1 ) chk ++; //숫자
	    if(t.val().search(/[a-z]/ig)  != -1 ) chk ++; //영문
	    //if(t.val().search(/[!@#$%^&*()?_~]/g)  != -1  ) chk ++; //특수기호
		if(/^[a-zA-Z0-9!@#$%^&*()?_~]{6,15}$/.test(t.val())) chk ++; //6~14자
		if(chk < 3){
			list.removeClass("good").addClass('bad');
			meg.html("형식에 맞지 않습니다.");
			return;
		}else{
			list.addClass("good").removeClass('bad');
			meg.html("적합한 입력입니다.");
		}
	},
	pw02 : function(id, pw1){
		var t = $(id), list = t.closest('li'), meg = list.find(".status");
		if(this.nul(t,meg, list)) return;
		if(t.val() != $(pw1).val()){
			list.removeClass("good").addClass('bad');
			meg.html("패스워드가 일치하지 않습니다.");
			return;
		}else{
			list.addClass("good").removeClass('bad');
			meg.html("");
		}
	},
	email : function(id){
		var t = $(id), list = t.closest('li'), meg = list.find(".status");
		var regex=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
		if(this.nul(t,meg, list)) return;
		if(regex.test(t.val()) === false){
			list.removeClass("good").addClass('bad');
			meg.html("잘못된 이메일 형식입니다.");
		}else{
			list.addClass("good").removeClass('bad');
			meg.html("사용가능한 이메일 입니다.");
		}
	},
	nul : function(t1,meg1, list){
		if(t1.val() === ""){
			meg1.html("");
            list.removeClass("good bad");
            return true;
		}
	}
};


/*로그인 회원가입 관련 팝업창*/
var MemberPopFn = function(params){
	params = params || {};
	var _this = this, popInner, currBx, nextBx, contOutBx,  moveMotion, moving;
	this.popBx = '#pop_member_login_signup';

	this.setCont = function(o){
		o = o || {};
		if(o.url === undefined) throw new Error('URL 주소가 필요합니다.');
		var t = _this.popBx.find('.content:not(".on")').eq(0);
		$.ajax({
			url : o.url,
			type : params.type || 'GET',
            data : o.data || {},
			dataType : 'html',
			success : function(data){
				t.html(data).siblings('.on').removeClass('on').end().addClass('on');
				t.imagesLoaded(function(){
					var h = t.outerHeight();
                    var ch = contOutBx.height();
                    var popT = parseInt(_this.popBx.css('top'));
                    var innerT = parseInt(popInner.css('top'));
					if(!moveMotion){
						moveMotion = !moveMotion;
						o.callFn && o.callFn();
					}else{
                        var vH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                        var scl = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
                        var tgH = innerT+(ch-h)/2;
                        _this.popBx.removeClass('show_right_sec');
                        TweenLite.to(popInner, 0.6, {'top' : (popT + tgH <= 0 ? -popT : tgH), ease: Power3.easeInOut});
						TweenLite.to(contOutBx,0.6,{'height' : h, ease: Power3.easeInOut, onComplete : function(){
							o.callFn && o.callFn();
                            contOutBx.css('height','');
                            moving = false;
						}});
					}
				})
			},
			error : function(a,b,c){
				alert('error : ' + c);
                moving = false;
			}
		})
	};

	this.showPop = function(){
		ajaxShowPopCont({
	        url : '/users/pop_member_box.html',
            data : params.data || {},
            resize : false,
			onStart : function(bx, showFn){
				_this.popBx = $(_this.popBx);
                popInner = _this.popBx.find('> .inner');
				contOutBx = _this.popBx.find('#bx_multi_content');
				_this.setCont({callFn : showFn, url : params.url || '/users/login.html'});
			}
	    });
	};

	this.addCont = function(o){
        if(moving) return;
        moving = true;
		o  = o || {};
        if(o.showSide) _this.addSubSect({url:o.showSide, noShow : true});
		var direc = !o.direc || o.direc === 'next' ? 1 : -1;
		currBx = _this.popBx.find('.content.on').eq(0);
		nextBx = _this.popBx.find('.content:not(".on")').eq(0);
		TweenLite.set(nextBx,{'left' : 100*direc+'%'});
        TweenLite.set(contOutBx,{'height' : contOutBx.css('height')});
		function move(){
			TweenLite.to(nextBx,0.5,{'left' : '0%', ease: Power3.easeInOut});
			TweenLite.to(currBx,0.5,{'left' : -100*direc+'%', ease: Power3.easeInOut});
            if(o.showSide) _this.popBx.addClass('show_right_sec');
		}
		_this.setCont({url : o.url, callFn : move, data : o.data});
	};

    this.addSubSect = function(o){
		o = o || {};
		if(o.url === undefined) throw new Error('URL 주소가 필요합니다.');
        var t = _this.popBx.find('#bx_member_aside');
        $.ajax({
            url : o.url,
            data : o.data,
            dataType : 'html',
            type : 'GET',
            success : function(data){
                t.html(data);
                if(!o.noShow) t.imagesLoaded(function(){_this.popBx.addClass('show_right_sec');});
            },
            error : function(a,b,c){
                alert('error : ' + c);
            }
        });
    };

    this.joinPopup = function (sns) {
		window.open("/member/" + sns + "/?at=main&mode=url&type=join", sns, 'location=no,direction=no,resizable=no,toolbar=no,menubar=no,fullscreen=no,width=500,height=500');
	};

	this.showPop();
};
var memberPop;
