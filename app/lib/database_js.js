//////////////// INSTALL DATABASE
exports.install = function() {

	console.log('called install ');
	
	var db = Ti.Database.install('database.sqlite', 'database');
	db.close();
};

//////////////// ALL DATABASE INSERT QUERYS ALGORITHM
// EX: query = 'INSERT INTO user (name,country) VALUES';
// vect[0] = '"'+name+'"';
exports.database_call_insert_algorithm = function(query,vect) {
	
	console.log('called insert database.js');
	var dbOpen = Ti.Database.open('database');

	var rs = dbOpen.execute(query + " (" + vect.toString() + ")");
	dbOpen.close();
	Ti.API.info("insert:",query," values:",vect.toString());
	return rs;
};

//////////////// ALL DATABASE RELATED QUERYS
// EX: query =  'DELETE FROM user WHERE name = "'+ label+'"'; 
exports.database_call = function(query)
{
	
	console.log('called database_call from database.js');
	
	var dbOpen = Ti.Database.open('database');
	var rs = dbOpen.execute(query);
	dbOpen.close();
	Ti.API.info("Query called:",query);
	return rs;
};


//////////////// ALL DATABASE RELATED QUERYS ALGORITHM
// EX: query = 'INSERT INTO user (name,country) VALUES (?,?)';
// UTILIZAR ATE 6 ?

exports.database_call_algorithm = function(query,vect) {
	
	console.log('called algorithm database.js');
	var dbOpen = Ti.Database.open('database');

	var data = [];
	for(var i = 0; i<vect.length; i++){
		data.push(vect[i]);
	}
	switch(i)
	{
		case 1:
			var rs = dbOpen.execute(query,data[0]);
			break;
		case 2:
			var rs = dbOpen.execute(query,data[0],data[1]);
			break;
		case 3:
			var rs = dbOpen.execute(query,data[0],data[1],data[2]);
			break;
		case 4:
			var rs = dbOpen.execute(query,data[0],data[1],data[2],data[3]);
			break;
		case 5:
			var rs = dbOpen.execute(query,data[0],data[1],data[2],data[3],data[4]);
			break;
		case 6:
			var rs = dbOpen.execute(query,data[0],data[1],data[2],data[3],data[4],data[5]);
			break;
		
		default:
			alert("ERROR, lack of parameters");
	}
	
	dbOpen.close();
	Ti.API.info("insert:",query," values:",data.toString());
	data = [];
	return rs;
};


//RETORNA true ou false indicando se existe ou nao
exports.database_check= function(query)
{
	console.log('called database_call from database.js');
	var dbOpen = Ti.Database.open('database');

	Ti.API.info("Query called:",query);
	try
	{
		var rs = dbOpen.execute(query);
		rs.field(0);
		
	}
	catch(e){	
		return false;
	}		
		dbOpen.close();
		return true;
	
};
