/* 
  Rutas de Usuarios / Auth
  host + /api/auth
*/

const { Router } = require("express");
// el "check" es el midleware engargado de validar un campoen particular, lo hace uno a la vez
const { check } = require("express-validator");
const router = Router();

const { validarCampos } = require("../middlewares/validar-campos");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");

router.post(
  "/new",
  // middlewares
  // not(): obligatorio
  // isEmpty(): no puede estar vacio
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos
  ],
  crearUsuario
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos
  ],
  loginUsuario
);

router.get("/renew", revalidarToken);

module.exports = router;
