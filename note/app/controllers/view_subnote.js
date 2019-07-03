
var args = $.args;
var alerted = require('alert');
var database = require("database_js");

$.view_subnotes.addEventListener("android:back", function(){
	var send = [args[1],args[2]];
	var next_win = Alloy.createController('sub_notes',send).getView();
	next_win.open();
	next_win = null;
	$.view_subnotes.close();
	 });
	 
$.name.text = args[4];
$.viewsub.backgroundColor = args[2];
$.textArea.text = args[3];

function erase(e){
	console.log(args[0]);
	var query = 'DELETE FROM subnote WHERE id = '+ args[0]+'';
	var result = database.database_call(query);
	alerted.note("Foi eliminado da database",1);
	var send = [args[1],args[2]];
	var next_win = Alloy.createController('sub_notes',send).getView();
	next_win.open();
	next_win = null;
	$.view_subnotes.close();
}

