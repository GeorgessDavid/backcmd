const path = require('path')
const db = require('../../database/models')



const controlador = {
    index: async (req, res) => {
        const practicasMedicas = await db.Tratamiento.findAll()

        let practicas = []

        let color = ['f43838', '0863f6', '9800b3', '80800a', '0a8014', '80240a', '090051', '926100']


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


        console.log(data)

        return res.render("index", { data: data })

    },
}

module.exports = controlador
