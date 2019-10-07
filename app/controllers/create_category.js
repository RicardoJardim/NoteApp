
var alerted = require('alert');
var database = require("database_js");

$.create_category.addEventListener("android:back", function(){
		goBack();
	 });

function goBack(){
	var next_win = Alloy.createController('index').getView();
	next_win.open();
	next_win = null;
	$.create_category.close();
} 

function inicializa(){
	console.log(Ti.App.Properties.getList('ArrayColors'));
	var ArrayColors = Ti.App.Properties.getList('ArrayColors');
	for(chave in ArrayColors){
		console.log(chave);
		var view = Ti.UI.createView({
			id: chave,
			backgroundColor: ArrayColors[chave],
			height:"14%",
			width:"14%",
			left: "5%",
			top:"5%",
			borderColor: "black",
			elevation:8,
			borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL,
		});
		$.viewColors.add(view);
	}
	
	$.viewColors.addEventListener("click", function(e){
		if(e.source.apiName = "Ti.UI.View" && e.source.id != undefined)
		{
			console.log(e.source.id);
			$.viewcat.backgroundColor = e.source.backgroundColor;	
		}
	});

}

$.create_category.addEventListener('open', function(){
	
	inicializa();
});


function saveCat(e){
	var names = $.name.value;
	var colors = $.viewcat.backgroundColor;
	
	var finalText = "";
	if(!names){
		alerted.note("Falta preencher o nome",1);
	}
	 else{
 		var data = [];
 		var query = 'INSERT INTO category (title,color) VALUES (?,?)';
 		data.push(names,colors);
 		var nada = database.database_call_algorithm(query,data);
 		data = null;
 		$.name.value = "";
 		alerted.note("Sucesso!",1);
 		goBack();
	 }	
}