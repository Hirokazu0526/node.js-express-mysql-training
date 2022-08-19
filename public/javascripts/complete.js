// 戻るボタンでの空履歴を追加
var window_onpopstate = function (event) {
  history.pushState(null, null, null);
};

// 画面初期表示でから履歴を追加
var document_onready = function (event) {
  history.pushState(null, null, null);
  $(window).on("popstate", window_onpopstate);
};


$(document).ready(document_onready);