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



var ArrayColors = [ "#ffffff", "#ffff00", "#cc6600", "#002db3", "#b30000", "#4da6ff ", "#ff66cc", "#a3a375","#9900cc"];

Ti.App.Properties.setList('ArrayColors',ArrayColors);
