const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { request } = require('express');
const query = require('express/lib/middleware/query');



const usuariosGet = async(req = request, res = response) => {

// puedo destructuras de argumentos el api y traer lo que necesite ejemplo de como se hace
    //const {q, nombre= "no name" , apikey, page = 1, limited} = req.query;
    const { limite = 5, desde = 0} = req.query;
    const query = { estado: true};
    /*const usuarios = await Usuario.find( query )
        .skip( Number( desde ))
        .limit( Number( limite ));

    const total = await Usuario.countDocuments( query);*/

    const [total, usuarios] =  await Promise.all([

        Usuario.countDocuments(query),
        Usuario.find( query)
        .skip(Number( desde ))
        .limit(Number(limite))
    ]);

    res.json({
        /*msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limited*/
        total,
        usuarios
        //resp
    });
      
        
    
}

const usuariosPost =  async(req, res = response) => {
//puedo traerme todos los elementos de un api
    //const body = req.body;
    //const usuario = new Usuario( body );


    // trae los elementros especifico de una api
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en la base datos
    await usuario.save();

    res.json({
       // msg: 'post API - controlador',
        usuario
    });
}

const usuariosPut = async(req, res = response) => {

    const {id} = req.params;
    const { _id, password, google, correo, ...resto} = req.body;
        if ( password ) {

  //Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(password, salt);
        }
      
        const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        /*msg: 'Put API - controlador',
        id,*/
        usuario
    });
};

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - controlador'
    });
};

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false});
    res.json({
        usuario
       /* msg: 'get Api - controlador',
        id*/
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,

}