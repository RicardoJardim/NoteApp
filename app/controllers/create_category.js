var args = $.args;

// BOOLEAN FOR IF IS CREATING OR CHANGING
var bool = false;

const alerted = require("alert");
const database = require("database_js");

$.create_category.addEventListener("androidback", function () {
  if (!bool) {
    goBack();
  } else {
    goBack2();
  }
});

//GO BACK INDEX
function goBack() {
  var next_win = Alloy.createController("index").getView();
  next_win.open();
  next_win = null;
  $.create_category.close();
}
//GO BACK CATEGORY LIST
function goBack2() {
  var next_win = Alloy.createController("category_list").getView();
  next_win.open();
  next_win = null;
  $.create_category.close();
}

//SHOWS ALL COLORS AVAILABLE
function inicializa() {
  console.log(Ti.App.Properties.getList("ArrayColors"));

  var ArrayColors = Ti.App.Properties.getList("ArrayColors");
  for (chave in ArrayColors) {
    console.log(chave);
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
      console.log(e.source.colorID);
      $.viewcat.backgroundColor = e.source.backgroundColor;
    }
  });
}
//THIS CONTROLLER IS DINAMIC SO IT CAN BE USE TO CREATE OR CHANGE A CATEGORY
$.create_category.addEventListener("open", function () {
  console.log("ARGS " + args.length);
  if (args.length != undefined) {
    $.name.value = args[1];
    $.viewcat.backgroundColor = args[2];
    bool = true;
  } else {
    console.log("REMOVE DELETE");
    $.viewcat.remove($.deletes);
  }

  inicializa();
});

//METHOD TO DELETE A CATEGORY
function delCat(e) {
  var query1 =
    "UPDATE note SET category_id=1 WHERE category_id=" + args[0] + "";
  var nada1 = database.database_call(query1);

  var query = "DELETE FROM category WHERE id=" + args[0] + " ";
  var nada = database.database_call(query);
  $.name.value = "";
  alerted.note("Deleted!", 1);
  goBack2();
}

// METHOD TO SAVE A NEW CATEOGRY OR UPDATE AN EXISTING ONE
function saveCat(e) {
  var names = $.name.value;
  var colors = $.viewcat.backgroundColor;

  var finalText = "";
  if (!names) {
    alerted.note("Falta preencher o nome", 1);
  } else {
    if (!bool) {
      var data = [];
      var query = "INSERT INTO category (title,color) VALUES (?,?)";
      data.push(names, colors);
      var nada = database.database_call_algorithm(query, data);
      data = null;
      $.name.value = "";
      alerted.note("Sucesso!", 1);
      goBack();
    } else {
      var data = [];
      var query =
        'UPDATE category SET title="' +
        names +
        '",color="' +
        colors +
        '" WHERE id=' +
        args[0] +
        " "; //update
      var nada = database.database_call(query);
      $.name.value = "";
      alerted.note("Updated!", 1);
      goBack2();
    }
  }
}
