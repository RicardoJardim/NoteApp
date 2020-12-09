var args = $.args;
const alerted = require("alert");
const database = require("database_js");

var id = args[0];
// QUERY FOR SELECTED SUBNOTE
var result2 = database.database_call(`SELECT * FROM subnote WHERE id=${id} `);

var title = result2.fieldByName("title");
var content = result2.fieldByName("content");

$.view_subnotes.addEventListener("androidback", function () {
  goBack();
});
function goBack() {
  $.view_subnotes.close();
}

$.name.text = title;
$.viewsub.backgroundColor = args[2];
$.textArea.text = content;

//EVENT LISTNER FOR DELETING SUBNOTE
function erase(e) {
  database.database_call(`DELETE FROM subnote WHERE id=${id} `);
  alerted.note("The current note was deleted!", 1);
  Alloy.Globals.RenderSubNotesAgain();
  $.view_subnotes.close();
}
