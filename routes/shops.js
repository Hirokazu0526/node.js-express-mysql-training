const router = require("express").Router();
const { MySqlClient, sql } = require("../lib/database/client.js");

router.get("/:id", async (req, res, next) => {
  var id = req.params.id;
  
  Promise.all([
    MySqlClient.executeQuery(
      await sql("SELECT_SHOP_DETAIL_BY_ID"),
      [id]
    ),
    MySqlClient.executeQuery(
      await sql("SELECT_SHOP_REVIEW_BY_SHOP_ID"),
      [id]
    ),
  ]).then((results) => {
    var data = results[0][0];
    data.reviews = results[1] || [];
    res.render("./shops/index.ejs", data);
  }).catch((err) => {
    next(err);
  });
});

module.exports = router;