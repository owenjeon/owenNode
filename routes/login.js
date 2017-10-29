var express = require('express');
var router = express.Router();
router.post('/users',function(req,res){
    consol.log('aaa');
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
    console.log('aaa');
});


module.exports = router;
