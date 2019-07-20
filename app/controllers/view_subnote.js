
var args = $.args;
var alerted = require('alert');
var database = require("database_js");

var colArray = JSON.parse(Ti.App.Properties.getString('type'));
for( var chave in colArray["types"]){
	if(args[2] == colArray["types"][chave].id){
		var colors = colArray["types"][chave].color;
		console.log(colors);
	}
}	


$.view_subnotes.addEventListener("android:back", function(){
	var send = [args[1],args[2]];
	var next_win = Alloy.createController('sub_notes',send).getView();
	next_win.open();
	next_win = null;
	$.view_subnotes.close();
	 });
	 
$.name.text = args[4];
$.viewsub.backgroundColor = colors;
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

