const Role = require('../models/Role');
const Usuario = require('../models/Usuario');


const validarRole = async( rol = '' ) => {
    const existeRole = await Role.findOne({ rol });
    if( !existeRole ) {
        throw new Error(`El rol ${ rol } no se encuentra registrado en la BD`);
    }
}

const validarEmail = async( email ) => {
    const existeEmail = await Usuario.findOne( { email } );
    if( existeEmail ) {
        throw new Error(`El email ya se encuentra en uso`);

        // return res.status(404).json( { msg: 'El email ya esta en uso' } );
    }
}

const validarIdExistente = async( id ) => {
    const existeId = await Usuario.findById( id );
    if( !existeId ) {
        throw new Error(`El usuario con el id ${ id } no se encuentra registrado en la BD`);

        // return res.status(404).json( { msg: 'El email ya esta en uso' } );
    }
}

module.exports = {
    validarRole,
    validarEmail,
    validarIdExistente
}