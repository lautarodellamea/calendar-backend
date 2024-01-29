/* esto no es necesario, pero lo hago para tener el autocompletado de VSC */
const express = require("express");
// para encriptar contraseñas
const bcrypt = require("bcryptjs");
// modelo
const Usuario = require("../models/Usuario");
// generacion del token
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = express.response) => {
  // console.log(req);

  const { email, password } = req.body;

  try {
    // validacion personalizada
    let usuario = await Usuario.findOne({ email: email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario existe con ese correo",
      });
    }

    usuario = new Usuario(req.body);

    // encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    // generar nuestro JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uuid: usuario.id,
      name: usuario.name,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }

  // recordar que solo se debe devolver un solo res.json()
};

const loginUsuario = async (req, res = express.response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email: email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        // conviene dejar mensajes no tas especificos por seguridad
        // el usuario y/o contraseña incorrectos
        msg: "El usuario no existe con ese email",
      });
    }

    // confirmar los password
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }

    // generar nuestro JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const revalidarToken = async (req, res = express.response) => {
  const { uid, name } = req;

  // generar JWT
  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    token,
  });
};

module.exports = { crearUsuario, loginUsuario, revalidarToken };
