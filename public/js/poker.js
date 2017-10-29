'use strict'
function inherit(p){
	if(p == null) throw new Error("타입이 맞지 않습니다.");
	if(Object.create) return Object.create(p);
	var t = typeof p;
	if(t !== "object" && t !== "function") throw new Error("인자의 타입이 맞지 않습니다.");
	function f(){};
	f.prototype = p;
	return new f();
}

function enumeration(namesToValues){
	var enumeration = function(){ throw "열거형은 인스턴스화 할 수 없습니다."};
	var proto = enumeration.prototype = {
		constructor : enumeration,
		toString : function(){return this.name;},
		valueOf : function(){return this.value},
		toJSON : function(){return this.name}
	};
	enumeration.values = [];
	for (name in namesToValues) {
		var e = inherit(proto);
		e.name = name;
		e.value = namesToValues[name];
		enumeration[name] = e;
		enumeration.values.push(e);
	}
	enumeration.foreach = function(f, c){
		for (var i = 0; i < this.values.length; i++) {
			f.call(c, this.values[i]);
		}
	};
	return enumeration;
}

function Card(suit, rank) {
	this.suit = suit;
	this.rank = rank;
}
Card.Suit = enumeration({Clubs : 1, Hearts : 2, Diamonds : 3, Spades : 4});
Card.Rank = enumeration({
	Two : 2, Three : 3, Four : 4, Five : 5, Six : 6, Seven : 7, Eight : 8, Nine : 9, Ten : 10, Jack : 11, Queen : 12, King : 13, Ace : 14
});

Card.prototype.toString = function(){
	return this.rank.toString() + " of " + this.suit.toString();
};
Card.prototype.valueOf = function(){
	return (this.rank.valueOf()-2) * 4 + this.suit.valueOf();
};

Card.prototype.toImgString = function(){
	return '/images/cards/' + this.rank.toString().toLowerCase() + "_of_" + this.suit.toString().toLowerCase() + '.png';
};
Card.prototype.compareTo = function(that){ //우선순위 비교
	if(this.rank < that.rank) return -1;
	if(this.rank > that.rank) return 1;
	if(this.suit < that.suit) return -1;
	if(this.suit > that.suit) return 1;
	return 0;
}
Card.orderByRank = function(a, b){ //카드를 정렬하는 함수
	return a.compareTo(b);
}
Card.orderBySuit = function(a,b){
	if(a.suit < b.suit) return -1;
	if(a.suit > b.suit) return 1;
	if(a.rank < b.rank) return -1;
	if(a.rank > b.rank) return 1;
	return 0;
}

function Deck(){
	var cards = this.cards = [];
	var _this = this;
	this.bx = $("#poker_playground .users");
	this.stepOfGive = 0, this.btnGive = $("#btn_give_card"), this.btnCall = $("#btn_call");
	Card.Suit.foreach(function(s){
		Card.Rank.foreach(function(r){
			cards.push(new Card(s, r))
		})
	});
}

Deck.prototype.made = [
	{lv : 0 , name : '탑'},
	{lv : 1 , name : '원페어'},
	{lv : 2 , name : '투페어'},
	{lv : 3 , name : '트리플'},
	{lv : 4 , name : '스트레이트'},
	{lv : 5 , name : '스트레이트2'},
	{lv : 6 , name : '플러시'},
	{lv : 7 , name : '풀하우스'},
	{lv : 8 , name : '포커'},
	{lv : 9 , name : '스트레이트 플러시'},
	{lv : 10 , name : '로얄스트레이트 플러시'}
];

Deck.prototype.shuffle = function(){
	var deck = this.cards, len = deck.length;
	for(var i = len-1; i > 0 ; i--){
		var r = Math.floor(Math.random()*(i+1)), temp;
		temp = deck[i], deck[i] = deck[r], deck[r] = temp;
	}
	return this;
};

Deck.prototype.deal = function(n){
	if(this.cards.length < n) throw '더이상 카드를 배분할 수 없습니다';
	return this.cards.splice(this.cards.length-n, n)
};

Deck.prototype.choiceOpenCard = function(){ //오픈할 카드 선택
	var me = this.gamer[4],  mycards = me.cards, _this = this;
	var pop = $("#pop_choose_open_card"), ul = pop.find('.mycards > ul');
	var str = '';
	for (var i = 0; i < mycards.length; i++) {
		str += '<li><a href="javascript:;" data-idx="'+i+'"><img src="'+mycards[i].toImgString()+'" alt="" /></a></li>';
	}

	function setOpenCard(idx, me){
		mycards = me.cards;
		mycards[idx].open = true;
		mycards.push(mycards.splice(idx, 1)[0]);
		me.imgBx.append(me.imgBx.find('>li').eq(idx).removeClass('hidden'));
		me.made = _this.getMade(me.cards.filter(function(val,index,arr){
			return val.open;
		}), idx);
		//console.log(me.made);
	}

	ul.html(str, me);
	ul.find('a').on('click', function(){
		var idx = $(this).data('idx');
		setOpenCard(idx, me);
		popFn.close();
		for (var i = 0; i < 4; i++) {
			if(_this.gamer[i].status === 1){
				var idx2 = Math.floor(Math.random()*3);
				setOpenCard(idx2, _this.gamer[i]);
			}
		}
		var winIdx = _this.calWinner(_this.gamer);
		_this.btnGive.on('click', function(){_this.give(1, null)});

	});
	popFn.show(pop, {bgClickAble : false});

}

Deck.prototype.getFirst = function(){
	var first;
	this.gamer.forEach(function(item, index){
		if(item.first) first = index;
	});
	return first;
}

Deck.prototype.give = function(n, step){
	var sendCard = function(j, i, idx){
		var card = this.deal(1)[0], _this = this, inter = 100;
		card.open = true;
		if(this.stepOfGive <= 3 || this.stepOfGive === 7){
			card.open = false;
		}
		setTimeout(function(){
			_this.gamer[idx].imgBx.append('<li class="'+(card.open ? "" : "hidden")+'"><img src="'+card.toImgString()+'" ></li>');
		},inter*i+(j*inter*5));
		this.gamer[idx].cards.push(card);

	};
	var first = this.getFirst();
	for (var j = 0; j < n; j++) {
		this.stepOfGive++;
		for(var i = 0, len = this.gamer.length ; i < len ;i++){
			var idx = (first+i)%len;
			//console.log('idx: '+idx);
			if(this.gamer[idx].status){
				sendCard.call(this, j, i, idx);
				if(j == n-1 && step != 1){
					this.gamer[idx].made = this.getMade(this.gamer[idx].cards.filter(function(val,index,arr){
						return val.open;
					}), idx);
				}
			}
		}
	}
	var _this = this;

	if(step == 1) setTimeout(function(){_this.choiceOpenCard()},1600);
	else var winIdx = _this.calWinner(_this.gamer);
	if(this.stepOfGive == 7){
		this.btnGive.hide()
		this.btnCall.on('click',function(){
			_this.final();
            $(this).off('click').hide();
		}).show()
	}
};

Deck.prototype.getMade = function(arr, idx){
	if(arr.length ===1){
		return {lv : 0, name : this.made[0].name, cards : [arr]};
	}
	var tArr = [], _this = this;
	var straightArr = [];
	for(var i = 0; i < arr.length ; i++) tArr.push(arr[i]);
	tArr.sort(Card.orderByRank);
	var checkFlash = function(arr){
		var suitArr = {Clubs : [], Hearts : [], Diamonds : [], Spades : []};
		for (var i = 0; i < arr.length; i++) suitArr[arr[i].suit].push(arr[i]);
		return (suitArr);
	}

	var r = tArr.reduce(function(a, b){
		var o = inherit(b);
		if(!a.madeArr) o.madeArr = [];
		else o.madeArr = a.madeArr;

		if(a.rank == (b.rank-1) || a.rank == b.rank){
			if(a.rank == b.rank){ //원, 투 페어, 트리플, 풀하우스, 포커
				o.straight = a.straight; //같거나 1개가 크면 스트레이트 가능성이 있음..
				straightArr.length ? straightArr.push(b) : straightArr.push(a); //같은데 스트레이트가 진행중이면 뒤에거, 진행중이 아니면 앞에거를 추가함..
				if(!a.same){
					o.same = 1;
					o.madeArr[o.madeArr.length] = [a, b];

				}else if(a.same && a.same === 1){
					o.same = 1;
					o.madeArr[o.madeArr.length-1].push(b);
				}
			} else o.same = 0, o.straight = 0;

			if(a.rank == (b.rank-1)){//스트레이트
				if(!a.straight){
					straightArr.push(a, b);
					o.straight = 2;
				}else{
					straightArr.push(b);
					o.straight = a.straight+1;
					if(o.straight >= 5){ //스트레이트 만족
						/*if(o.straight > 5){ //6개 이상 줄...
							straightArr.splice(0,1);
						}*/
					}
				}
			}
		}else{
			//console.log(a.straight);
			if(!a.straight || a.straight < 5){
				straightArr = [];
				o.straight = 0;
			}
			o.same = 0;
		}
		return o;
	});


	//메이드 구하기
	r.lv = 0;

	var mdLen = r.madeArr.length;
	if(mdLen === 1){
		var len = r.madeArr[0].length;
		 if(len === 2){
			 r.lv = 1;//원페어
		 }else if(len === 3){
			 r.lv = 3;//트리플
		 }else if(len === 4){
			 r.lv = 8;//포커
		 }
	}else if(mdLen > 1){
		r.madeArr.sort(function(a, b){
			if(a.length > b.length) return -1;
			if(a.length < b.length) return 1;
			if(a[0].rank > b[0].rank) return -1;
			if(a[0].rank < b[0].rank) return 1;
			return 0;
		});
		if(r.madeArr[0].length === 4){
			r.lv = 8;//포커
		}else if(r.madeArr[0].length === 3){
			r.lv = 7;//풀하우스
		}else{
			r.lv = 2;//투페어
		}
	}



	if(r.lv < 8 && r.straight >= 5){ //스트레이트 체크
		r.lv = 4;
		r.madeArr = [straightArr];
	}
	if(r.lv < 8){ //플래시 체크
		var flashArr = checkFlash(tArr);
		for (var v in flashArr) {
			if(flashArr[v].length >= 5){
				r.lv = 6;
				r.madeArr = [flashArr[v]];
				break;
			}
		}
	}

	if(r.straight >= 5){ //스티플 체크
		var suitArr = checkFlash(straightArr);
		for (var v in suitArr) {
			if(suitArr[v].length >= 5){
				var cnt = 0, tmpArr = [];
				var rSTF = suitArr[v].reduce(function(a, b){
					if((b.rank - a.rank) === 1){
						if(tmpArr.length) {if(b.stfMade != 2)tmpArr.push(b), cnt++}
						else {tmpArr.push(a, b), cnt = 2;}
						if(cnt >= 5) b.stfMade = 1;//메이드 됨(진행중)
					}else{
						cnt = 0;
						if(!b.stfMade) tmpArr = [];
						else b.stfMade = 2;//메이드 됨 (끊김);
					}
					return b;
				});
				if(rSTF.stfMade){
					r.lv = 9;
					r.madeArr = [tmpArr];
				}
			}
		}
	}
	if(!r.lv) r.madeArr = [[r]];
	console.log(_this.made[r.lv].name, r.madeArr.toString(), idx);

	return {lv : r.lv, name : _this.made[r.lv].name, cards : r.madeArr};
};

Deck.prototype.calWinner = function(arr, last){
	var tArr = [];
	for(var i = 0; i < arr.length ; i++) {
        if(arr[i].status) tArr.push(arr[i]);
    }
	tArr.sort(function(a, b){
		if(a.made.lv > b.made.lv) return -1;
		if(a.made.lv < b.made.lv) return 1;
		if(a.made.lv == 0){ //탑끼리 비교
			if(a.made.cards[0][0] > b.made.cards[0][0]) return -1;
			if(a.made.cards[0][0] < b.made.cards[0][0]) return 1;
		}
		if(a.made.lv == 1){//원페어
			if(a.made.cards[0][1].rank > b.made.cards[0][1].rank) return -1;
			if(a.made.cards[0][1].rank < b.made.cards[0][1].rank) return 1;
		}
		if(a.made.lv == 2){//투페어
			if(a.made.cards[0][1].rank > b.made.cards[0][1].rank) return -1;
			if(a.made.cards[0][1].rank < b.made.cards[0][1].rank) return 1;
			if(a.made.cards[1][1].rank > b.made.cards[1][1].rank) return -1;
			if(a.made.cards[1][1].rank < b.made.cards[1][1].rank) return 1;
		}
		if(a.made.lv == 3){//트리플
			if(a.made.cards[0][2].rank > b.made.cards[0][2].rank) return -1;
			if(a.made.cards[0][2].rank < b.made.cards[0][2].rank) return 1;
		}
		if(a.made.lv == 4){//스트레이트
			if(a.made.cards[0][a.made.cards[0].length-1].rank > b.made.cards[0][b.made.cards[0].length-1].rank) return -1;
			if(a.made.cards[0][a.made.cards[0].length-1].rank < b.made.cards[0][b.made.cards[0].length-1].rank) return 1;
		}
		if(a.made.lv == 6){//플러시
			for (var i = 0, len = Math.min(a.made.cards[0].length, a.made.cards[0].length); i < len ; i++) {
				if(a.made.cards[0][a.made.cards[0].length-i].rank > b.made.cards[0][b.made.cards[0].length-i].rank) return -1;
				if(a.made.cards[0][a.made.cards[0].length-i].rank < b.made.cards[0][b.made.cards[0].length-i].rank) return 1;
			}
		}
		if(a.made.lv == 7){//풀하우스
			if(a.made.cards[0][2].rank > b.made.cards[0][2].rank) return -1;
			if(a.made.cards[0][2].rank < b.made.cards[0][2].rank) return 1;
		}
		if(a.made.lv == 8){//포커
			if(a.made.cards[0][3].rank > b.made.cards[0][3].rank) return -1;
			if(a.made.cards[0][3].rank < b.made.cards[0][3].rank) return 1;
		}
		if(a.made.lv == 9){//포커
			if(a.made.cards[0][a.made.cards[0].length-1].rank > b.made.cards[0][b.made.cards[0].length-1].rank) return -1;
			if(a.made.cards[0][a.made.cards[0].length-1].rank < b.made.cards[0][b.made.cards[0].length-1].rank) return 1;
		}
	});

	var winIdx;
	for(var i = 0, len = this.gamer.length; i < len; i++) {
        var gamer = this.gamer[i];
	    if (gamer.name === tArr[0].name) {
	        winIdx = i;
			gamer.first = true;
			last ? gamer.ele.removeClass('first') : gamer.ele.addClass('first');
	    }else{
			gamer.first = false;
			gamer.ele.removeClass('first');
		}

        if(gamer.made) {
            var str = "";
            for(var j = 0 ; j < gamer.made.cards.length ; j++){
                console.log(gamer.made.cards[j][gamer.made.cards[j].length-1]);
                str += gamer.made.cards[j][gamer.made.cards[j].length-1].rank + " ";
            }
            gamer.ele.find('.made').html(str + gamer.made.name);
        }
	}

	console.log('winIdx:'+ winIdx);

	return winIdx;
};

Deck.prototype.final = function(){
	for (var i = 0; i < this.gamer.length; i++) {
		var gamer = this.gamer[i];
        if(gamer.status){
    		gamer.open = true;
    		gamer.ele.find('li.hidden').removeClass('hidden');
            gamer.ele.removeClass('first');
    		gamer.made = this.getMade(gamer.cards, i);
        }
	}
	var winner = this.calWinner(this.gamer, 'last');
    this.gamer[winner].ele.addClass('win').find('.tag').append('<div class="win">승리</div>');
	console.log('winner index:'+winner);

}
