var express = require('express');
var router = express.Router();
const user = require("../controllers/user");

router.route("/getAll").get(function(req, res) {
  user.getAll(function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, users: results});
    }
  });
});

router.route("/getAllArray").get(function(req, res) {
  user.getAllArray(function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, users: results});
    }
  });
});

router.route("/:id_user").get(function(req, res) {
  user.getById(req.params.id_user, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, users: results});
    }
  });
});

module.exports = router;
