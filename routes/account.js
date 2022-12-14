const router = require("express").Router();
const { authenticate } = require("../lib/security/accesscontrol.js");

router.get("/login", (req, res, next) => {
  res.render("./account/login.ejs", { "message": req.flash("message") });
});

router.post("/login", authenticate());

router.use("/reviews", require("./account.reviews.js"));


module.exports = router;