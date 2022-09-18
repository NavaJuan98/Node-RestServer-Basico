const JWT = require('jsonwebtoken');

const generarTokenJWT = ( uid ) => {

    return new Promise( (resolve, reject) => {

        //PAYLOAD
        const payload = { uid };


        JWT.sign( payload, process.env.SECRETPRIVATEKEY, {
            expiresIn: "5h",
        }, ( err, token ) => {
            if( err ) {
                console.log(err);
                reject( 'Error al generar el JWT.' );
            } else
                resolve(token);
        });
    }); 
}

module.exports = generarTokenJWT;