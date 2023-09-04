let inputs = {
    alias: document.getElementById('alias'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword'),
    showPassword: document.getElementById('showPassword'),
    nombre: document.getElementById('nombre'),
    apellido: document.getElementById('apellido'),
    dni: document.getElementById('dni'),
    domicilio: document.getElementById('domicilio'),
    provincia: document.getElementById('provincia'),
    telefono: document.getElementById('telefono'),
    email: document.getElementById('email'),
    confirmarEmail: document.getElementById('confirmarEmail'),
    sexo: document.getElementById('sexo'),
    obraSocial: document.getElementById('obraSocial'),
    nacimiento: document.getElementById('nacimiento')
}

// SHOW PASSWORD

inputs.showPassword.addEventListener('click', function (e) {
    const passwordCurrentType = inputs.password.getAttribute('type');
    const secondPassCurrentType = inputs.confirmPassword.getAttribute('type');

    if (passwordCurrentType === 'text' && secondPassCurrentType === 'text') {
        inputs.password.setAttribute('type', 'password');
        inputs.confirmPassword.setAttribute('type', 'password');
    } else {
        inputs.password.setAttribute('type', 'text');
        inputs.confirmPassword.setAttribute('type', 'text');
    }

})

// USER VALIDATION
inputs.alias.addEventListener('input', function () {
    let aliasValue = inputs.alias.value;

    let patron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;

    if (patron.test(aliasValue)) {
        inputs.alias.value = aliasValue;
    } else {
        let nuevoValor = aliasValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]+/g, '');
        inputs.alias.value = nuevoValor;
    }

    if (aliasValue.length == 0) {
        inputs.alias.classList.add('error')
        inputs.alias.classList.remove('correct')
    } else {
        inputs.alias.classList.add('correct')
        inputs.alias.classList.remove('error')
    }
})


//PASSWORD VALIDATION


inputs.password.addEventListener('input', () => {
    let passwordValue = inputs.password.value;

    let div = document.getElementById('h6extra')

    if (passwordValue.length < 6) {
        inputs.password.classList.add('error');
        div.innerHTML = `<h6 style="color:red; text-transform: none; font-size: 15px">La contraseña debe tener como mínimo 6 caracteres.</h6>`
    } else {
        inputs.password.classList.remove('error')
        div.innerHTML = ''
    }
})

inputs.confirmPassword.addEventListener('input', function () {

    let passwordValue = inputs.password.value;
    let confirmPasswordValue = inputs.confirmPassword.value;
    let div = document.getElementById('h6extra')

    if (passwordValue != confirmPasswordValue) {
        inputs.confirmPassword.classList.add('error');
        inputs.confirmPassword.classList.remove('correct')
        inputs.password.classList.remove('correct')

        div.innerHTML = `<h6 style="color: red; text-transform: none; font-size: 15px">Las contraseñas no coinciden.</h6>`
    } else {
        inputs.confirmPassword.classList.add('correct')
        inputs.password.classList.add('correct')
        inputs.confirmPassword.classList.remove('error');

        div.innerHTML = `<h6 style="color:rgba(0, 184, 0, 0.797); text-transform: none; font-size: 15px">Las contraseñas coinciden.</h6>`

    }
})

// NAME VALIDATION 

inputs.nombre.addEventListener('input', function () {
    let nameValue = inputs.nombre.value

    let patron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (patron.test(nameValue)) {
        inputs.nombre.value = nameValue
    } else {
        let nuevoValor = nameValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+/g, '');
        inputs.nombre.value = nuevoValor;
    }
    
    if(nameValue.length == 0){
        inputs.nombre.classList.add('error');
        inputs.nombre.classList.remove('correct');
    }else{
        inputs.nombre.classList.add('correct');
        inputs.nombre.classList.remove('error');
    }
})

// APELLIDO VALIDATION

inputs.apellido.addEventListener('input', function(){
    let apellidoValue = inputs.apellido.value

    let patron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if(patron.test(apellidoValue)){
        inputs.apellido.value = apellidoValue;
    }else{
        let nuevoValor = apellidoValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+/g, '')
        inputs.apellido.value = nuevoValor
    }

    if(apellidoValue.length == 0){
        inputs.apellido.classList.add('error');
        inputs.apellido.classList.remove('correct');
    }else{
        inputs.apellido.classList.add('correct');
        inputs.apellido.classList.remove('error ');
    }

})

// DNI  VALIDATION

inputs.dni.addEventListener('input', function(){
    if(inputs.dni.value.length < 5 || inputs.dni.value.length > 8){
        inputs.dni.classList.add('error');
        

        let div = document.getElementById('divError')

        div.innerHTML   = `<h6>Por favor, introduzca un número de documento válido</h6>`
        
    }

})