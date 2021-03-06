const express = require("express");

const router = express.Router();

const burger = require("../models/burger.js");

router.get("/", (req, res) => {
  burger.all(function(data) {
    const hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", (req, res) => {
  console.log(req.body);
  burger.create(
    ["burger_name", "devoured"],
    [req.body.name, req.body.devoured],
    function(result) {
      res.json({ id: result.insertId });
    }
  );
});

router.put("/api/burgers/:id", (req, res) => {
  const condition = "id = " + req.params.id;

  burger.update(
    {
      devoured: "1"
    },
    condition,
    function(result) {
      if (result.changedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

router.delete("/api/burgers/:id", (req, res) => {
  const condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
module.exports = router;
