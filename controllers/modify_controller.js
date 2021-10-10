const Check = require('../service/member_check');
const config = require('../config/development_config');
var express = require('express')
const app=express();
const toRegister = require('../models/register_model');
const encryption = require('../models/encryption');
const loginAction = require('../models/login_model');
const verify = require ('../models/verification_model')
const updateAction = require('../models/update_model')
app.set('secret', config.secret)
const jwt = require('jsonwebtoken');

check = new Check();

module.exports = class Member {
    postRegister(req, res, next) {
	console.log('register')
        // 進行加密
        const password = encryption(req.body.password);

        // 獲取client端資料
        const memberData = {
            name: req.body.name,
            email: req.body.email,
            password: password,
        }
	console.log(memberData)
        const checkEmail = check.checkEmail(memberData.email);
        // 不符合email格式
        if (checkEmail === false) {
            res.json({
                result: {
                    status: "註冊失敗。",
                    err: "請輸入正確的Eamil格式。(如1234@email.com)"
                }
            })
            // 若符合email格式
        } else if (checkEmail === true) {
            // 將資料寫入資料庫
            toRegister(memberData).then(result => {
                // 若寫入成功則回傳
		    //
		console.log('regis success')
                res.json({
                    result: result
                })
            }, (err) => {
                // 若寫入失敗則回傳
                res.json({
                    err: err
                })
            })
        }
    }
    postLogin(req, res, next) {
        // 進行加密
        const password = encryption(req.body.password);
	console.log("login")
        // 獲取client端資料
        const memberData = {
            email: req.body.email,
            password: password,
        }

        loginAction(memberData).then(rows => {
            if (check.checkNull(rows) === true) {
                res.json({
                    result: {
                        status: "登入失敗。",
                        err: "請輸入正確的帳號或密碼。",
			sta:"fail"
                    }
                })
            } else if (check.checkNull(rows) === false) {
                // 產生token
                const token = jwt.sign({
                    algorithm: 'HS256',
                    exp: Math.floor(Date.now() / 1000) + (60 * 60), // token一個小時後過期。
                    data: rows[0].id
                }, config.secret);
                res.setHeader('token', token);
                
                res.json({
                    result: {
                        status: "登入成功。",
                        loginMember: "歡迎 " + rows[0].name + " 的登入！",
			sta:"success",
			name:rows[0].name
                        // token: token
                    }
                })
            }
        })
    }
    postUpdate(req, res, next) {
    const token = req.headers['token'];
    //確定token是否有輸入
    if (check.checkNull(token) === true) {
        res.json({
            err: "請輸入token！"
        })
    } else if (check.checkNull(token) === false) {
        verify(token).then(tokenResult => {
            if (tokenResult === false) {
                res.json({
                    result: {
                        status: "token錯誤。",
                        err: "請重新登入。"
                    }
                })
            } else {
                const id = tokenResult;
                
                // 進行加密
                const password = encryption(req.body.password);

                const memberUpdateData = {
                    name: req.body.name,
                    password: password,
                    update_date: onTime()
                }
                updateAction(id, memberUpdateData).then(result => {
                    res.json({
                        result: result
                    })
                }, (err) => {
                    res.json({
                        result: err
                    })
                })
            }
        })
    }
}
	/*postUpdate(req, res) {
	    let tokenresult="";
	    console.log("update");
     let token = req.body.token || req.query.token || req.headers['x-access-token']
  if (token) {
    jwt.verify(token, app.get('secret'), function (err, decoded) {
      if (err) {
        return res.json({success: false, message: 'Failed to authenticate token.'})
      } else {
        req.decoded = decoded
	tokenresult=decoded.data
        console.log("pass")
	return res.json({success:true,message:"i am god",id:tokenresult})
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
    }
   }*/
}
//取得現在時間，並將格式轉成YYYY-MM-DD HH:MM:SS
const onTime = () => {
    const date = new Date();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const hh = date.getHours();
    const mi = date.getMinutes();
    const ss = date.getSeconds();

    return [date.getFullYear(), "-" +
        (mm > 9 ? '' : '0') + mm, "-" +
        (dd > 9 ? '' : '0') + dd, " " +
        (hh > 9 ? '' : '0') + hh, ":" +
        (mi > 9 ? '' : '0') + mi, ":" +
        (ss > 9 ? '' : '0') + ss
    ].join('');
}

const fileToBase64 = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'base64', function (err, data) {
            resolve(data);
        })
    })
}
