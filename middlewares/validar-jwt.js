const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            msg: 'No existe el token en la peticion.'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETPRIVATEKEY );
    
        // VERIFICAR USUARIO DEL UID
        
        const usuario = await Usuario.findById( uid );
        if( !usuario ) {
            return res.status(401).json({
                msg: 'Usuario no existente.'
            });
        }
        req.usuarioAutenticado = usuario;

        // VERIFICAR SI EL USUARIO DEL UID TIENE ESTADO FALSE
        if( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no valido, Usuario inactivo.'
            });
        }
    
        next();
    }catch( err ) {
        console.log(err);
        res.status(401).json({
            msg: 'Token no valido.'
        });
    }

}

module.exports = { validarJWT };