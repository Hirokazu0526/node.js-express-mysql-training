const router = require("express").Router();


router.get("/", (req, res) => {
  res.render("./index.ejs");
});

// exportsを忘れずに！
module.exports = router;