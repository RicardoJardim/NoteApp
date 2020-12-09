// Arguments passed into this controller can be accessed via the `$.args` object directly or:

//CATCH ARGUMENTS
var args = $.args;

const alerted = require("alert");
const database = require("database_js");
const table = require("table");

//QUERY THE DATABASE FOR TITLE AND COLOR WITH THE ID OF SELECTED NOTE

var result2 = database.database_call(
  "SELECT note.title,category.color FROM note,category WHERE note.category_id = category.id AND note.id=" +
    args[0] +
    ""
);

var title = result2.fieldByName("title");
var colors = result2.fieldByName("color");

//TOP VIEW

var topView = Ti.UI.createView({
  top: 1,
  layout: "vertical",
  height: 105,
  elevation: 10,
  backgroundColor: "#e6e6e6",
});

var topChildView = Ti.UI.createView({
  height: 55,
  backgroundColor: "#e6e6e6",
});

var backButton = Ti.UI.createImageView({
  image: "/arrow.png",
  width: "10%",
  left: "3%",
});
backButton.addEventListener("click", goToIndex);
topChildView.add(backButton);

//TOP LEFT LABEL
var label = Ti.UI.createLabel({
  text: title,
  color: "black",
  font: { fontSize: 26, fontFamily: Alloy.Globals.font },
  width: "70%",
  height: 50,
  textAlign: "center",
});
topChildView.add(label);

//TOP BOTTON
var btn2 = Ti.UI.createButton({
  backgroundImage: "/add.png",
  right: "3%",
  height: "70%",
  width: "10%",
});
topChildView.add(btn2);

topView.add(topChildView);

//SEARCH BAR
var search = Titanium.UI.createSearchBar({
  color: "black",
  focusable: true,
  width: "98%",
  barColor: "#ffffff",
  showCancel: true,
  height: 50,
  hintText: "Search by note",
  hintTextColor: "#cccccc",
});
topView.add(search);

// EVENT LISTENER FOR THE SEARCH BAR
search.addEventListener("change", function (e) {
  console.log(search.value);
  let id = args[0];

  if (search.value == "") {
    populate(`SELECT * FROM subnote WHERE note_id=${id} `);
  } else {
    scroolView.setData([]);

    let query = `SELECT * FROM subnote WHERE note_id=${id} AND title LIKE "%${search.value}" `;
    if (database.database_check(query)) {
      populate(query);
    }
  }
});

// EVENT LISTENER FOR THE ADD SUBNOTE BUTTON
btn2.addEventListener("click", function () {
  var next_win = Alloy.createController("create_subnotes", [
    args[0],
    colors,
  ]).getView();
  next_win.open();
  next_win = null;
});

$.sub_notes.add(topView);

//SCROOLVIEW
var scroolView = Ti.UI.createTableView({
  height: Ti.UI.FILL,
  width: "100%",
  backgroundColor: "#e6e6e6",
  separatorStyle: Ti.UI.TABLE_VIEW_SEPARATOR_STYLE_NONE,
});

// QUERY ALL SUBNOTE WITH THE SELECTED NOTE
populate("SELECT * FROM subnote WHERE note_id=" + args[0] + "");

// EVENT LITENER FOR OPEN A SUBNOTE
scroolView.addEventListener("click", function (e) {
  console.log(e.source.apiName);
  if ((e.source.apiName = "Ti.UI.View" && e.source.id != undefined)) {
    console.log(e.source.id);

    var next_win = Alloy.createController("view_subnote", [
      e.source.id,
      args[0],
      colors,
    ]).getView();
    next_win.open();
    next_win = null;
  }
});

$.sub_notes.add(scroolView);

// POPULATION OF THE SUBNOTES
function populate(query) {
  var data = [];

  var result = database.database_call(query);

  let row = Ti.UI.createTableViewRow({
    width: "100%",
    height: 10,
  });
  data.push(row);

  while (result.isValidRow()) {
    let ids = result.fieldByName("id");
    let title = result.fieldByName("title");

    row = table.TableView(ids, colors, 80, title, "");

    data.push(row);
    result.next();
  }
  view = null;
  label1 = null;

  let Emptyrow = Ti.UI.createTableViewRow({
    width: "100%",
    height: 20,
  });
  data.push(Emptyrow);

  let eraseBtn = Ti.UI.createButton({
    title: "Erase note",
    backgroundColor: "red",
    width: "90%",
    height: Ti.UI.Size,
    color: "#ffffff",
    borderRadius: "5",
    font: {
      fontSize: 18,
      fontWeight: "bold",
    },
  });

  // EVENT LISTENER FOR ERASING EACH NOTE
  eraseBtn.addEventListener("click", erase);

  row = Ti.UI.createTableViewRow({
    width: "100%",
    height: Ti.UI.SIZE,
  });
  row.add(eraseBtn);
  data.push(row);

  data.push(Emptyrow);

  scroolView.setData(data);
  data = null;
  row = null;
}

//ERASE MAIN NOTE
function erase(e) {
  database.database_call("DELETE FROM note WHERE id =" + args[0] + "");
  alerted.note("The current group notes was deleted!", 1);

  goToIndex();
}

//Go back
$.sub_notes.addEventListener("androidback", function () {
  goToIndex();
});

Alloy.Globals.RenderSubNotesAgain = function () {
  console.log("render");
  scroolView.setData([]);
  populate("SELECT * FROM subnote WHERE note_id=" + args[0] + "");
};

function goToIndex() {
  var next_win = Alloy.createController("index").getView();
  next_win.open();
  next_win = null;
  $.sub_notes.close();
}
