const { response } = require('express');

const usuariosGet = (req, res = response) => {

// puedo destructuras de argumentos el api y traer lo que necesite ejemplo de como se hace
    const {q, nombre= "no name" , apikey, page = 1, limited} = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limited
    });
}

const usuariosPost =  (req, res = response) => {
//puedo traerme todos los elementos de un api
    const body = req.body;

    res.json({
        msg: 'post API - controlador',
        body 
    });
}

const usuariosPut = (req, res = response) => {
    res.json({
        msg: 'Put API - controlador'
    });
};

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - controlador'
    });
};

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'get Api - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,

}