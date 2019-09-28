var alerted = require('alert');
var database = require("database_js");

database.install();

//-------------------------
//LEFT VIEW
var leftView = Ti.UI.createView({ backgroundColor:'red' });

//CENTER VIEW WITH TOP BOTTON AND SCROLLVIEW
var overallView = Ti.UI.createView({ layout:"vertical" });


var topView = Ti.UI.createView({
	top:1,
	height: 105,
	elevation :10,
	backgroundColor:"#e6e6e6",
});


//TOP BOTTON
var btn = Ti.UI.createButton({ backgroundImage: "/settings.png", top:"6%" , left:"5%", width:"12%", height:"35%"});
topView.add(btn);

//Search bar
var search = Titanium.UI.createSearchBar({ color:"black",focusable:true,width:"98%",barColor:'#ffffff', showCancel:true, height:50, bottom:1,hintText:"Search by note", hintTextColor:"#cccccc" });
topView.add(search);


search.addEventListener("change", function(e) {

	console.log(search.value);

	if (search.value == "") {
		var query = "SELECT note.*,category.color FROM note,category WHERE note.category_id = category.id";
		populate(query);
	} else {
		scroolView.setData([]);
		var query = 'SELECT note.*,category.color FROM note,category WHERE note.category_id = category.id AND note.title LIKE "%' + search.value + '%" ';
		
		if (database.database_check(query)) {			
			populate(query);
		}
	}
		
});

//TOP BOTTON
var btn2 = Ti.UI.createButton({ backgroundImage: "/add.png" , top:"6%" , right:"4%", width:"11%", height:"35%"});
topView.add(btn2);
//TOP BOTTON
var addText = Ti.UI.createLabel({ text:"Add Note" , top:"6%" ,color:"black", right:"18%",font: {fontSize: 26,fontFamily: 'Helvetica Neue'},	});
topView.add(addText);

btn2.addEventListener("click", function(){
			var next_win = Alloy.createController('create_note').getView();
			next_win.open();
			next_win = null;
			$.index.remove(drawer);
			$.index.close();
});

overallView.add(topView);


btn.addEventListener('click', function() {
    drawer.toggleLeft();
});

//SCROOLVIEW
var scroolView = Ti.UI.createTableView({
	  height: Ti.UI.FILL,
	  width: '100%',
	  backgroundColor: '#e6e6e6',
	  	separatorStyle:Ti.UI.TABLE_VIEW_SEPARATOR_STYLE_NONE,
	
	});


overallView.add(scroolView);


overallView.addEventListener("click", function(e){
	
	console.log(e.source.apiName);
	if( e.source.apiName = "Ti.UI.View" && e.source.id != undefined){
		console.log(e.source.id);
		var args =[e.source.id];
		var next_win = Alloy.createController('sub_notes',args).getView();
		next_win.open();
		next_win = null;
		$.index.close();
	}
	
});

var drawer = Ti.UI.Android.createDrawerLayout({
    leftView: leftView,
    centerView: overallView,
});



$.index.addEventListener('open', function(){
	

	var query = "SELECT note.*,category.color FROM note,category WHERE note.category_id = category.id";
	populate(query);
	
    var activity = $.index.getActivity(),
        actionBar = activity.getActionBar();

    if (actionBar) {
        actionBar.displayHomeAsUp = true;
        actionBar.onHomeIconItemSelected = function() {
            drawer.toggleRight();
        };
    }
    
});

$.index.add(drawer);

//-----------------
function populate(query){
	
	var data = [];
	
	var result = database.database_call(query);
	
	while(result.isValidRow()){
			var ids = result.fieldByName('id');
			var title = result.fieldByName('title');
			var desc = result.fieldByName('description');
			var cat = result.fieldByName('category_id');
			var colors = result.fieldByName('color');
			console.log("Title: " + title + " Description: " + desc + " Category_id: " + cat + " Color: " + colors);
			
			if(desc != null &&  desc != ""){
				
				var view = Ti.UI.createView({
					id: ids,
					borderRadius: 12,
					elevation: 10,
					layout: 'vertical',
					backgroundColor: colors,
					width: "90%",
					height: 150,
					top:"2%",
					bottom:"1%",
				});
				
			}
			else{
				
				var view = Ti.UI.createView({
					id: ids,
					type: cat,
					borderRadius: 12,
					elevation: 10,
					layout: 'vertical',
					backgroundColor: colors,
					width: "90%",
					height: 100,
					top:"2%",
					bottom:"1%",
				});
			}
			
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
			
			var row = Ti.UI.createTableViewRow({
					width : "100%",
					height : Ti.UI.SIZE,
				});
			row.add(view);	
			data.push(row);	
			result.next();
			row = null;
	}
	var row = Ti.UI.createTableViewRow({
					width : "100%",
					height : 20,
				});	
	data.push(row);
	
	scroolView.setData(data);
	data = null;
}
		
$.index.open();

// CANT GO BACK
$.index.addEventListener("android:back", function(){ });

