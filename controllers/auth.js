/* esto no es necesario, pero lo hago para tener el autocompletado de VSC */
const express = require("express");

// para obtener los resultados de la validacion
const { validationResult } = require("express-validator");

const crearUsuario = (req, res = express.response) => {
  // console.log(req);

  const { name, email, password } = req.body;

  res.status(201).json({
    ok: true,
    msg: "registro",
    name,
    email,
    password,
  });

  // recordar que solo se debe devolver un solo res.json()
};

const loginUsuario = (req, res = express.response) => {
  const { email, password } = req.body;

  res.json({
    ok: true,
    msg: "login",
    email,
    password,
  });
};

const revalidarToken = (req, res = express.response) => {
  res.json({
    ok: true,
    msg: "renew",
  });
};

module.exports = { crearUsuario, loginUsuario, revalidarToken };
