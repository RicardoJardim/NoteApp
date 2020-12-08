var alerted = require("alert");
var database = require("database_js");

$.create_note.addEventListener("androidback", function () {
  goBack();
});

function goBack() {
  $.create_note.close();
}

//PICKER FOR SHOWING ALL CATEGORIES
function inicializa() {
  var picks = [];

  var query = "SELECT * FROM category";

  var result = database.database_call(query);

  while (result.isValidRow()) {
    var ids = result.fieldByName("id");
    var titles = result.fieldByName("title");
    var colors = result.fieldByName("color");
    console.log(ids, titles, colors);
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
  Ti.API.info(e.row.title);
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
    finalText += "Falta preencher o titulo \n";
  }

  if (!idPicker) {
    finalText += "Falta escolher o tipo da nota \n";
  }
  //VERIFICATIONS AND INSERTING THE NEW SUBNOTE
  if (titulo && idPicker) {
    var data = [];
    var query =
      "INSERT INTO note (title,description,category_id) VALUES (?,?,?)";
    data.push(titulo, descricao, idPicker);
    var nada = database.database_call_algorithm(query, data);
    nada = null;
    data = null;
    $.title.value = "";
    $.descrip.value = "";
    idPicker = null;
    alerted.note("Sucesso!", 1);
    Alloy.Globals.RenderAgain();
    goBack();
  } else {
    alerted.note(finalText, 1);
  }
}
