const appconfig = require("./config/application.config.js");
const dbconfig = require("./config/mysql.config.js"); 
const path = require("path");
const logger = require("./lib/log/logger.js");
const applicationlogger = require("./lib/log/applicationlogger.js");
const accesscontrol = require("./lib/security/accesscontrol.js");
const accesslogger = require("./lib/log/accesslogger.js");
const express = require("express");
const favicon = require("serve-favicon");
const cookie = require("cookie-parser");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const flash = require("connect-flash");
const app = express();

// Express setting
app.set("view engine", "ejs");
app.disable("x-powered-by");

// Exporse global method to view engin.
app.use((req, res, next) => {
  res.locals.moment = require("moment");
  res.locals.padding = require("./lib/math/math.js").padding;
  next();
});


// Static resource routing
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));
app.use("/public", express.static(path.join(__dirname, "/public")));

// Set access log
app.use(accesslogger());

// set middleware
app.use(cookie());
app.use(session({
  store: new MySQLStore({
    host: dbconfig.HOST,
    port: dbconfig.PORT,
    user: dbconfig.USERNAME,
    password: dbconfig.PASSWORD,
    database: dbconfig.DATABASE
  }),
  secret: appconfig.security.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  name: "sid"
}));
app.use(express.urlencoded({extended: true}));
app.use(flash());
app.use(...accesscontrol.initialize());


// cookieのサンプル実装
// app.use((req, res, next) => {
//   console.log(req.cookies.message);
//   res.cookie("message", "Hello World");
//   next();
// });



// Dynamic resource routing

// トランザクションのテスト処理の演習
// app.get("/test", async (req, res, next) => {
//   const { MySqlClient } = require("./lib/database/client.js");
//   var tran;
//   try {
//     tran = await MySqlClient.beginTransaction();
//     await tran.executeQuery(
//       "UPDATE t_shop SET score=? WHERE id=?",
//       [4.00, 1]
//     );
//     // throw new Error("TEST exceptoin");
//     await tran.commit();
//     res.end("OK");
//   } catch(err) {
//     await tran.rollback();
//     next(err);
//   }
// });
app.use("/account", require("./routes/account.js"));
app.use("/search", require("./routes/search.js"));
app.use("/shops", require("./routes/shops.js"));
app.use("/", require("./routes/index.js"));



// Set application log
app.use(applicationlogger());

app.listen(appconfig.PORT, () => {
  logger.application.info(`Application listeing at ${appconfig.PORT}`);
});