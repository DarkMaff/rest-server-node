const { Router }  = require('express');
const router = Router();
const { usuariosGet }  = require('../controllers/usuarios');
const { usuariosPost }  = require('../controllers/usuarios');
const { usuariosPut }  = require('../controllers/usuarios');
const { usuariosPatch }  = require('../controllers/usuarios');
const { usuariosDelete }  = require('../controllers/usuarios');



router.get('/', usuariosGet );

router.post('/', usuariosPost );

router.put('/:id' , usuariosPut );

router.patch('/', usuariosPatch );

router.delete('/', usuariosDelete );



module.exports = router;