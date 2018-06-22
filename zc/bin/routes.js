var express = require ("express");
var router = express.Router();
require("./routes/index")(router);
module.exports = function(app) {
    app.use("/", router);
}
