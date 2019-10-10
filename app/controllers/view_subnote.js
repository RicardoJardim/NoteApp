
var args = $.args;
var alerted = require('alert');
var database = require("database_js");
// QUERY FOR SELECTED SUBNOTE
var query = 'SELECT * FROM subnote WHERE id ='+ args[0]+'';
var result2 = database.database_call(query);

var title = result2.fieldByName('title');
var content = result2.fieldByName('content');


$.view_subnotes.addEventListener("android:back", function(){
	var send = [args[1]];
	var next_win = Alloy.createController('sub_notes',send).getView();
	next_win.open();
	next_win = null;
	$.view_subnotes.close();
	 });

$.name.text = title;
$.viewsub.backgroundColor = args[2];
$.textArea.text = content;

//EVENT LISTNER FOR DELETING SUBNOTE
function erase(e){
	console.log(args[0]);
	var query = 'DELETE FROM subnote WHERE id = '+ args[0]+'';
	var result = database.database_call(query);
	alerted.note("Foi eliminado da database",1);
	var send = [args[1]];
	var next_win = Alloy.createController('sub_notes',send).getView();
	next_win.open();
	next_win = null;
	$.view_subnotes.close();
}
