//MAIN PAGE OF THE APP

const database = require("database_js");
const table = require("table");
//DATABASE INSTALL
database.install();

//-------------------------
//LEFT VIEW
var leftView = Ti.UI.createView({ backgroundColor: "#e6e6e6" });

//SIDE TABLEVIEW
var TableView = Ti.UI.createTableView({
  top: "10%",
  height: Ti.UI.FILL,
  width: Ti.UI.FILL,
  backgroundColor: "#e6e6e6",
  separatorColor: "#e6e6e6",
});

leftView.add(TableView);
//-------------------------

var searchFor = 0; //VARIABLE FOR ENABLE THE USER TO USE SEARCH BAR WITH SELECTED CATEGORY

// EVENT LISTENER FOR LEFT TABLE VIEW
TableView.addEventListener("click", function (e) {
  if (e.row.id != undefined) {
    if (e.row.id == 0) {
      var query =
        "SELECT note.*,category.color FROM note,category WHERE note.category_id = category.id";
      populate(query);
      drawer.closeLeft();
      searchFor = 0;
    } else {
      scroolView.setData([]);
      var query =
        "SELECT note.*,category.color FROM note,category WHERE note.category_id=category.id AND category.id =" +
        e.row.id +
        "";

      if (database.database_check(query)) {
        populate(query);
        drawer.closeLeft();
        searchFor = e.row.id;
      }
    }
  } else {
    switch (e.row.name) {
      case 1:
        changeWindow("create_category", []);
        $.index.close();
        break;
      case 2:
        changeWindow("category_list", []);
        $.index.close();
        break;
      case 3:
        changeWindow("settings", []);
        $.index.close();
        break;
      default:
        console.error("missing case");
        break;
    }
  }
});

//CENTER VIEW WITH TOP BOTTON AND SCROLLVIEW
var overallView = Ti.UI.createView({ layout: "vertical" });

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

//TOP BOTTON
var btn = Ti.UI.createButton({
  backgroundImage: "/settings.png",
  left: "2%",
  width: "10%",
  height: "80%",
});
topChildView.add(btn);

var btn2 = Ti.UI.createButton({
  backgroundImage: "/add.png",
  right: "3%",
  height: "70%",
  width: "10%",
});
topChildView.add(btn2);

topView.add(topChildView);

//Search bar
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

  if (searchFor == 0) {
    if (search.value == "") {
      var query =
        "SELECT note.*,category.color FROM note,category WHERE note.category_id = category.id";
      populate(query);
    } else {
      scroolView.setData([]);
      var query =
        'SELECT note.*,category.color FROM note,category WHERE note.category_id = category.id AND note.title LIKE "%' +
        search.value +
        '%" ';

      if (database.database_check(query)) {
        populate(query);
      }
    }
  } else {
    if (search.value == "") {
      var query =
        "SELECT note.*,category.color FROM note,category WHERE note.category_id = category.id AND category.id = " +
        searchFor +
        "";
      populate(query);
    } else {
      scroolView.setData([]);
      var query =
        "SELECT note.*,category.color FROM note,category WHERE note.category_id = category.id AND category.id = " +
        searchFor +
        ' AND note.title LIKE "%' +
        search.value +
        '%" ';

      if (database.database_check(query)) {
        populate(query);
      }
    }
  }
});

// GOES TO CREATE NOTE
btn2.addEventListener("click", function () {
  changeWindow("create_note", []);
});

overallView.add(topView);

btn.addEventListener("click", function () {
  drawer.toggleLeft();
});

//SCROOLVIEW
var scroolView = Ti.UI.createTableView({
  height: Ti.UI.FILL,
  width: "100%",
  backgroundColor: "#e6e6e6",
  separatorStyle: Ti.UI.TABLE_VIEW_SEPARATOR_STYLE_NONE,
});

// EVENT LISTENER FOR THE MAIN PAGE, INSTEAD OF EACH VIEW
scroolView.addEventListener("click", function (e) {
  console.log(e.source.apiName);
  if ((e.source.apiName = "Ti.UI.View" && e.source.id != undefined)) {
    changeWindow("sub_notes", [e.source.id]);
    $.index.close();
  }
});

overallView.add(scroolView);

// INSTANCIATE DRAWER
var drawer = Ti.UI.Android.createDrawerLayout({
  leftView: leftView,
  centerView: overallView,
});

$.index.addEventListener("open", function () {
  // SELECT ALL NOTES
  populate(
    "SELECT note.*,category.color FROM note,category WHERE note.category_id = category.id"
  );

  //SELECT ALL CATEGORIES
  populateTable("SELECT * FROM category");

  //INICAILIZE LEFT DRAWER ACTIVITY
  var activity = $.index.getActivity(),
    actionBar = activity.getActionBar();

  if (actionBar) {
    actionBar.displayHomeAsUp = true;
    actionBar.onHomeIconItemSelected = function () {
      drawer.toggleRight();
    };
  }
});

$.index.add(drawer);

//-----------------
//METHOD THAT SHOWS NOTES BY QUERY
function populate(query) {
  let data = [];

  let result = database.database_call(query);
  let view;
  let row = Ti.UI.createTableViewRow({
    width: "100%",
    height: 10,
  });
  data.push(row);

  while (result.isValidRow()) {
    let ids = result.fieldByName("id");
    let title = result.fieldByName("title");
    let desc = result.fieldByName("description");
    // let cat = result.fieldByName("category_id");
    let colors = result.fieldByName("color");

    if (desc != null && desc != "") {
      row = table.TableView(ids, colors, 150, title, desc);
    } else {
      row = table.TableView(ids, colors, 80, title, desc);
    }

    data.push(row);
    result.next();
  }
  row = Ti.UI.createTableViewRow({
    width: "100%",
    height: 20,
  });
  data.push(row);

  scroolView.setData(data);
  data = null;
}
//-----------------
//POPULATING LEFT VIEW TABLE WITH EXISTING CATEGORIES
function populateTable(query) {
  let data = [];
  let result3 = database.database_call("SELECT COUNT(*) FROM note ");
  let TotalNumber = result3.field(0);

  let row = table.SideTableView(0, "white", "All Notes", TotalNumber);
  data.push(row);

  //QUERY FOR GETTING ALL CATEGORIES
  let result = database.database_call(query);

  while (result.isValidRow()) {
    let ids = result.fieldByName("id");
    let titles = result.fieldByName("title");
    let colors = result.fieldByName("color");

    //NUMBER OF EXISTING NOTES FOR EACH CATEGORY
    let result2 = database.database_call(
      "SELECT COUNT(*) FROM note WHERE category_id=" + ids + ""
    );
    let number = result2.field(0);

    row = table.SideTableView(ids, colors, titles, number);

    data.push(row);
    result.next();
  }
  // Black row
  row = Ti.UI.createTableViewRow({
    top: "2%",
    width: "100%",
    backgroundColor: "#cccccc",
    height: 40,
    selectedBackgroundColor: "#cccccc",
  });

  data.push(row);

  //ROW FOR EDIT A CATEGORY
  row = table.SideTableButtonsView(1, "Add category");
  data.push(row);

  row = table.SideTableButtonsView(2, "Edit category");
  data.push(row);

  row = table.SideTableButtonsView(3, "Settings");
  data.push(row);

  TableView.setData(data);
  data = null;
}

// OPEN MAIN PAGE
$.index.open();

// CANT GO BACK
$.index.addEventListener("androidback", function () {});

Alloy.Globals.RenderAgain = function () {
  console.log("render");
  scroolView.setData([]);
  search.value = "";
  populate(
    "SELECT note.*,category.color FROM note,category WHERE note.category_id = category.id"
  );
  TableView.setData([]);
  populateTable("SELECT * FROM category");
};

function changeWindow(name, args) {
  var next_win = Alloy.createController(name, args).getView();
  next_win.open();
  next_win = null;
}
