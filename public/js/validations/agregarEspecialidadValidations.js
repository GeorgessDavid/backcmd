let form = document.getElementById("addEspecialidadForm")

let input = document.getElementById("addEspecialidadInput")

let divError = document.getElementById("divError")

let mainBody = document.getElementById("mainBody")

let addButton = document.getElementById("addButton")

form.addEventListener("submit", function (e) {
    let errores = [];

    if (input.value == "") {
        errores.push('Debe introducir el nombre de la especialidad.')
    }

    if (errores.length != 0) {
        e.preventDefault()

        input.style = "border: 1px solid red; !important"

        divError.innerHTML += `<h2 class="errors">${errores}</h2>`
    } 
})