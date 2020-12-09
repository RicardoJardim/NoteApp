// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.settings.addEventListener("androidback", function () {
  goBack();
});

function goBack() {
  var next_win = Alloy.createController("index").getView();
  next_win.open();
  next_win = null;
  $.settings.close();
}
