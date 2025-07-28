//sección de Middleares

//autorización

const middlewareAuth = (req, res, next) => {
    console.log("ingreso a middlewareAuth")

    const { headers } = req;

    if (headers['api-secret-key'] == 123456) {
        next();
    } else {
        //control de errores
        let error = new Error("No tienes autorización para ver el contenido");
        error.status = 403;
        next(error);
    }
}

const middlewareNombre = (req, res, next) => {
    console.log("ingreso a middlewareNombre")

    const { nombre } = req.params;

    const nombreValido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'-]+$/.test(nombre.trim());

    if (nombreValido) {
        next();
    } else {
        //control de errores
        let error = new Error("El Nombre no es válido");
        error.status = 400;
        next(error);
    }
}

const middlewareEdad = (req, res, next) => {
    console.log("ingreso a middlewareEdad")

    const { edad } = req.params;

    if (Number(edad) && edad > 0) {
        if (Number(edad) && edad > 0 && edad < 120) {
            next();
        } else {
            //control de errores
            let error = new Error("La edad no corresponde a un valor valido");
            error.status = 400;
            next(error);
        }
    }
}

const middlewareAprobado = (req, res, next) => {
    console.log("ingreso a middlewareAprobado")

    const { aprobado } = req.params;

    if (aprobado == "true" || aprobado == "false") {
        next();
    } else {
        //control de errores
        let error = new Error("El parámetro aprobado no es válido");
        error.status = 400;
        next(error);
    }
}

const middlewareObjectIdMongo = (req, res, next) => {
    console.log(`middlewareObjectId`)

    const { _id } = req.params

    // Expresión regular para validar un ObjectId de 24 caracteres hexadecimales
    const objectIdRegex = /^[a-f\d]{24}$/i

    if (objectIdRegex.test(_id) && _id.length !== 0) {
        next()
    } else {
        const error = new Error("El parámetro _id no es un ObjectId válido.")
        error.status = 400
        next(error)
    }
}


const middleware404 = (req, res, next) => {
    const error = new Error()
    error.message = `El endpoint al que llamas no existe`
    error.status = 404
    next(error)
}

const middleware500 = (error, req, res, next) => {
    let status = error.status || 500
    res.status(status).json(`${error.message}`)
}

//sección de exportación
module.exports = {
    middlewareAuth,
    middlewareNombre,
    middlewareEdad,
    middlewareAprobado,
    middleware404,
    middleware500
}