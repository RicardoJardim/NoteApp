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
		var colArray = Ti.App.Properties.getList('types');
	
		for( var chave in colArray){
			if(tipo == colArray[chave].id){
				var colors = colArray[chave].color;
				console.log(colors);
			}
		}	
	
		var view = Ti.UI.createView({
			cor: colors,
			id: ids,
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
		
		view.addEventListener("longclick", function(e){
			console.log(e.source.id);
			console.log(e.source.cor);
			var args =[e.source.id,e.source.cor];
			var next_win = Alloy.createController('sub_notes',args).getView();
			next_win.open();
			next_win = null;
			$.index.close();
		});
		$.scrollView.add(view);
		
		result.next();
}

$.index.open();

// CANT GO BACK
$.index.addEventListener("android:back", function(){ });

$.add_button.addEventListener("click", function(){
			var next_win = Alloy.createController('create_note').getView();
			next_win.open();
			next_win = null;
			$.index.close();
});