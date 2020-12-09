var args = $.args;
const alerted = require("alert");

$.view_create.backgroundColor = args[1];

$.create_subnotes.addEventListener("androidback", function () {
  goBack();
});
function goBack() {
  $.create_subnotes.close();
}

// FUNCTION FOR SAVING A NEW NOTE
function saveNote(e) {
  var database = require("database_js");

  var titulo = $.title.value;
  var conteudo = $.cont.value;
  var finalText = "";
  //ERROR HANDELING
  if (!titulo) {
    finalText += "Title of the note is missing!\n";
  }
  if (!conteudo) {
    finalText += "Content of the note is missing!\n";
  }
  //VERIFICATIONS AND INSERTING THE NEW SUBNOTE
  if (titulo && conteudo) {
    var nada = database.database_call_algorithm(
      "INSERT INTO subnote (title,content,note_id) VALUES (?,?,?)",
      [titulo, conteudo, args[0]]
    );
    nada = null;
    $.title.value = "";
    $.cont.value = "";
    alerted.note("The note was created!", 1);
    Alloy.Globals.RenderSubNotesAgain();
    $.create_subnotes.close();
  } else {
    alerted.note(finalText, 1);
  }
}
