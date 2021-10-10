var express = require('express');
var router = express.Router();

const MemberModifyMethod = require('../controllers/modify_controller');
const Data = require('../controllers/data')
memberModifyMethod = new MemberModifyMethod();
data = new Data();
router.post('/register', memberModifyMethod.postRegister);
router.post('/login', memberModifyMethod.postLogin);
//router.post('/update', memberModifyMethod.postUpdate);
router.post('/update',memberModifyMethod.postUpdate);
router.post('/data',data.savedata);
router.post('/getdata',data.readdata)

module.exports = router;

