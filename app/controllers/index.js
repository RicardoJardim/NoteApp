var alerted = require('alert');
var database = require("database_js");

database.install();


var query = "SELECT * FROM note";

var result = database.database_call(query);

while(result.isValidRow()){
		var ids = result.fieldByName('id');
		var title = result.fieldByName('title');
		var desc = result.fieldByName('description');
		var tipo = result.fieldByName('type');
		
		console.log("Title: " + title + " Description: " + desc + " Type: " + tipo);
		var colArray = JSON.parse(Ti.App.Properties.getString('type'));
		for( var chave in colArray["types"]){
			if(tipo == colArray["types"][chave].id){
				var colors = colArray["types"][chave].color;
				console.log(colors);
			}
		}	
	
		var view = Ti.UI.createView({
			id: ids,
			type: tipo,
			borderRadius: 12,
			elevation: 10,
			layout: 'vertical',
			backgroundColor: colors,
			width: "90%",
			height: 180,
			top: "2%",
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
		
		var label2 = Ti.UI.createLabel({
			id : ids,
			left:"4%",
			color: "black",
			font: {
				fontSize: 16,
				fontFamily: 'Helvetica Neue'
			},
			top: '2%',
			text: desc
		});	
		
		view.add(label1);
		view.add(label2);
		
		$.scrollView.add(view);
		result.next();
}


$.scrollView.addEventListener("longclick", function(e){
	
	console.log(e.source.id);
	console.log(e.source.type);
	console.log(e.source.apiName);
	/*
	var args =[e.source.id,e.source.type];
	var next_win = Alloy.createController('sub_notes',args).getView();
	next_win.open();
	next_win = null;
	$.index.close();*/
});
		
$.index.open();

// CANT GO BACK
$.index.addEventListener("android:back", function(){ });

$.add_button.addEventListener("click", function(){
			var next_win = Alloy.createController('create_note').getView();
			next_win.open();
			next_win = null;
			$.index.close();
});