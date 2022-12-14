const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { MySqlClient, sql } = require("../database/client.js");
const PRIVILEGE = {
  NORMAL: "normal",
};

var initialize, authenticate, authorize;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  "local-strategy",
  new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
  }, async (req, username, password, done) => {
    var results, user;
    try {
      results = await MySqlClient.executeQuery(
        await sql("SELECT_USER_BY_EMAIL"),
        [username]
      );
    } catch(err) {
      return done(err);
    }
    if(results.length === 1 && password === results[0].password) {
      user = {
        id: results[0].id,
        name: results[0].name,
        email: results[0].email,
        permissions: [PRIVILEGE.NORMAL]
      };
      done(null, user);
    } else {
      done(null, false, req.flash("message", "ユーザー名またはパスワードが間違っています。"));
    }
  })
);

initialize = function() {
  return [
    passport.initialize(),
    passport.session(),
    function (req, res, next) {
      if(req.user) {
        res.locals.user = req.user;
      }
      next();
    }
  ];
};

authenticate = function() {
  return passport.authenticate(
    "local-strategy",
    {
      successRedirect: "/account",
      failureRedirect: "/account/login",
    }
  );
} ;

module.exports = {
  initialize,
  authenticate,
  authorize,
  PRIVILEGE
};