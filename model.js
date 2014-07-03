

var Model = require('scuttlebutt/model');

var am = new Model;
var as = am.createStream();

var bm = new Model;
var bs = bm.createStream();

var cm = new Model;
var cs = cm.createStream();

var dm = new Model;
var ds = dm.createStream();

var em = new Model;
var es = em.createStream();

as.pipe(bs).pipe(as); //duplex these guys
bs.pipe(cs).pipe(bs);
cs.pipe(ds).pipe(cs);
ds.pipe(es).pipe(ds);

em.on('update', function(keyVal, source, updateId){
	console.log(keyVal[0] + ' => ' + keyVal[1] + ' from ' + source);
});

am.set('x', 555);
