window.addEventListener('load', function() {
    let formulario = document.getElementById("loginForm");
 
    let loginInput = {
        username: document.getElementById('loginUser'),
        password: document.getElementById('loginPass')
    
    }

    formulario.addEventListener('submit', function(e) {
        let errores = [];   
        
        
        if (loginInput.username.value == "") {
           errores.push('Debe introducir un nombre de usuario.')
          
        }


        if (loginInput.password.value == "") { 
            errores.push('Debe introducir una contraseña.')
            console.log("entramos");
        } 

        if (errores.length != 0) {
            e.preventDefault();

            let divAlert = document.getElementById("divAlert")
           divAlert.classList.remove('displayNone')
            

            let ulErrores = document.getElementById("errores")

            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += `<li>${errores[i]}</li>`
            }
        }else{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Bienvenido',
                showConfirmButton: false,
                timer: 1500
              })
        }

    })

})

 