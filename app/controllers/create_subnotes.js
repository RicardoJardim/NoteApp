var args = $.args;
console.log(args);

var alerted = require("alert");

$.view_create.backgroundColor = args[1];

$.create_subnotes.addEventListener("androidback", function () {
  $.create_subnotes.close();
});

// FUNCTION FOR SAVING A NEW NOTE
function saveNote(e) {
  var database = require("database_js");

  var titulo = $.title.value;
  var conteudo = $.cont.value;
  var finalText = "";
  //ERROR HANDELING
  if (!titulo) {
    finalText += "Falta preencher o titulo \n";
  }
  if (!conteudo) {
    finalText += "Falta preencher o conteudo \n";
  }
  //VERIFICATIONS AND INSERTING THE NEW SUBNOTE
  if (titulo && conteudo) {
    var data = [];
    var query = "INSERT INTO subnote (title,content,note_id) VALUES (?,?,?)";
    data.push(titulo, conteudo, args[0]);
    var nada = database.database_call_algorithm(query, data);
    nada = null;
    data = null;
    $.title.value = "";
    $.cont.value = "";
    alerted.note("Sucesso!", 1);
    Alloy.Globals.RenderSubNotesAgain();
    $.create_subnotes.close();
  } else {
    alerted.note(finalText, 1);
  }
}
