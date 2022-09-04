const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // MIDDLEWARES
        this.middleware();

        //ROUTES
        this.routes();
    }

    routes() {
        this.app.use( this.usersPath, require('../routes/user.routes'))
    }

    middleware() {
        this.app.use( express.static('public') );        
        this.app.use( cors() );
        this.app.use( express.json() );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`);
        });
    }
}

module.exports = Server;