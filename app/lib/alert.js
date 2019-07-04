// ======
// ALERTS


exports.note=function(alertText,n) 
{
	var notification = Ti.UI.createNotification({
	    message: alertText,
	    gravity: Titanium.UI.Android.GRAVITY_RELATIVE_LAYOUT_DIRECTION,
	    });	
	    
	if(n == 1){
		notification.duration = Ti.UI.NOTIFICATION_DURATION_SHORT;
		console.log(" Note time short");
		notification.show();
	}
	else{
		notification.duration = Ti.UI.NOTIFICATION_DURATION_LONG;
		console.log("Note time long");	
		notification.show();
	}
	
};



exports.show = function(alertText) {
	
	// POPUP
	
		var indWin = Titanium.UI.createWindow({
			opacity : 0,
			// backgroundColor : "00FFFFFF",
			navBarHidden : false,
			fullscreen : false,
            tabBarHidden : false,
			height : "15%",
			bottom : "15%",
			orientationModes: [
				Ti.UI.PORTRAIT,
				Ti.UI.UPSIDE_PORTRAIT
			]
		});
			var indView = Titanium.UI.createView({
				height : Ti.UI.SIZE,
				width : Ti.UI.SIZE,
				borderRadius : 10,
				backgroundColor : '#ff0000',
				opacity : 1.0
				// bottom : "15%"
			});	indWin.add(indView);
				var message = Titanium.UI.createLabel({
					// text : alertText,
					text : alertText + "          " + "\n",
					color : '#ffffff',
					textAlign : "center",
					font : {
						fontFamily : 'Smoolthan-Bold',
						fontSize : 14
					}
				});	indView.add(message);
	
	// POPUP TIMER ANIMATION

		var interval = interval ? interval : 2000;
		indWin.open({
		    modal : false,
        });
		var animation = Titanium.UI.createAnimation({
			duration : 400,
			opacity : 1.0
		});
		var animationHandler = function() {
			animation.removeEventListener('complete', animationHandler);
			indWin.animate(animation);
		};
		animation.addEventListener('complete', animationHandler);
		indWin.animate(animation);

		setTimeout(function() {
			
			// close
				indWin.close({
					opacity : 0,
					duration : 400,
					modal : false
				});
			
				setTimeout(function () {
					indWin.removeAllChildren();
					indWin = null;
					indView = null;
					message = null;
					interval = null;
					animation = null;
					animationHandler = null;
				}, 400);
			}, interval);
			
};



