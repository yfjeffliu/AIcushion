// index.js
var express = require('express');
var router = express.Router();

/* GET home page. localhost:3000/ */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET localhost:3000/test */
router.get('/test', function(req, res, next) {
  res.send('This is localhost:3000/test')
});
router.get('/regis',function(req,res,next){
	res.sendFile('/home/pi/zz/loginsystem/member/front/index.html')})
module.exports = router;
