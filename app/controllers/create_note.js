const alerted = require("alert");
const database = require("database_js");

$.create_note.addEventListener("androidback", function () {
  goBack();
});

function goBack() {
  $.create_note.close();
}

//PICKER FOR SHOWING ALL CATEGORIES
function inicializa() {
  var picks = [];

  var result = database.database_call("SELECT * FROM category");

  while (result.isValidRow()) {
    var ids = result.fieldByName("id");
    var titles = result.fieldByName("title");
    var colors = result.fieldByName("color");

    picks.push(
      Ti.UI.createPickerRow({ title: titles, id: ids, color: colors })
    );
    result.next();
  }

  $.picker.add(picks);
}

$.picker.selectionIndicator = true;

$.create_note.addEventListener("open", function () {
  inicializa();
});

// mudar o estado interno
var idPicker = 1;
$.picker.addEventListener("change", function (e) {
  idPicker = e.row.id;
  $.view_create.backgroundColor = e.row.color;
  $.picker_view.backgroundColor = e.row.color;
});
// FUNCTION FOR SAVING A NEW NOTE
function saveNote(e) {
  var titulo = $.title.value;
  var descricao = $.descrip.value;
  var finalText = "";
  //ERROR HANDELING
  if (!titulo) {
    finalText += "Title of the note is missing!\n";
  }

  if (!idPicker) {
    finalText += "Type of the note is missing! \n";
  }
  //VERIFICATIONS AND INSERTING THE NEW SUBNOTE
  if (titulo && idPicker) {
    var nada = database.database_call_algorithm(
      "INSERT INTO note (title,description,category_id) VALUES (?,?,?)",
      [titulo, descricao, idPicker]
    );
    nada = null;
    $.title.value = "";
    $.descrip.value = "";
    idPicker = null;
    alerted.note("The group note was created!", 1);
    Alloy.Globals.RenderAgain();
    goBack();
  } else {
    alerted.note(finalText, 1);
  }
}
