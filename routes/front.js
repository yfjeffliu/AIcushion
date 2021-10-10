// index.js
var express = require('express');
var router = express.Router();
const path = require('path')
const homepath="/home/pi/zz/loginsystem/member/front"
/* GET home page. localhost:3000/ */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET localhost:3000/test */
router.get('/test', function(req, res, next) {
  res.send('This is localhost:3000/test')
});
router.get('/regis',function(req,res,next){
	res.sendFile(path.join(homepath+"/regis.html"));
});
router.get('/login',function(req,res,next){
        res.sendFile(path.join(homepath+"/login.html"));
});
router.get('/web',function(req,res,next){
  res.sendFile(path.join(homepath+"/website.html"));
});

router.use('/', express.static(path.join(homepath)));

const Getdatabase = require('../controllers/app-call-python-shell');

getdatabase = new Getdatabase();
router.post('/date',getdatabase.postdate);
router.post('/website',getdatabase.postwebsite);
router.post('/history_fig',getdatabase.posthistoryfig);
module.exports = router;
