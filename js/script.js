// Author: Daniel Badillo

/**
 * Funcion para formar la URL
 * @Param date
 * @Param page
 */
function getURL(date, page) {
  return `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=DEMO_KEY&page=${page}`;
}

/**
 * Funcion para agregar un elemento a la lista
 * @Param photo
 */
function agregarElemento(photo) {
  // Obtener Elementos
  const lista = document.getElementById("miLista");
  const li = document.createElement("li");
  const indexSpan = document.createElement("span");
  const nameSpan = document.createElement("span");
  const cameraSpan = document.createElement("span");
  const botonVer = document.createElement("button");

  // Asignar valores
  indexSpan.textContent = photo.id;
  nameSpan.textContent = photo.rover.name;
  cameraSpan.textContent = photo.camera.name;

  // Botón de detalles
  botonVer.textContent = "More";
  botonVer.className = "btn";
  botonVer.onclick = () =>
    verPhoto(photo.img_src, photo.id, photo.sol, photo.earth_date);

  li.appendChild(indexSpan);
  li.appendChild(nameSpan);
  li.appendChild(cameraSpan);
  li.appendChild(botonVer);
  lista.appendChild(li);
}

/**
 * Función para cargar los datos desde la API
 * @param  date
 * @param  page
 */
function cargarDatos(date, page) {
  const url = getURL(date, page);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      photoList = data.photos;
      document.getElementById("miLista").innerHTML = ""; // Limpiar lista
      data.photos.forEach((photo) => {
        agregarElemento(photo);
      });
    });
}

/**
 * Funcion para mostrar la foto seleccionada
 * @param url
 * @param id
 * @param sol
 * @param date
 */
function verPhoto(url, id, sol, date) {
  // Obtener elementos
  const idHTML = document.getElementById("idPhoto");
  const solHTML = document.getElementById("solPhoto");
  const dateHTML = document.getElementById("datePhoto");
  const imageContainer = document.getElementById("image-container");
  const image = document.createElement("img");

  // Limpiar contenedor
  imageContainer.innerHTML = "";

  // Asignar valores
  idHTML.innerHTML = id;
  solHTML.innerHTML = sol;
  dateHTML.innerHTML = date;

  // Asignar url a la imagen y agregarla al contenedor
  image.src = url;
  imageContainer.appendChild(image);
}

document.addEventListener("DOMContentLoaded", () => {
  // Obtener elementos
  const buscarBtn = document.getElementById("buscar");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  const fechaInput = document.getElementById("date");
  let page = 1;
  let date = fechaInput.value;
  cargarDatos(date, page);

  buscarBtn.addEventListener("click", () => {
    date = fechaInput.value;
    page = 1;
    cargarDatos(date, page);
  });

  nextBtn.addEventListener("click", () => {
    date = fechaInput.value;
    page++;
    cargarDatos(date, page);
  });
  prevBtn.addEventListener("click", () => {
    date = fechaInput.value;
    if (page > 1) {
      page--;
      cargarDatos(date, page);
    }
  });
});
