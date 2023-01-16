window.addEventListener('load', () => {

    let container = document.getElementsByClassName('itemBox')

    fetch("https://dh-grupo3.onrender.com/especialidades/api")
        .then((response) => {
            console.log("respuesta: " + response)
            return response.json();
        })
        .then((datos) => {
            console.log("datos: " + datos)
            for (let x of datos) {
                let h2 = document.createElement('h2');

                h2.innerHTML += x.nombre
                container.appendChild(h2)
            }
        })
        .catch((err) => {
            console.log(err)
        })
})