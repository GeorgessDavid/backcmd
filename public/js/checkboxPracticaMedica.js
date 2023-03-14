window.addEventListener('load', () => {


  var checkboxArea = document.getElementById("checkboxArea")


  fetch('https://dh-grupo3.onrender.com/tratamientos/api').then(res => {
    return res.json()
  }).then(l => {
    for (let i = 0; i < l.data.length; i++) {
      const e = l.data[i];

      let spanLoad = document.getElementById('loadSpan')

      let spinner = document.getElementById('loadingSpinner')

            spinner.style.visibility = 'hidden';
            spinner.style.opacity = '0';
            spinner.classList.remove('m-5')

            spanLoad.style.visibility ="hidden";
            spanLoad.style.opacity = '0'

      checkboxArea.innerHTML += `
      <div class="col">
        <div class="d-flex justify-content-between" id="checkboxArea">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="${e.id}" id="flexCheckDefault ${i}">
              <label class="form-check-label" for="flexCheckDefault" name="practicaMedica">
                ${e.nombre}
              </label>
            </div>
            <div class="form-check form-check-reverse">
              <input class="form-check-input" type="checkbox" value="${l.data[i + 1].value}" id="reverseCheck1${i+1}" name="practicaMedica">
              <label class="form-check-label" for="reverseCheck1">
                ${l.data[i+1].nombre}
              </label>
            </div>
        </div>
      </div>`
      i = i + 1
    }
  })
})