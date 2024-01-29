const jwt = require("jsonwebtoken")

const generarJWT = (uid, name) => {
  
  return new Promise((resolve, reject) => {
    // generemos el jwt
    
    // creamos el payload
    const payload = {uid, name};

    // creamos el token, lo firmamos con sign()
    jwt.sign(payload, process.env.SECRET_JWT_SEED, {
      expiresIn: "2h"
    }, (err, token) => {
      if (err) {
        console.log(err)
        reject("No se pudo generar el token");
      }

      resolve(token)
    })
  })
}




module.exports = {
  generarJWT
}