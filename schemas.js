const mongoose = require("mongoose");

const alumosSchema = new mongoose.Schema(
    {
        nombre: { type: String, require: true },
        edad: { type: Number, min: 18, max: 60 },
        aprobado: { type: Boolean }
    },
    {
        collection: "alumnos",
        versionKey: false,
        collation: {
            locale: "es",
            strength: 1
        }
    }
);


const Alumno = mongoose.model("Alumno", alumosSchema);

module.exports = {
    Alumno
}