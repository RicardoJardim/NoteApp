// Arguments passed into this controller can be accessed via the `$.args` object directly or:

//UTILIZA APENAS O ID DA MAIN NOTA
var args = $.args;
console.log(args);

var alerted = require('alert');
var database = require("database_js");

var query = 'SELECT note.title,category.color FROM note,category WHERE note.category_id = category.id AND note.id='+args[0]+'';
var result2 = database.database_call(query);

var title = result2.fieldByName('title');
var colors = result2.fieldByName('color');


/////////

var topView = Ti.UI.createView({
	top:1,
	height: 105,
	elevation :10,
	backgroundColor:"#e6e6e6",
});

//Search bar
var search = Titanium.UI.createSearchBar({ color:"black",focusable:true,width:"98%",barColor:'#ffffff', showCancel:true, height:50, bottom:1,hintText:"Search by note", hintTextColor:"#cccccc" });
topView.add(search);


search.addEventListener("change", function(e) {

	console.log(search.value);

	if (search.value == "") {
		var query = 'SELECT * FROM subnote WHERE note_id='+ args[0]+'';
		populate(query);
	} else {
		scroolView.setData([]);
		var query = 'SELECT * FROM subnote WHERE note_id='+ args[0]+' AND title LIKE "%' + search.value + '%" ';
		if (database.database_check(query)) {			
			populate(query);
		}
	}
		
});

//TOP LEFT LABEL
var btn = Ti.UI.createLabel({ text:title , top:"6%" ,color:"black", left:"5%",font: {fontSize: 26,fontFamily: 'Helvetica Neue'},	});
topView.add(btn);

//TOP BOTTON
var btn2 = Ti.UI.createButton({ backgroundImage: "/add.png" , top:"6%" , right:"4%", width:"11%", height:"35%"});
topView.add(btn2);
//TOP BOTTON LABEl
var addText = Ti.UI.createLabel({ text:"Add Note" , top:"6%" ,color:"black", right:"18%",font: {fontSize: 26,fontFamily: 'Helvetica Neue'},	});
topView.add(addText);

btn2.addEventListener("click", function(){
		var val = args[0];
		var sed =[val,colors];
		
		console.log(sed);
		var next_win = Alloy.createController('create_subnotes',sed).getView();
		next_win.open();
		next_win = null;
		$.sub_notes.close();
});

$.sub_notes.add(topView);

//SCROOLVIEW
var scroolView = Ti.UI.createTableView({
	  height: Ti.UI.FILL,
	  width: '100%',
	  backgroundColor: '#e6e6e6',
	  separatorStyle:Ti.UI.TABLE_VIEW_SEPARATOR_STYLE_NONE,
});

var queryFirst = 'SELECT * FROM subnote WHERE note_id='+ args[0]+'';
populate(queryFirst);
	

scroolView.addEventListener("click", function(e){
	
	console.log(e.source.apiName);
	if( e.source.apiName = "Ti.UI.View" && e.source.id != undefined){
		console.log(e.source.id);
						
			var sed =[e.source.id,args[0],colors];
			console.log(sed);
			var next_win = Alloy.createController('view_subnote',sed).getView();
			next_win.open();
			next_win = null;
			$.sub_notes.close();	
	}
	
});

$.sub_notes.add(scroolView);


///////
function populate(query){
	
	var data =[];
	
	var result = database.database_call(query);
	
	while(result.isValidRow()){
			var ids = result.fieldByName('id');
			var title = result.fieldByName('title');
					
			console.log("Title: " + title );
			
			
			var view = Ti.UI.createView({
				id: ids,
				borderRadius: 12,
				elevation: 10,
				layout: 'vertical',
				backgroundColor: colors,
				width: "90%",
				height: 80,
				top:"2%",
				bottom:"1%",
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
			
			var row = Ti.UI.createTableViewRow({
						width : "100%",
						height : Ti.UI.SIZE,
					});
			row.add(view);	
			data.push(row);	
			ids = null;
			title = null;
			result.next();	
		}
	view = null;
	label1 = null;
	row= null;	
	var Emptyrow = Ti.UI.createTableViewRow({
					width : "100%",
					height : 20,
				});	
	data.push(Emptyrow);
	
	var eraseBtn = Ti.UI.createButton({
		title:"Erase note",
		backgroundColor: "red",
		width: "90%",
		height: Ti.UI.Size,
		color:"#ffffff",
		borderRadius: "5",
		font: {
			fontSize: 18,
			fontWeight: "bold"
		}
	});
	
	eraseBtn.addEventListener("click",erase);
	
	var row = Ti.UI.createTableViewRow({
					width : "100%",
					height : Ti.UI.SIZE,
				});
	row.add(eraseBtn);	
	data.push(row);	

	data.push(Emptyrow);
	
	
	scroolView.setData(data);
	data = null;
	row = null;	
}

//Apagar nota main
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


//Go back
$.sub_notes.addEventListener("android:back", function(){
	var next_win = Alloy.createController('index').getView();
	next_win.open();
	next_win = null;
	$.sub_notes.close();
	 });