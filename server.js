var fs = require('fs'),
    express = require('express'),
    Collection = require('./lib/db').Collection,
    app = module.exports = express();

app.configure(function () {
    app.set("view options", {layout: false});
    app.engine('.html', function (path, options, fn) {
        fs.readFile(path, 'utf8', function (err, str) {
            if (err) {
                return fn(err);
            }
            fn(null, str);
        });
    });
    app.set('views', __dirname + '/views');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/master', function (req, res) {
    res.render('index.html');
});

var server = app.listen(80),
    io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    socket.on('products:read', function (data, callback) {
        socket.emit('products:read', {data: movieDB.toJSON()});
    });

    socket.on('users:construct', function (data, callback) {
        userDB.add(data);
        socket.emit('users:construct', {data: data});
        socket.broadcast.emit('users:construct', {data: data});
    });

    socket.on('signals:update', function (data, callback) {
        socket.emit('signals/' + data.id + ':update', {data: data});
        socket.broadcast.emit('signals/' + data.id + ':update', {data: data});
    });
});
