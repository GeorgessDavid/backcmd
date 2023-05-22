const path = require('path')
const db = require('../../database/models')



const controlador = {
    index: async (req, res) => {
        const practicasMedicas = await db.Tratamiento.findAll()

        let practicas = []

        let color = ['004f94', '012c52', '010e7d', '1d2b52', '1b0178', '010d2e', '000512', '11265e']


        let data = []

        let coloresDisponibles = [...color]; // Copiamos el array de colores disponibles

        for (let i = 0; i < 8; i++) {
            const indiceAleatorio = Math.floor(Math.random() * practicasMedicas.length);
            const valorAleatorio = practicasMedicas[indiceAleatorio].nombre;

            const colorIndexAleatorio = Math.floor(Math.random() * coloresDisponibles.length);
            const colorAleatorio = coloresDisponibles.splice(colorIndexAleatorio, 1)[0];

            data.push({
                practica: valorAleatorio,
                color: '#' + colorAleatorio
            });
        }

        return res.render("index", { data: data })

    },
}

module.exports = controlador
