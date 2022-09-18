const express = require('express');
const cors = require('cors');
const { dbConexion } = require('../database/conn');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';


        // CONECTAR BASE DE DATOS
        this.conectarDB();
        
        // MIDDLEWARES
        this.middlewares();

        //ROUTES
        this.routes();
    }

    async conectarDB() {
        await dbConexion();
    }

    routes() {
        this.app.use( this.authPath, require('../routes/login.routes'))
        this.app.use( this.usersPath, require('../routes/user.routes'))
    }

    middlewares() {
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