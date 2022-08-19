// アイテム数を設定する
module.exports = {
  PORT: process.env.PORT || 5000,
  security: {
    SESSION_SECRET: "YOUR-SESSION-SECRET-STRING"
  },
  search: {
    MAX_ITEMS_PER_PAGE: 5
  }
};