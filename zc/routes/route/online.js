var config = require('../config/config'); //读取通讯地址
module.exports = function (router) {
    router.get('/online',function (req,res) {
        res.render('online',{
            url:config['url']
        })
    })
}