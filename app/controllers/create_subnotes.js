var args = $.args;
console.log(args);

var alerted = require('alert');

$.view_create.backgroundColor = args[1];

$.create_subnotes.addEventListener("android:back", function(){
		goBack();
	 });

function goBack(){
	var send = [args[0]];
	var next_win = Alloy.createController('sub_notes',send).getView();
	next_win.open();
	next_win = null;
	$.create_subnotes.close();
}

// FUNCTION FOR SAVING A NEW NOTE
function saveNote(e){
	var database = require("database_js");

	var titulo = $.title.value;
	var conteudo = $.cont.value;
	var finalText = "";
	//ERROR HANDELING
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
	//VERIFICATIONS AND INSERTING THE NEW SUBNOTE
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
