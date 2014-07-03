var Model = require('scuttlebutt/model');
var net = require('net');
var fs = require('fs');

var m = new Model;

m.on('error', function(err){
	console.dir(err);
});

m.on('update', function(key, source, updateId){
//	m.set(key[0], key[1]);
	console.log('update called: ' + key[0] + ' => ' + key[1]);
});

m.set('test', true);

var server = net.createServer(function(stream){
        stream.pipe(m.createStream()).pipe(stream); //duplex
       
        // var ws = m.createReadStream();
        // ws.on('sync', function(data){
        //   console.dir(data);
        // 	//if(!m.get('file')) return;
        // 	console.log('syncing data...');
        // 	m.createReadStream().pipe(process.stdout);
        // });
        // stream.pipe(ws).pipe(process.stdout);
        
});

server.listen(8888);

/*
var iv = setInterval(function(){
        m.set('count', Number(m.get('count')) + 1);
	if(Number(m.get('count')) > 100) clearInterval(iv);
}, 320);
*/
