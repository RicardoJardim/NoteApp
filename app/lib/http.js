/*
 * HTTP REQUESTS
 */

// ====
// POST JSON

exports.post = function(url, data, callback) {

	// setup
		var postURL = Ti.App.Properties.getString("serverUrl") + url;
		//Talvez mudar
		var user_token = Ti.App.Properties.getString("token");
			console.log("---------------------------");
			console.log("-- POST - START");
			console.log("-- POST - URL: " + postURL);


	// list data
		for (var child in data) {
			if (data.hasOwnProperty(child)) {
				console.log("-- POST - DATA: " + data[child]);
			}
		}

	// online
		if (Titanium.Network.online) {
			var xhr = Ti.Network.createHTTPClient({
				onload : function() {

					// debug
						console.log("-- POST - " + url + " - START");
						console.log("-- POST - " + url + " - STATUS: " + this.status);
						console.log("-- POST - " + url + " - TEXT:   " + this.responseText);

					// status ok
						if (this.status == "200") {
							if (checkJSON(this.responseText)) {
								 callback(JSON.parse( this.responseText ));
							}
							else
							{
								handleError(e,url,this.status,this.responseText);
							}
						}
						console.log("-- POST - " + url + " - END");
				},
				onerror : function(e) {
					if(checkJSON(this.responseText))
					{
						callback(JSON.parse(this.responseText));
					}
					else
					{
						handleError(e,url,this.status,this.responseText);
					}
					},
				timeout : 10000
			});
			xhr.open('POST', postURL);
			if(user_token != "")
			{
				console.log("-- TOKEN : "+ user_token);
				xhr.setRequestHeader('Authorization','Bearer ' + user_token);
			}
			xhr.send(data);
	// offline
		}
		else {
			alerted = require('alert');
            alerted.note("Offline, turn on the internet",1);
            alerted = null;
		}

};

// =====================
//HELPERS

// CHECK JSON

	function checkJSON(_json) {
		try {
			JSON.parse(_json);
		} catch(e) {
			var alerted = require('alert');
				alerted.show(e);
				alerted = null;
			return false;
		}
		return true;
	}

//HANDLE ERRORS
	function handleError(e,url,status,text){

			alerted = require('alert');
            alerted.note(e.error,1);
            alerted = null;
	        console.log("-- URL - " + url + " - STATUS ERR: " + status);
	        console.log("-- URL - " + url + " - TEXT ERR:   " + text);
	        console.log("-- URL - " + url + " - ERROR:      " + e.error);
	        console.log("-- URL - " + url + " - END");

		}

// ===================

// GET JSON

exports.gets = function(url,callback) {
	// setup
		var getURL = Ti.App.Properties.getString("serverUrl") + url;
		var user_token = Ti.App.Properties.getString("token");

		console.log("---------------------------");
		console.log("-- GET - START");
		console.log("-- GET - URL: " + getURL);

	// online
		if (Titanium.Network.online) {
			var xhr = Ti.Network.createHTTPClient({
				onload : function() {
					// debug
						console.log("-- GET - " + url + " - START");
						console.log("-- GET - " + url + " - STATUS: " + this.status);
						console.log("-- GET - " + url + " - TEXT:   " + this.responseText);
					// status ok
						if (this.status == "200") {
							if(checkJSON(this.responseText))
							{
								callback(JSON.parse(this.responseText));
							}
							else
							{
								handleError(e,url,this.status,this.responseText);
							}
						}
					console.log("-- GET - " + url + " - END");
				},

				onerror : function(e) {
						if(checkJSON(this.responseText))
						{
							callback(JSON.parse(this.responseText));
						}
						else
						{
							handleError(e,url,this.status,this.responseText);
						}
					},
				timeout : 10000
			});

			xhr.open('GET', getURL);

			if(user_token != "")
			{
				console.log("-- TOKEN : "+ user_token);
				xhr.setRequestHeader('Authorization','Bearer ' + user_token);
			}
			xhr.send();

	// offline
		}
		 else {
				alerted = require('alert');
            	alerted.note("Offline, turn on the internet",1);
            	alerted = null;
			}
};
