var args = $.args;
console.log(args);

var alerted = require('alert');
var database = require("database_js");

var colArray = JSON.parse(Ti.App.Properties.getString('type'));
for( var chave in colArray["types"]){
	if(args[1] == colArray["types"][chave].id){
		var colors = colArray["types"][chave].color;
		console.log(colors);
	}
}	


$.view_create.backgroundColor = colors;

$.create_subnotes.addEventListener("android:back", function(){
		goBack();
	 });
	 
function goBack(){
	var send = [args[0],args[1]];
	var next_win = Alloy.createController('sub_notes',send).getView();
	next_win.open();
	next_win = null;
	$.create_subnotes.close();
}	 

function saveNote(e){
	var titulo = $.title.value;
	var conteudo = $.cont.value;
	var finalText = "";
	if(!titulo){
		var texto = "Falta preencher o titulo \n";
		finalText += texto;
		texto=null;
	}
	if(!conteudo){
		var texto = "Falta preencher o conteudo \n";
		finalText += texto;
		texto=null;
	}
	
	 if(titulo && conteudo){
	 		var data = [];
	 		var query = 'INSERT INTO subnote (title,content,note_id) VALUES (?,?,?)';
	 		data.push(titulo,conteudo,args[0]);
	 		var nada = database.database_call_algorithm(query,data);
	 		nada = null;
	 		data = null;
	 		$.title.value = "";
	 		$.cont.value = "";
	 		var texto = "Sucesso!";
	 		alerted.note(texto,1);
	 		goBack();
	 }
	 else{
	 	alerted.note(finalText,1);
	 	}	 
}