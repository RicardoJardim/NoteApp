// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

var obj = {
	"types":[
			{id:1,type:"project",color:"#ffff00"},
			{id:2,type:"UMa",color:'#cc0000'},
		 	{id:3,type:"M-iti",color:'#002db3'},
		 	{id:4,type:"random",color:'#cc6600' }
		]
};

Ti.App.Properties.setString('type', JSON.stringify(obj));


