const express = require("express");

console.log("🔃 Se crea el archivo Routes");

const router = express.Router();

// Importa los controladores y middlewares 
const {
    getAlumnos,
    getAlumnosByNombre,
    getAlumnosByEdad,
    getAlumnosByAprobado,
    postAlumnos,
    putAlumnos,
    patchAlumnos,
    deleteAlumnos
} = require("./controllers/alumnosController");

const { middlewareNombre, middlewareEdad, middlewareAprobado } = require("./Middlewares");

// GET
router.get('/nombre/:nombre', middlewareNombre, getAlumnosByNombre);
router.get('/edad/:edad', middlewareEdad, getAlumnosByEdad);
router.get('/estado/:aprobado', middlewareAprobado, getAlumnosByAprobado);
router.route('/')
  .get(getAlumnos)
  .post(postAlumnos);

// PUT
router.route('/_id/:_id')
  .put(putAlumnos)
  .patch(patchAlumnos)
  .delete(deleteAlumnos);

module.exports = router;