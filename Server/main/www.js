
/**
 * Module dependencies.
 */

const Fs = require('fs');
const {name} = require('@models/app');
const model = require('@models/www');
const app = require('./app');

///const debug = require('debug')(`${name}:server`);

var http = require('http');

/**
 * Get ports from config and store in Express.
 */

app.set('ports', model.protocols);


/**
 * Create HTTP(s/2) server(s).
 */

const servers = Object.keys(model.protocols).map(function(protocol){
    if (protocol.match(/^h(?:ttp\/?)2$/)) { // Accept http2, http/2 and h2 or actual spdy.
        protocol = "spdy";
    };
    try {
        var port = normalizePort(model.protocols[protocol]);
        switch (protocol) {
            case 'h2':
            case 'http2':
                var engine = require('spdy');
                break;
            case 'https':
                var engine = require('https');
                break;
            case 'http':
                var engine = require('http');
                break;
        };
        var args = [app];
        if (protocol != 'http') {
            const {privateKey, certificate} = model.files || {};
            if (! privateKey || ! certificate) throw "SSL Key or Cert file not specified";
            args.unshift({
                key: String(Fs.readFileSync(privateKey, 'utf8')),
                cert: String(Fs.readFileSync(certificate, 'utf8')),
            });
        };

        var server = engine.createServer.apply(engine, args);
        server.port = port;

        return {
            address: model.address,
            port,
            protocol,
            server,
        }

    } catch (err) {
        onError(err);
    };
});


/**
 * Listen on provided port, on all network interfaces.
 */

servers.map(srv=>{
    srv.server.listen(srv.port, srv.address);
    srv.server.on('error', x=>onError.call(srv));
    srv.server.on('listening', x=>onListening.call(srv));
});


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = this.server.address();
  console.log("Server listening at " + this.address + ":" + this.port + ". Protocol: " + this.protocol);
  /// var bind = typeof addr === 'string'
  ///  ? 'pipe ' + addr
  ///  : 'port ' + addr.port;
  /// debug('Listening on ' + bind);
}

