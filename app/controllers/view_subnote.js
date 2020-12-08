var args = $.args;
var alerted = require("alert");
var database = require("database_js");
// QUERY FOR SELECTED SUBNOTE
var query = "SELECT * FROM subnote WHERE id =" + args[0] + "";
var result2 = database.database_call(query);

var title = result2.fieldByName("title");
var content = result2.fieldByName("content");

$.view_subnotes.addEventListener("androidback", function () {
  $.view_subnotes.close();
});

$.name.text = title;
$.viewsub.backgroundColor = args[2];
$.textArea.text = content;

//EVENT LISTNER FOR DELETING SUBNOTE
function erase(e) {
  database.database_call(`DELETE FROM subnote WHERE id = ${args[0]}`);
  alerted.note("Foi eliminado da database", 1);
  Alloy.Globals.RenderSubNotesAgain();
  $.view_subnotes.close();
}
