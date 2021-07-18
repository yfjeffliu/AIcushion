var express = require('express');
var router = express.Router();

const MemberModifyMethod = require('../controllers/modify_controller');

memberModifyMethod = new MemberModifyMethod();

router.post('/register', memberModifyMethod.postRegister);
router.post('/login', memberModifyMethod.postLogin);
//router.post('/update', memberModifyMethod.postUpdate);
router.post('/update',memberModifyMethod.postUpdate);

module.exports = router;

