const { Router } = require('express');
const { getUser, 
    createUser, 
    updateUser, 
    deleteUser, 
    patchUser } = require('../controllers/user.controllers');
const router = Router();

router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.patch('/:id', patchUser);
router.delete('/:id', deleteUser);

module.exports = router;