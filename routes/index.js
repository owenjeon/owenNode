var express = require('express');
var urlss = require('url');
var router = express.Router();

function getparmas(req){
    return req;
}

function extend(o1, o2){
    for(var v in o2){
        if(o2.hasOwnProperty(v)) o1[v] = o2[v];
    }
    return o1;
}

function setReq(obj, req){
    var tmpObj = {
        session : req.session,
        query : req.query
    }
    for(var v in tmpObj){
        if(tmpObj.hasOwnProperty(v)) obj[v] = tmpObj[v];
    }
    return obj;
}

/* GET home page. */
router.get('/', function(req, res, next) {
    var params = {title : '인덱스'};
    res.render('index.html', setReq(params, req));
});

router.get('/inc/config', function(req, res, next) {
    var params = {connection : connection};
    res.render('inc/config.html', params);
});
router.get('/d2', function(req, res, next) {
  res.render('d2/index', { title: 'Express' });
});

/*게임 관련*/
router.get('/poker', function(req, res, next){
    res.render('poker/index.html', setReq({}, req));
});

router.get('/chat', function(req, res, next){
    var sess = req.session;
    res.render('chat/index.html', setReq({}, req));
});


/*회원 가입, 로그인 관련*/
router.post('/login',function(req,res){
    var sess = req.session;
    var user = {
        'email' : req.body.user_id,
        'password' : req.body.user_pwd
    };
    var query = connection.query('SELECT * FROM users WHERE email = "'+user.email+'" AND password = "'+user.password+'"',function(err,row){
        if (err) {
            console.error(err);
            res.status(500).send('DB접속에 실패했습니다.');
            return;
        }
        if(row.length === 0){
            console.error(err);
            res.status(400).send('일치하는 회원 정보가 없습니다.');
            return;
        }
        //로그인이 성공했으면..
        sess.userid = row[0].id;
        sess.username = row[0].name;
        res.json(row);
    });
});

router.post('/signup',function(req,res){
    var sess = req.session;
    var user = {
        'email' : req.body.user_id,
        'name' : req.body.user_name,
        'password' : req.body.user_pwd1,
        'id' : (new Date()).valueOf()
    };
    connection.query('SELECT * FROM users WHERE email = "'+user.email+'"',function(err,row){
        if (err) {res.status(500).send('DB접속에 실패했습니다.1');return;}
        if(row.length > 0){
            res.status(400).send('이미 존재하는 이메인 계정입니다.');
            return;
        }
        connection.query('INSERT INTO users SET ?',user, function(err,result){
            if (err) {
                res.status(500).send('DB접속에 실패했습니다.2');
                return;
            }
            console.log(result);
            //회원가입이 성공했으면..
            sess.userid = user.id;
            sess.username = user.name;
            res.json(user);
        });
    });
});

router.post('/users',function(req,res){
    var user = {'id':(new Date()).valueOf(),
        'email':'owen.jeon@gmail.com'
    };
    var query = connection.query('insert into user set ?',user,function(err,result){
        if (err) {
            console.error(err);
            throw err;
        }
        console.log(query);
        res.send(200,'success');
    });
});

router.get('/*', function(req, res){
    var url = urlss.parse(req.url);
    console.log(url)
    res.render('.'+url.pathname, setReq({}, req));
});

module.exports = router;
