

var Model = require('scuttlebutt/model');
var net = require('net');
var fs = require('fs');

var m = new Model;
var s = m.createStream();

m.on('error', function(){
	s.destroy();
});

s.on('error', function(err){
	console.log(err);
});

s.pipe(net.connect(8888, 'localhost')).pipe(s); //duplex

// s.on('data', function(chunk){
//     console.dir(chunk);
// });

 if(process.argv[2] && process.argv[3]){
  m.set(process.argv[2], process.argv[3])
 }
// 	m.set('file', process.argv[2]);
// 	console.log('file => ' + m.get('file'));
// //	fs.createReadStream(m.get('file')).pipe(process.stdout);
//   var ws = m.createWriteStream();
//   ws.on('error', function(err){
//     //console.dir(err);
//   });
  
// 	fs.createReadStream(__dirname + '/' + m.get('file')).pipe(s);
// }

m.on('update', function cb(key){
	//wait until we've gotten at least one count value form the network
	if(key[0]!='count') return;
	
	m.removeListener('update', cb);
/*
	setInterval(function(){
		m.set('count', Number(m.get('count')) + 1);
	}, 1000);
*/
});

m.on('update', function(key, source, identityId){
	console.log(key[0] + ' = ' + key[1]);
});

s.on('sync', function(){
	console.log('syncing data..');
	//m.createReadStream().pipe(fs.createWriteStream(file));
});
