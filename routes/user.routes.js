const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUser, 
    createUser, 
    updateUser, 
    deleteUser, 
    patchUser } = require('../controllers/user.controllers');
const { validarRole, validarEmail, validarIdExistente } = require('../helpers/custom-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRoles, tieneRole } = require('../middlewares/validar-roles');
const router = Router();

router.get('/', getUser);
router.post('/', [
    check('nombre', 'El nombre es requerido.').not().isEmpty(),
    check('email').custom( validarEmail ),
    check('password', 'El password debe contener al menos 6 caracteres.').isLength( { min: 6 } ),
    // check('rol', 'El rol no es valido.').isIn([
    //     'ADMIN_ROLE',
    //     'USER_ROLE'
    // ]),
    check('rol').custom( validarRole ),
    validarCampos,
],createUser);
router.put('/:id',[
    check('id', 'El id no es valido.').isMongoId(),
    check('id').custom( validarIdExistente ),
    check('rol').custom( validarRole ),
    validarCampos,
], updateUser);
router.patch('/:id', patchUser);
router.delete('/:id',[
    validarJWT,
    // validarRoles,
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'El id no es valido.').isMongoId(),
    check('id').custom( validarIdExistente ),
    validarCampos,
], deleteUser);

module.exports = router;