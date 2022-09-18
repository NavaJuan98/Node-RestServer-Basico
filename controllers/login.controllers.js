const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');
const generarTokenJWT = require('../helpers/generar-jwt');




const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        //VALIDAR EMAIL
        const usuario = await Usuario.findOne( { email } );
        if( !usuario ) {
            return res.status(400).json({
                msg: `Email | Password Incorrectos. - email`
            });
        }
        //VALIDAR USUARIO ACTIVO
        if( !usuario.estado ) {
            return res.status(400).json({
                msg: `Email | Password Incorrectos. - estado-false`
            });
        }

        //VALIDAR PASSWORD
        const isPasswordCorrect = bcrypt.compareSync( password, usuario.password );
        if( !isPasswordCorrect ) {
            return res.status(400).json({
                msg: `Email | Password Incorrectos. - password`
            });
        }
    
        //GENERAR JWT
        const token = await generarTokenJWT( usuario.id );
    
        res.status(200).json({
            msg: `Login ok!.`,
            usuario, 
            token
        });

    }catch( err ) {
        console.log(err);
        res.status(500).json({
            msg: `Lo sentimos, ha ocurrido un error... Favor de contactar al administrador!.`
        });

    }
}

module.exports = login;