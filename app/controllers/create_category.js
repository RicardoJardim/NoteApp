var args = $.args;

const alerted = require("alert");
const database = require("database_js");

$.create_category.addEventListener("androidback", function () {
  if (args.length == 0) {
    goBack("index");
  } else {
    goBack("category_list");
  }
});

$.back.addEventListener("click", function () {
  if (args.length == 0) {
    goBack("index");
  } else {
    goBack("category_list");
  }
});

//GO BACK INDEX
function goBack(where) {
  var next_win = Alloy.createController(where).getView();
  next_win.open();
  next_win = null;
  $.create_category.close();
}

//SHOWS ALL COLORS AVAILABLE
function inicializa() {
  var ArrayColors = Ti.App.Properties.getList("ArrayColors");
  for (chave in ArrayColors) {
    var view = Ti.UI.createView({
      colorID: chave,
      backgroundColor: ArrayColors[chave],
      height: "20%",
      width: "20%",
      left: "10%",
      top: "10%",
      borderColor: "black",
      borderRadius: 10,
      elevation: 8,
      borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL,
      backgroundSelectedColor: "#000000",
    });
    $.viewColors.add(view);
  }

  $.viewColors.addEventListener("click", function (e) {
    if ((e.source.apiName = "Ti.UI.View" && e.source.colorID != undefined)) {
      $.viewcat.backgroundColor = e.source.backgroundColor;
    }
  });
}

//THIS CONTROLLER IS DINAMIC SO IT CAN BE USE TO CREATE OR CHANGE A CATEGORY
$.create_category.addEventListener("open", function () {
  if (args.length != 0) {
    $.name.value = args[1];
    $.viewcat.backgroundColor = args[2];
  } else {
    $.viewcat.remove($.deletes);
  }
  inicializa();
});

//METHOD TO DELETE A CATEGORY
function delCat(e) {
  database.database_call(
    "UPDATE note SET category_id=1 WHERE category_id=" + args[0] + ""
  );

  database.database_call("DELETE FROM category WHERE id=" + args[0] + "");
  $.name.value = "";
  alerted.note(
    "The current category was deleted!\n All notes in this category have been left unclassified",
    1
  );
  goBack("category_list");
}

// METHOD TO SAVE A NEW CATEOGRY OR UPDATE AN EXISTING ONE
function saveCat(e) {
  var names = $.name.value;
  var colors = $.viewcat.backgroundColor;

  if (!names) {
    alerted.note("Name of the category is missing!", 1);
  } else {
    if (args.length == 0) {
      database.database_call_algorithm(
        "INSERT INTO category (title,color) VALUES (?,?)",
        [names, colors]
      );
      $.name.value = "";
      alerted.note("The category was created!", 1);
      goBack("index");
    } else {
      let id = args[0];
      console.log(
        `UPDATE category SET title="${names}",color="${colors}" WHERE id=${id} `
      );

      database.database_call(
        `UPDATE category SET title="${names}",color="${colors}" WHERE id=${id} `
      );
      $.name.value = "";
      alerted.note("The category was updated!", 1);
      goBack("category_list");
    }
  }
}
