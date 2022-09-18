const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');


const getUser = async(req, res = response) => {
    const { desde, limite } = req.params;
    const query = { estado: true };
    // const usuarios = await Usuario.find()
    //     .skip(desde)
    //     .limit(limite);
    // const total = await Usuario.find().countDocuments();

    const [ usuarios, total]= await Promise.all([
        Usuario.find(query)
        .skip(desde)
        .limit(limite),
        Usuario.find(query).countDocuments()
    ]);

    res.status(201).json({
        total,
        usuarios
    });
}

const createUser = async(req, res = response) => {

    const { nombre, email, password, rol } = req.body;
    const usuario = new Usuario( { nombre, email, password, rol } );

    const salt = bcrypt.genSaltSync();

    usuario.password = bcrypt.hashSync( password, salt );
    await usuario.save();



    res.status(201).json({
        msg: 'Usuario Creado con exito!.',
        usuario 
    });
}

const updateUser = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;
    
    if( password ) {
        const salt = bcrypt.genSaltSync();
    
        resto.password = bcrypt.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    if( usuario ) {
        res.status(202).json({
            msg: 'Usuario actualizado con exito!.',
            usuario
        })
    }
}

const patchUser = (req, res = response) => {
    const { id = 7} = req.params;
    if(id) {
        res.status(201).json({
            id,
            msg: 'Succesfully patched.'
        });
    }else {
        res.status(300).json({
            msg: 'Id Required.'
        });
    }
}

const deleteUser = async(req, res = response) => {
    const { id } = req.params;

    // console.log(req.uid);

    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });
    const usuarioAutenticado = req.usuarioAutenticado;

    if( usuario ) {
        res.status(200).json({
            msg: 'Usuario Eliminado!.',
            usuario,
            usuarioAutenticado
        })
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    patchUser,
    deleteUser
}