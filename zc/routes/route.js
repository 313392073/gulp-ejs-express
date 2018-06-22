var express = require('express');
var router = express.Router();
router.get('/',function (req,res) {
    res.send('1111');
})
require('./route/user')(router);
require('./route/hello')(router);
require('./route/online')(router);
module.exports = router
