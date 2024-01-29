const express = require("express");
const { validationResult } = require("express-validator");

// el next es una funcion que tenemos que llamar si todo el middleware se ejecuta correctamente
const validarCampos = (req, res = express.response, next) => {
  // manejo de errores
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};

module.exports = { validarCampos };
