var express = require('express');
var router = express.Router();
const report = require("../controllers/report");

router.route("/getAll").get(function(req, res) {
  report.getAll(function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: "Error retrieving report"});
    } else {
      res.json({success: 1, report: results});
    }
  });
});

router.route("/getAllArray/:count").get(function(req, res) {
  report.getAllArray(req.params.count, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: "Error retrieving report"});
    } else {
      res.json({success: 1, report: results});
    }
  });
});

module.exports = router;
