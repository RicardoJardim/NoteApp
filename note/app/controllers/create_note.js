
var alerted = require('alert');
var database = require("database_js");

$.create_note.addEventListener("android:back", function(){
		goBack();
	 });

function goBack(){
	var next_win = Alloy.createController('index').getView();
	next_win.open();
	next_win = null;
	$.create_note.close();
} 


function inicializa(){
	var colArray = Ti.App.Properties.getList('types');

	var picks = [];
	
	for( var chave in colArray){
		picks.push(Ti.UI.createPickerRow({title:colArray[chave].type , id:colArray[chave].id}));
	}
	$.picker.add(picks);
	
}

$.picker.selectionIndicator = true;
inicializa();

// mudar o estado interno
var idPicker = null;
$.picker.addEventListener("change", function(e){
	Ti.API.info(e.row.title);
	idPicker = e.row.id;
});

function saveNote(e){
	var titulo = $.title.value;
	var descricao = $.descrip.value;
	var finalText = "";
	if(!titulo){
		var texto = "Falta preencher o titulo \n";
		finalText += texto;
		texto=null;
	}

	if(!idPicker){
		var texto = "Falta escolher o tipo da nota \n";
		finalText += texto;
		texto=null;
	}
	
	 if(titulo && idPicker){
	 		var data = [];
	 		var query = 'INSERT INTO note (title,description,type) VALUES (?,?,?)';
	 		data.push(titulo,descricao,idPicker);
	 		var nada = database.database_call_algorithm(query,data);
	 		nada = null;
	 		data = null;
	 		$.title.value = "";
	 		$.descrip.value = "";
	 		idPicker = null;
	 		var texto = "Sucesso!";
	 		alerted.note(texto,1);
	 		goBack();
	 }
	 else{
	 	alerted.note(finalText,1);
	 	
	 }
	 
	
}
