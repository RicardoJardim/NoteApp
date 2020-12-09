const database = require("database_js");

$.category_list.addEventListener("androidback", function () {
  goBack();
});

//GO BACK
function goBack() {
  var next_win = Alloy.createController("index").getView();
  next_win.open();
  next_win = null;
  $.category_list.close();
}

//METHOD TO SHOW ALL COLORS AND CATEGORIES AVAILABLE
function inicializa() {
  var data = [];
  var result = database.database_call("SELECT * FROM category");

  while (result.isValidRow()) {
    var ids = result.fieldByName("id");
    var titles = result.fieldByName("title");
    var colors = result.fieldByName("color");

    var row = Ti.UI.createTableViewRow({
      id: ids,
      width: Ti.UI.FILL,
      height: Ti.UI.SIZE,
    });

    var view = Ti.UI.createView({
      id: ids,
      cat: titles,
      borderRadius: 12,
      elevation: 10,
      backgroundColor: colors,
      width: "90%",
      height: 55,
      bottom: "2%",
    });

    var label1 = Ti.UI.createLabel({
      left: "10%",
      color: "black",
      font: {
        fontSize: 26,
        fontFamily: Alloy.Globals.font,
      },
      text: titles,
    });

    view.add(label1);
    row.add(view);

    data.push(row);
    result.next();
    row = null;
  }

  $.table_view.setData(data);
  data = null;
}

inicializa();

//EVENT LISTENER FOR PICKING COLORS
$.table_view.addEventListener("click", function (e) {
  if ((e.source.apiName = "Ti.UI.View" && e.source.id != undefined)) {
    var next_win = Alloy.createController("create_category", [
      e.source.id,
      e.source.cat,
      e.source.backgroundColor,
    ]).getView();
    next_win.open();
    next_win = null;
    $.category_list.close();
  }
});

function confirm(e) {
  goBack();
}
