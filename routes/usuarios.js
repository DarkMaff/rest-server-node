const { Router }  = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete }  = require('../controllers/usuarios');


const { esRoleValido, 
        existeUsuarioPorId, 
        mailExiste } = require('../helpers/db_validator');




router.get('/', usuariosGet );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut );

router.post('/', [ 
    check('nombre', 'el nombre es requerido').notEmpty(),
    check('password','El password tiene que tener mas de 6 digitos').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo','ya se encuentra registrado').custom( mailExiste),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
      
], usuariosPost );

router.patch('/', usuariosPatch );

router.delete('/:id', usuariosDelete );



module.exports = router;