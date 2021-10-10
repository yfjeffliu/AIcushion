const db = require('./connection_db');
const db2 = require('./connection_db2');
module.exports = function register(memberData) {
    let result = {};
    return new Promise((resolve, reject) => {
        // 尋找是否有重複的email
        db.query('SELECT email FROM member_info WHERE email = ?', memberData.email, function (err, rows) {
            // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
            if (err) {
                console.log(err);
                result.status = "註冊失敗。"
                result.err = "伺服器錯誤，請稍後在試！"
                reject(result);
                return;
            }
            // 如果有重複的email
            if (rows.length >= 1) {
                result.status = "註冊失敗。";
                result.err = "已有重複的Email。";
                reject(result);
            } else {
                // 將資料寫入資料庫
                db.query('INSERT INTO member_info SET ?', memberData, function (err, rows) {
                    // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                    if (err) {
                        console.log(err);
                        result.status = "註冊失敗。";
                        result.err = "伺服器錯誤，請稍後在試！"
                        reject(result);
                        return;
                    }
                    // 若寫入資料庫成功，則回傳給clinet端下：
                    result.status = "註冊成功。"
		command = "CREATE TABLE " + memberData.name + "(`DATE` date DEFAULT NULL,`TIME` time DEFAULT NULL,`result` int(20) NOT NULL)"
		    db2.query(command ,function(err,rows){})
		    command = "INSERT INTO current (user,DATE,TIME,a,b,c,d,e,f,g,h,i,result) VALUES('" + memberData.name + "',NULL,NULL,0,0,0,0,0,0,0,0,0,0)"
		   db2.query(command,function(err,rows){})
                    result.registerMember = memberData;
                    resolve(result);
                })
            }
        })
    })
}
