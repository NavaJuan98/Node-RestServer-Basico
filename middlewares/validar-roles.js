const { request, response } = require("express");

const validarRoles = (req = request, res = response, next) => {
    if( !req.usuarioAutenticado ) {
        return res.status(500).json({
            msg: 'Se requiere previamente un token de usuario para realizar esta accion.'
        });
    }

    const { nombre, rol } = req.usuarioAutenticado;

    if( rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${ nombre }, requieres privilegios de administrador para realizar esta accion.`,
        });
    }

    next();
}

const tieneRole = ( ...roles ) => {

    return (req = request, res = response, next) => {
        if( !req.usuarioAutenticado ) {
            return res.status(500).json({
                msg: 'Se requiere previamente un token de usuario para realizar esta accion.'
            });
        }
    
        const { nombre, rol } = req.usuarioAutenticado;
    
        if( !roles.includes( rol )) {
            return res.status(401).json({
                msg: `${ nombre }, requieres privilegios de ${ roles } para realizar esta accion.`,
            });
        }
    
        next();

    }
}

module.exports = {
    validarRoles,
    tieneRole
};