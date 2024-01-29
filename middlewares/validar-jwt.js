// para contar con el tipado en VSC
const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
  // x-token headers
  const token = req.header("x-token");

  // debemos leer el token de la manera con la que lo generamos
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
    console.log(payload)

    req.uid = payload.uid;
    req.name = payload.name;
    
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }

  next();
};

module.exports = {
  validarJWT,
};
