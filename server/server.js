const express = require('express'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    sio = require('socket.io');


class POC {
    constructor() {
        this.app = express();

        this._setMiddleware();
        this.socket = null;
        let io = sio(this.app.listen(3001));

        io.on('connection', (socket) => {
            this.socket = socket;
        });

        console.log('Server is listening on http://localhost:3001');
    }

    _setMiddleware() {
        /**
         * Setting middleware
         */
        this.app.use(methodOverride())                                  // Express Middleware
            .use(bodyParser.json())                                       // Express BodyParser
            .use(bodyParser.urlencoded({extended: true}))
            .use(cors());

        this.app.get('/', (req, res, next) => {
            console.log('* route');
            this.socket.emit('default', {message: `Hello ${Date.now()}`});
            res.end("Request Hit");
        });
        
        // this.app.get('/index', (req, res, next) => {
        //     console.log('* route');
        //     this.socket.emit('default', {message: `Hello ${Date.now()}`});
        //     res.end();
        // });
    }

    /******/
}

new POC();

// Server as Single Module Application
module.exports = POC;

