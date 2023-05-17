window.addEventListener('load', () => {
  let logInButton = document.getElementById('logInButton')

  logInButton.addEventListener('click', () => {
    logInButton.innerHTML = `<div class="spinner-border text-dark" role="status" style="color: white !important;" id="spinner">
        <span class="visually-hidden">Loading...</span>
      </div>`
  })
})

let showPassword = document.getElementById('showPassword')

showPassword.addEventListener('click', () => {
  showPassword.classList.toggle('fa-eye')

  const input = document.getElementById('loginPass')

  const currentType = input.getAttribute('type');

  if (currentType === 'text') {
    input.setAttribute('type', 'password');
  } else {
    input.setAttribute('type', 'text');
  }
})