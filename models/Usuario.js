const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es requerido.' ],
    },
    email: {
        type: String,
        unique: true,
        required: [ true, 'El email es requerido.' ],
    },
    password: {
        type: String,
        required: [ true, 'El password es requerido.' ],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    }

});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

module.exports =  model( 'Usuario', UsuarioSchema );