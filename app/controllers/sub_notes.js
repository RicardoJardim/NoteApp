// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
console.log(args);
var alerted = require('alert');
var database = require("database_js");

var query = 'SELECT * FROM note WHERE id='+ args[0]+'';
var result2 = database.database_call(query);
var title = result2.fieldByName('title');


var tipo = args[1];

var colArray = JSON.parse(Ti.App.Properties.getString('type'));
for( var chave in colArray["types"]){
	if(tipo == colArray["types"][chave].id){
		var colors = colArray["types"][chave].color;
		console.log(colors);
	}
}	


$.add_note.text = title;

var query = 'SELECT * FROM subnote WHERE note_id='+ args[0]+'';

var result = database.database_call(query);

while(result.isValidRow()){
		var ids = result.fieldByName('id');
		var title = result.fieldByName('title');
		var cont = result.fieldByName('content');
		
		console.log("Title: " + title + " Content: " + result.fieldByName('content'));
		
		
		var view = Ti.UI.createView({
			id: ids,
			tit: title,
			content: cont,
			borderRadius: 12,
			elevation: 10,
			layout: 'vertical',
			backgroundColor: colors,
			width: "90%",
			height: 70,
			top: "3%"
		});
		
		var label1 = Ti.UI.createLabel({
			id : ids,
			left:"10%",
			color: "black",
			font: {
				fontSize: 34,
				fontFamily: 'Helvetica Neue'
			},
			top: '2%',
			text: title
		});	
		
		
		view.add(label1);		
		
		$.scrollView.add(view);
		
		var ids = null;
		var title = null;
		var cont = null;
		
		result.next();
		
		
}

$.scrollView.addEventListener("longclick", function(e){
			console.log(e.source.id);
	
			console.log(e.source.apiName);
			var val = args[0];
			var val2 = args[1];
			
			var sed =[e.source.id,val,val2,e.source.content,e.source.tit];
			console.log(sed);
			/*
			var next_win = Alloy.createController('view_subnote',sed).getView();
			next_win.open();
			next_win = null;
			$.sub_notes.close();*/
		});

function erase(e){
	console.log(args[0]);
	var query = 'DELETE FROM note WHERE id = '+ args[0]+'';
	var result = database.database_call(query);
	alerted.note("Foi eliminado da database",1);
	var next_win = Alloy.createController('index').getView();
	next_win.open();
	next_win = null;
	$.sub_notes.close();
}

function add_subnotes(e){

		var val = args[0];
		var val2 = args[1];
		var sed =[val,val2];
		console.log(sed);
		var next_win = Alloy.createController('create_subnotes',sed).getView();
		next_win.open();
		next_win = null;
		$.sub_notes.close();
}

$.sub_notes.addEventListener("android:back", function(){
	var next_win = Alloy.createController('index').getView();
	next_win.open();
	next_win = null;
	$.sub_notes.close();
	 });