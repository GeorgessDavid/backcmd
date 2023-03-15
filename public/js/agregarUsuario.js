var userType = document.getElementById('userType')
var medicData = document.getElementById('medicData')
userType.addEventListener("click", function(){
    if(userType.value == '3'){
        medicData.classList.remove('displayNone')
    }else{
        medicData.classList.add('displayNone')
    }
})

let zonaHorariaBox = document.getElementById('zonaHorariaBox')

let checkboxLunes = document.getElementById('checkboxLunes')
let checkboxMartes = document.getElementById('checkboxMartes')
let checkboxMiercoles = document.getElementById('checkboxMiercoles')
let checkboxJueves = document.getElementById('checkboxJueves')
let checkboxViernes = document.getElementById('checkboxViernes')
let checkboxSabado = document.getElementById('checkboxSabado')

let zonaHorariaLunes = document.getElementById('lunes')
let zonaHorariaMartes = document.getElementById('martes')
let zonaHorariaMiercoles = document.getElementById('miercoles')
let zonaHorariaJueves = document.getElementById('jueves')
let zonaHorariaViernes = document.getElementById('viernes')
let zonaHorariaSabado = document.getElementById('sabado')

checkboxLunes.addEventListener('click', () => {
    zonaHorariaLunes.classList.toggle('visibility-hidden')
})

checkboxMartes.addEventListener('click', () => {
    zonaHorariaMartes.classList.toggle('visibility-hidden')
})

checkboxMiercoles.addEventListener('click', () => {
    zonaHorariaMiercoles.classList.toggle('visibility-hidden')
})

checkboxJueves.addEventListener('click', () => {
    zonaHorariaJueves.classList.toggle('visibility-hidden')
})

checkboxViernes.addEventListener('click', () => {
    zonaHorariaViernes.classList.toggle('visibility-hidden')
})

checkboxSabado.addEventListener('click', () => {
    zonaHorariaSabado.classList.toggle('visibility-hidden')
})