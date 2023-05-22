// Obtener la referencia a los elementos
const calendar = document.getElementById("calendar");
const prevMonthLink = document.getElementById("prevMonth");
const nextMonthLink = document.getElementById("nextMonth");
const currentMonthLabel = document.getElementById("currentMonth");

// Variables globales
let fechaActual = new Date();
let mesActual = fechaActual.getMonth();
let yearActual = fechaActual.getFullYear();

// Función para generar el calendario
function generarCalendario() {
    // Limpiar el contenido del calendario
    calendar.innerHTML = "";

    // Calcular la fecha del primer día del mes actual
    const primerDia = new Date(yearActual, mesActual, 1);

    // Calcular la fecha del último día del mes actual
    const ultimoDia = new Date(yearActual, mesActual + 1, 0).getDate();

    // Crear el contenedor del mes
    const monthContainer = document.createElement("div");
    monthContainer.classList.add("month");

    // Crear el nombre del mes
    const monthName = document.createElement("h2");
    monthName.textContent = primerDia.toLocaleString("default", { month: "long", year: "numeric" });
    monthContainer.appendChild(monthName);

    // Crear los días del mes
    const daysContainer = document.createElement("div");
    daysContainer.classList.add("days");

    for (let dia = 1; dia <= ultimoDia; dia++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = dia;
        daysContainer.appendChild(dayElement);
    }

    // Agregar los días al contenedor del mes
    monthContainer.appendChild(daysContainer);

    // Limpiar el contenido del calendario y agregar el contenedor del mes
    calendar.innerHTML = "";
    calendar.appendChild(monthContainer);

    // Actualizar etiqueta de mes actual
    const mesMostrado = primerDia.toLocaleString("default", { month: "long", year: "numeric" });
    currentMonthLabel.textContent = mesMostrado;
}

// Función para ir al mes anterior
function irAlMesAnterior() {
    mesActual--;
    if (mesActual < 0) {
        mesActual = 11;
        yearActual--;
    }
    generarCalendario();
}

// Función para ir al mes siguiente
function irAlMesSiguiente() {
    mesActual++;
    if (mesActual > 11) {
        mesActual = 0;
        yearActual++;
    }
    generarCalendario();
}

// Asignar eventos a los enlaces
prevMonthLink.addEventListener("click", irAlMesAnterior);
nextMonthLink.addEventListener("click", irAlMesSiguiente);

// Generar el calendario inicial
generarCalendario();
