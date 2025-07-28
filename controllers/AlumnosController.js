const { Alumno } = require("./../schemas");

//sección get de alumnos
const getAlumnos = async (req, res, next) => {

    const buscar = await Alumno.find();

    res
        .status(200)
        .json({
            message: "Haciendo get en /alumnos",
            data: buscar
        });
};

const getAlumnosByNombre = async (req, res, next) => {
    const { nombre } = req.params;

    const buscar = await Alumno.find({ nombre });

    res
        .status(200)
        .json({
            message: "El nombre del alumno es: " + nombre,
            data: buscar
        });
};

const getAlumnosByEdad = (req, res, next) => {
    const { edad } = req.params;
    res
        .status(200)
        .json({ message: "la edad del alumno es: " + edad, data: [] });
};

const getAlumnosByAprobado = (req, res, next) => {
    const { aprobado } = req.params;
    res
        .status(200)
        .json({ message: "El estado del alumno es: " + aprobado, data: [] });
};

//sección post
const postAlumnos = async (req, res, next) => {
    // const { _id } = req.params;
    const { nombre, edad, aprobado } = req.body;

    const nuevo = new Alumno({
        nombre,
        edad,
        aprobado
    }).save();

    const alumnos = await Alumno.find()

    res
        .status(201)
        .json({
            message: "Se insert{o correctame el alumno",
            details: nuevo,
            data: alumnos
        });
};


//sección put
const putAlumnos = async (req, res, next) => {
    const { _id } = req.params;
    const { nombre, edad, aprobado } = req.body;

    const actualizar = await Alumno.findByIdAndUpdate(_id, { nombre, edad, aprobado })

    const buscar = await Alumno.find();

    res
        .status(201)
        .json({
            message: "Se actualizo el alumno correctamente",
            details: actualizar,
            data: buscar
        });
};


//sección patch
const patchAlumnos = (req, res, next) => {
    const { _id } = req.params;
    const { nombre } = req.body;
    res
        .status(201)
        .json({
            message: "se actualizo el nombre del alumno "
                + _id + " con la data: nombre: " + nombre, data: []
        });
};

//sección delete
const deleteAlumnos = async (req, res, next) => {
    const { _id } = req.params;

    const eliminar = await Alumno.findByIdAndDelete(_id);

    const buscar = await Alumno.find();

    res
        .status(200)
        .json({
            message: "Eliminando al alumno de _id " + _id,
            details: eliminar,
            data: buscar
        });
};


module.exports = {
    getAlumnos,
    getAlumnosByNombre,
    getAlumnosByEdad,
    getAlumnosByAprobado,
    postAlumnos,
    putAlumnos,
    patchAlumnos,
    deleteAlumnos
};