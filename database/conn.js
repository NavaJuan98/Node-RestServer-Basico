const mongoose = require('mongoose');

const dbConexion = async() => {

    try {
        await mongoose.connect( process.env.MONGODB_CNN);

        console.log('Conexion Exitosa');
    }catch(error) {
        console.log(error);
        throw new Error('Error a la hora de establecer conexion con la base de datos!.');
    }
}

module.exports = {
    dbConexion,
}