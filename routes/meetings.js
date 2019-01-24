var express = require('express');
var router = express.Router();
const meeting = require("../controllers/meeting");

router.route("/getAll").get(function(req, res) {
  meeting.getAll(function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: "Error retrieving meetings"});
    } else {
      res.json({success: 1, meetings: results});
    }
  });
});

router.route("/getAllArray").get(function(req, res) {
  meeting.getAllArray(function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: "Error retrieving meetings"});
    } else {
      res.json({success: 1, meetings: results});
    }
  });
});

router.route("/:id_meeting").get(function(req, res) {
  meeting.getById(req.params.id_meeting, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: "Error retrieving meeting"});
    } else {
      res.json({success: 1, meetings: results});
    }
  });
});

module.exports = router;
