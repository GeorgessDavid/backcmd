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
inputs.alias.addEventListener('input', function(){
    let aliasValue = inputs.alias.value;

    let patron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;

    if (patron.test(aliasValue)) {
        inputs.alias.value = aliasValue;
    }else{
        let nuevoValor = aliasValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]+/g, '');
        inputs.alias.value = nuevoValor;
    }

    if(aliasValue == ''){
        inputs.alias.classList.add('error')
        inputs.alias.classList.remove('correct')
    }else{
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

