const express = require('express')
const cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //Midlewares
        this.middlewares();
        //rutas de mik aplicación
        this.Routes();

    }

middlewares(){
    //CORS aplicacion añadida
    this.app.use(cors());

    //lectura y parseo del body en json
    this.app.use( express.json() );

    //Directorio publico
    this.app.use( express.static('public') );

    
}

Routes(){
    //
    this.app.use( this.usuariosPath, require('../routes/usuarios'));

}

listen(){
    this.app.listen(this.port,  () => {
        console.log('Servidor corriendo en el puerto', this.port);
    })
}
}

module.exports = Server;