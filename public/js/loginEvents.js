window.addEventListener('load', () => {
  let logInButton = document.getElementById('logInButton')

  logInButton.addEventListener('click', () => {
    logInButton.innerHTML = `<div class="spinner-border text-dark" role="status" style="color: white !important;" id="spinner">
        <span class="visually-hidden">Loading...</span>
      </div>`
  })
})