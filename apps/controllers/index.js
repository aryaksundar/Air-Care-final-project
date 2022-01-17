var express = require("express");
var router = express.Router();
console.log('welcome');
router.use("/", require(__dirname + "/web"));
router.use("/admin", require(__dirname + "/admin"));
router.use("/technician",require(__dirname + "/technician"));
// router.use("/demotech",require(__dirname + "/demotech"));
module.exports = router;
