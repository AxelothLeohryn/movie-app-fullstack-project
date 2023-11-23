// const { json } = require("express");
//Sección de inicio
if (document.title == "Inicio") {
  let signUp = document.querySelectorAll(".signUpButton");
  signUp.forEach((element) => {
    element.addEventListener("click", function () {
      document.getElementById("container").classList.add("hide");
      document.getElementById("signUpContainer").classList.remove("hide");
      document.getElementById("logInContainer").classList.add("hide");
      document.getElementById("signUpButton").classList.add("hide");
      document.getElementById("logInButton").classList.remove("hide");
    });
  });
  let logIn = document.querySelectorAll(".logInButton");
  logIn.forEach((element) => {
    element.addEventListener("click", function () {
      document.getElementById("container").classList.add("hide");
      document.getElementById("logInContainer").classList.remove("hide");
      document.getElementById("signUpContainer").classList.add("hide");
      document.getElementById("signUpButton").classList.remove("hide");
      document.getElementById("logInButton").classList.add("hide");
    });
  });
  document
    .getElementById("signUp")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      let name = event.target.nameSU.value;
      let email = event.target.emailSU.value;
      let password = event.target.passwordSU.value;
      let alert = "";
      if (!/^[A-Za-z\ ]{2,30}$/.test(name)) {
        alert +=
          "El nombre tiene que tener entre 2 y 30 caracteres y contener solo letras <br>";
      }
      if (!/^[\w\.-]+@[\w\.-]+\.\w{2,}$/.test(email)) {
        alert += "Introduce un email valido <br>";
      }
      if (!/^[A-Za-z0-9\-_#@]{6,30}$/.test(password)) {
        alert +=
          "La contraseña tiene que ser alfanumerica entre 6 y 30 caracteres y puede contener (-,_,@,#) <br>";
      }
      if (alert.length > 0) {
        Swal.fire({
          icon: "error",
          html: alert,
        });
      } else {
        const datos = {
          name: name,
          email: email,
          password: password,
        };
        const opciones = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        };
        let emailAvailable = await fetch("/api/signup", opciones).then(
          (response) => response.json()
        );
        if (emailAvailable == "success") {
          window.location.href = "/dashboard";
        } else if (emailAvailable == false) {
          Swal.fire({
            icon: "error",
            html: "Ese email ya está en uso, por favor proceda a log in.",
          });
        } else if (emailAvailable == "error") {
          Swal.fire({
            icon: "error",
            html: "Ha habido un error en la creación del usuario",
          });
        }
      }
    });
  document
    .getElementById("logIn")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      let email = event.target.emailLI.value;
      let password = event.target.passwordLI.value;
      let alert = "";
      if (!/^[\w\.-]+@[\w\.-]+\.\w{2,}$/.test(email)) {
        alert += "Introduce un email valido <br>";
      }
      if (!/^[A-Za-z0-9\-_#@]{6,30}$/.test(password)) {
        alert +=
          "La contraseña tiene que ser alfanumerica entre 6 y 30 caracteres y puede contener (-,_,@,#) <br>";
      }
      if (alert.length > 0) {
        Swal.fire({
          icon: "error",
          html: alert,
        });
      } else {
        const datos = {
          email: email,
          password: password,
        };
        const opciones = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        };
        let emailSigned = await fetch("/api/login", opciones).then((response) =>
          response.json()
        );
        if (emailSigned == "success") {
          window.location.href = "/dashboard";
        } else if (emailSigned == false) {
          Swal.fire({
            icon: "error",
            html: "Este email no esta registrado, por favor proceda a Sign up.",
          });
        } else if (emailSigned == "error") {
          Swal.fire({
            icon: "error",
            html: "Credenciales incorrectas",
          });
        }
      }
    });
  let google = document.querySelectorAll(".google");
  google.forEach((element) => {
    element.addEventListener("click", async function () {
      window.location.href = "/api/auth/google";
    });
  });
}

if (document.title == "recoverPassword") {
  let recoverPassword = document.getElementById("recoverPassword");
  recoverPassword.addEventListener("submit", async function (event) {
    event.preventDefault();
    let password1 = event.target.password1.value;
    let password2 = event.target.password2.value;
    let alert = "";
    if (!/^[A-Za-z0-9\-_#@]{6,30}$/.test(password1)) {
      alert +=
        "La contraseña tiene que ser alfanumerica entre 6 y 30 caracteres y puede contener (-,_,@,#) <br>";
    }
    if (password1 != password2) {
      alert += "La contraseña tiene que ser la igual en ambos campos <br>";
    }
    if (alert.length > 0) {
      Swal.fire({
        icon: "error",
        html: alert,
      });
    } else {
      const currentUrl = window.location.href;
      const index =
        currentUrl.indexOf("/resetpassword/") + "/resetpassword/".length;
      const token = currentUrl.substring(index);
      const datos = {
        password: password1,
      };
      const opciones = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      };
      let passwordChanged = await fetch(
        `/api/resetpassword/${token}`,
        opciones
      ).then((response) => response.json());
      if (passwordChanged == "success") {
        Swal.fire({
          icon: "success",
          title: "Contraseña cambiada con exito",
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Volver a iniciar sesión",
        }).then((result) => {
          window.location.href = "/";
        });
      } else if (passwordChanged == false) {
        Swal.fire({
          icon: "error",
          html: "Error al guardar la contraseña",
        });
      } else if (passwordChanged == "error") {
        Swal.fire({
          icon: "error",
          html: "Error al encontrar el usuario, por favor intentelo más tarde",
        });
      }
    }
  });
}

if (document.title == "tokenExpirado") {
  Swal.fire({
    icon: "error",
    title: "La sesión ha expirado",
    showDenyButton: false,
    showCancelButton: false,
    confirmButtonText: "Volver a iniciar sesión",
  }).then((result) => {
    window.location.href = "/";
  });
}
if (document.title == "inicioExito") {
  Swal.fire({
    icon: "success",
    title: "Inicio de sesión con exito",
    showDenyButton: false,
    showCancelButton: false,
    confirmButtonText: "Entrar",
  }).then((result) => {
    window.location.href = "/dashboard";
  });
}

/* --------------------------------PRINT MOVIES FUNCTION -------------------------*/
let objectFavoritos = {};
function KeepFavoriteButton() {
  const heartButtons = document.querySelectorAll(".keep");
  heartButtons.forEach((heartButton) => {
    heartButton.addEventListener("click", async function (event) {
      event.preventDefault();
      let cadena = event.target.getAttribute("id");
      let movieId = cadena.slice(6);
      console.log(objectFavoritos);
      if (objectFavoritos[`${movieId}`] == false) {
        let response = await fetch("/api/favorites", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: movieId,
            }),
        }).then(res => res.json());
        if (response == "Success!") {
          Swal.fire({
            icon: "success",
            text: "Se ha añadido la película a favoritos",
          });
          objectFavoritos[`${movieId}`] = true;
          heartButton.classList.remove("fa-heart-circle-plus");
          heartButton.classList.add("fa-heart-circle-minus");
        } else {
          Swal.fire({
            icon: "error",
            text: "No se ha podido añadir la película a favoritos",
          });
        }
      } else {
        let response = await fetch(
          `/api/deleteFavorites/${movieId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then(res => res.json());
        if (response == "Success!") {
          Swal.fire({
            icon: "success",
            text: "Se ha eliminado la película de favoritos",
          });
          objectFavoritos[`${movieId}`] = false;
          heartButton.classList.remove("fa-heart-circle-minus");
          heartButton.classList.add("fa-heart-circle-plus");
        } else {
          Swal.fire({
            icon: "error",
            text: "No se ha podido eliminar la película de favoritos",
          });
        }
      } 
    });
  });
}
function printMovieCardsUser(moviesData, section) {
  // A esta función hay que pasarle el array de objetos de películas, y el id de la sección (ej: "search-results") donde quieres que se pinten las tarjetas
  console.log("moviesData received: " + moviesData);
  const resultsSection = document.getElementById(`${section}`);
  resultsSection.innerHTML = "";
  let cardNumber = 0;
  if (moviesData.length == 0) {
    resultsSection.innerHTML = "No se han encontrado películas.";
  } else {
    async function getFavourites() {
      objectFavoritos = {}
      let favoritos = await fetch("/api/getFavorites").then(res => res.json());
      console.log(favoritos);
      for (let i = 0; i < moviesData.length; i++) {
        let encontrado = false;
        for (let j = 0; j < favoritos.length; j++) {
          if (moviesData[i].id == favoritos[j].movie_id) {
            encontrado = true;
            break;
          }
        }
        objectFavoritos[`${moviesData[i].id}`] = encontrado;
      }
      console.log(objectFavoritos);
      const movieCard = (movie) => {
        //Store all found genres in a string
        let heart;
        if (objectFavoritos[`${movie.id}`] == true) {
          heart = `<i id="heart-${movie.id}" class="keep fa-solid fa-heart-circle-minus fa-2xl" style="color: #fc2222;"></i>`;
        } else {
          heart = `<i id="heart-${movie.id}" class="keep fa-solid fa-heart-circle-plus fa-2xl" style="color: #fc2222;"></i>`
        }
        let genres = movie.genres.map((genre) => genre).join(", ");
        //-----------------HTML structure of each movie card------------------------------
        //
        return `<section class="movie-card" data-movie-id="${movie.id}">
                  <section class="movie-card-image">
                    <img src="${movie.image}" alt="Poster Image">
                      ${heart}
                  </section>
                  <section class="movie-card-details" data-movie-id="${movie.id}">
                                  <section class=" movie-card-details-header">
                    <div class="movie-card-year">
                      <h5>Fecha</h5>
                      ${movie.year}
                    </div>
                    <div class="movie-card-length">
                      <h5>Duración</h5>
                      ${movie.length} min
                    </div>
                    <div class="movie-card-genres">
                      <h5>Género</h5>
                      ${genres}
                    </div>
                  </section>
                  <section class="movie-card-details-content">
                    <h3>${movie.title}</h3>
                    <h4>Director</h4>
                    <h4>${movie.director}</h4>
                  </section>
                </section>
      </section>`;
      };
      // console.log(moviesData);
      let movieCardContainerHTML = `<section class="movie-card-container">`;
      moviesData.forEach(movie => {
        movieCardContainerHTML += movieCard(movie);
      });
      movieCardContainerHTML += `</section>`;
      resultsSection.innerHTML = "";
      resultsSection.innerHTML += movieCardContainerHTML;
      KeepFavoriteButton();
    }
    getFavourites();
  }
}
function editButtonMovie() {
  const editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((editButton) => {
    editButton.addEventListener("click", function (event) {
      event.preventDefault();
      console.log("Me has clickeado!", event.target);
      const movieId = event.target.getAttribute("data-movie-id");
      console.log(movieId);
      window.location.href = `/editMovie/${movieId}`;
    });
  });
}

/**
 * Esta función generará y hará visibles las tarjetas informativas sobre cada película creada por el administrador
 * @method printMovieCardsAdmin
 * @param {Object[]} moviesData El objeto debe contener la información necesaria sobre la película.
 * @param {string} section Id de la secciónn en la que se van a mostar las tarjetas
 * @returns {string} Devolverá un template string que contiene la estructura y datos correspondientes de las tarjetas, dentro de variables
*/

function printMovieCardsAdmin(moviesData, section) {
  console.log("Movie data to print: " + moviesData);
  const resultsSection = document.getElementById(`${section}`);
  resultsSection.innerHTML = "";
  if (moviesData.length == 0) {
    resultsSection.innerHTML = "No hay películas creadas en la base de datos.";
  } else {
    let cardNumber = 0;

    const movieCard = (movie) => {
      //Store all found genres in a string
      let genres = movie.genres.map((genre) => genre).join(", ");
      //  // boton editar de momento dejarlo comentado
      //-----------------HTML structure of each movie card------------------------------
      return `<section class="movie-card">
              <section class="movie-card-image">
                <img src="${movie.image}" alt="Poster Image">
                <i data-movie-id="${movie.id}" class="edit fa-solid fa-gear fa-2xl"></i>
                <i data-movie-id="${movie.id}" class="delete fa-solid fa-trash-can fa-2xl"></i>
              </section>
                <section class="movie-card-details" data-movie-id="${movie.id}">
                  <section class="movie-card-details-header">
                    <div class="movie-card-year">
                      <h5>Fecha</h5>
                      ${movie.year}
                    </div>
                    <div class="movie-card-length">
                      <h5>Duración</h5>
                      ${movie.length} min
                    </div>
                    <div class="movie-card-genres">
                      <h5>Género</h5>
                      ${genres}
                    </div>
                  </section>
                  <section class="movie-card-details-content">
                    <h3>${movie.title}</h3>
                    <h4>Director</h4>
                    <h4>${movie.director}</h4>
                  </section>
                </section>
              </section>`;
    };
    // console.log(moviesData);
    let movieCardContainerHTML = `<section class="movie-card-container">`;
    moviesData.forEach((movie) => {
      movieCardContainerHTML += movieCard(movie);
    });
    movieCardContainerHTML += `</section>`;
    resultsSection.innerHTML = "";
    resultsSection.innerHTML += movieCardContainerHTML;
  }
}



/**
 * Esta función permite que al clicar sobre alguna tarjeta informativa sobre las películas, se despliegue su información con todos los detalles.
 * @method listenForClicks
 * @param {string} section id de la sección en la que se hará efectivo el click. Es necesario especificarlo para así no interferir en los demás botones pintados en la tarjeta.
 
*/
function listenForClicks(section) {
  document.getElementById(section).addEventListener("click", async (event) => {
    event.preventDefault();
    // console.log("He clickeado!");
    const movieCard = event.target.closest(".movie-card-details");
    if (movieCard) {
      const movieId = movieCard.getAttribute("data-movie-id");
      if (movieId) {
        // Redirect a la vista detalles de la película clickeada
        console.log("La id de la película clickeada es: " + movieId);
        window.location.href = `/search/${movieId}`;
      }
    }
  });
}

//Side nav-----------------------------------------------------
if (
  document.title != "Inicio" &&
  document.title != "inicioExito" &&
  document.title != "recoverPassword" &&
  document.title != "tokenExpirado"
) {
  function openNav() {
    document.getElementById("sidenav").style.width = "calc(100vw - 56px)";
  }
  function closeNav() {
    document.getElementById("sidenav").style.width = "0px";
  }
  document.getElementById("topnav-menu").addEventListener("click", (event) => {
    event.preventDefault();
    openNav();
  });
  document.getElementById("topnav-back").addEventListener("click", (event) => {
    event.preventDefault();
    history.back();
  });
  document
    .getElementById("sidenav-header-close")
    .addEventListener("click", (event) => {
      event.preventDefault();
      closeNav();
    });
  document
    .getElementById("sidenav-footer-logout")
    .addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "/api/logout";
    });
}
//Sección de búsqueda-----------------------------------------------------------------------------------
/**
 * Esta función hará una petición a una api externa y devuelve los datos en un objeto.
 * @method searchFilms 
 * @param {string} title Instroduce el nombre de la película, se ejecuta cuando se busca una película en el buscador
 * @async
 * @returns {json}
 */
async function searchFilms(title) {
  return await fetch(`/api/movies/${title}`).then((res) => res.json());
}

/**
 * Esta función hará una petición a una api externa y devuelve los datos en un objeto.
 * @method searchFilmDetails
 * @param {string} id Se ejecuta cuando se busca una película en el buscador, obteniendo los detalles de la película en un objeto json.
 * @async
 * @returns {json}
 */
async function searchFilmDetails(id) {
  return await fetch(`/api/movies/details/${id}`).then((res) => res.json());
}


if (document.title == "Búsqueda") {
  const searchButton = document.getElementById("search-button");
  const resultsSection = document.getElementById(`search-results`);
  searchButton.addEventListener("click", async (event) => {
    event.preventDefault();
    resultsSection.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin fa-2xl"></i>';
    const query = document.getElementById("search-bar").value;
    //Fetch from our API to search for the film/s.
    const results = await searchFilms(query);
    printMovieCardsUser(results, "search-results"); //Imprimir tarjetas
    listenForClicks("search-results");
  });
}

//*---------Sección de movie-details------------*//

/**
 * Esta función espera a recibir los detalles de una película y genera una tarjeta desplegable donde se muestran. 
 * @method displayMovieDetails 
 * @param {string} id id de la película de la que obtenemos los detalles
 * @param {string} section id de la sección en la que se pintarán esos detalles
 * @async
 * @returns {string} devuelve un template string con el código html que pintará esas tarjetas de detalles
 */
async function displayMovieDetails(id, section) {
  const movieDetails = await searchFilmDetails(id);
  objectFavoritos = {}
  let favoritos = await fetch("/api/getFavorites").then(res => res.json());
  console.log(favoritos);
  let encontrado = false;
  for (let j = 0; j < favoritos.length; j++) {
    if (id == favoritos[j].movie_id) {
      encontrado = true;
      break;
    }
  }
  objectFavoritos[`${id}`] = encontrado;
  let heart;
  if (objectFavoritos[`${id}`] == true) {
    heart = `<i id="heart-${id}" class="keep fa-solid fa-heart-circle-minus fa-2xl" style="color: #fc2222;"></i>`;
  } else {
    heart = `<i id="heart-${id}" class="keep fa-solid fa-heart-circle-plus fa-2xl" style="color: #fc2222;"></i>`
  }

  //Vista de detalles de una película: -------------------------------------
  document.getElementById(section).innerHTML = `
  <section class="movie-details">
    ${heart}
    <section class="movie-header">
      <section class="movie-image">
          <img src="${movieDetails.image}" alt="Movie Poster">
      </section>
      <section class="movie-info">
          <h1 class="movie-title">${
            movieDetails.title
          } <span class="movie-year">(${movieDetails.year})</span></h1>
          <div class="movie-length"><b>Duration:</b> ${
            movieDetails.length
          } min</div>
          <div class="movie-genres"><b>Genres:</b> ${movieDetails.genres.join(
            ", "
          )}</div>
          <div class="movie-director"><b>Director:</b> ${
            movieDetails.director
          }</div>
          <div class="movie-actors"><b>Cast:</b> ${movieDetails.actors.join(
            ", "
          )}</div>
      </section>
  </section>
  <section class="movie-overview">
      <h2>Overview</h2>
      <p>${movieDetails.overview}</p>
  </section>
  <section class="movie-trailer">
      <h2>Trailer</h2>
      <iframe src="${
        movieDetails.trailer
      }" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </section>
  <section class="critics">
      <h2>Criticas</h2>
      <section id="criticsContainer"></section>
  </section>
</section>`;
  console.log("I'm displaying details");
  KeepFavoriteButton()
  let critics = await fetch(`/api/movies/detail/${movieDetails.title}`).then(
    (res) => res.json()
  );
  let criticsContainer = document.getElementById("criticsContainer");
  if (critics == false) {
    criticsContainer.innerHTML = `<p>No hay criticas para esta pelicula</p>`;
  } else if (critics == "error") {
    criticsContainer.innerHTML = `<p>Ha habido un error</p>`;
  } else {
    for (let i = 0; i < critics.length; i++) {
      criticsContainer.innerHTML += `
        <section class="criticsArticle">
          <p class="author">${critics[i].author}</p>
          <p class="company">${critics[i].company}</p>
          <p class="critic">${critics[i].critica}</p>
        </section>`;
    }
  }
  
}

if (document.title === "Detalles de la película") {
  const movieId = window.location.pathname.split("/").pop();
  console.log(movieId);
  displayMovieDetails(movieId, "details-section");
}

//*---------Sección de formularios create/edit movies------------*//
/**
 * Esta función hará una petición a una api externa y devuelve los datos en un objeto.
 * @method getLocalMovies 
 * @async
 * @returns {json} devuelve un objeto con las pelíulas originales, creadas por el administrador
 */
async function getLocalMovies() {
  return await fetch("/api/movies").then((res) => res.json());
}
if (document.title == "Movies: Admin") {
  async function printLocalMovies() {
    let localMovies = await getLocalMovies();
    console.log(localMovies);
    printMovieCardsAdmin(localMovies, "admincards");
    listenForClicks("admincards");
    editButtonMovie();
  }
  printLocalMovies();
}

// FORMULARIO CREAR PELICULA
async function createMovie(movieData) {
  try {
    const response = await fetch("/api/createMovie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    });
    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error(error.message);
  }
}
if (document.title == "Movies: Crear Película") {
  const createMovieForm = document.getElementById("movie_form");

  createMovieForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const movieData = {
      title: formData.get("title"),
      director: formData.get("director"),
      year: formData.get("year"),
      length: formData.get("length"),
      image: formData.get("image"),
      genres: [formData.get("genres")],
      actors: [formData.get("actors")],
      trailer: formData.get("trailer"),
      overview: formData.get("overview"),
    };
    console.log("Este es el objeto que se envia por fetch: " + movieData);
    Swal.fire({
      title: "¿Quieres crear esta película?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Sí",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Película creada!", "", "success");
        createMovie(movieData).then((window.location.href = "/movies"));
      } else if (result.isDenied) {
        Swal.fire("La película no se ha creado", "", "info");
      }
    });
  });
}

async function editMovie(editedMovieData, movieId) {
  try {
    const response = await fetch(`/api/editMovie/${movieId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedMovieData),
    });

    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error(error.message);
  }
}
async function handleMovieForm(movieId) {
  const editMovieForm = document.getElementById("EDIT_form");

  editMovieForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    const editedMovieData = {
      title: formData.get("title"),
      director: formData.get("director"),
      year: formData.get("year"),
      length: formData.get("length"),
      image: formData.get("image"),
      genres: formData.get("genres"),
      actors: formData.get("actors"),
      trailer: formData.get("trailer"),
      overview: formData.get("overview"),
    };
    Swal.fire({
      title: "¿Quieres editar esta película?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Sí",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Editado!", "", "success");
        editMovie(editedMovieData, movieId).then(
          (window.location.href = "/movies")
        );
      } else if (result.isDenied) {
        Swal.fire("La película no se ha editado", "", "info");
      }
    });
  });
}

async function dataEditForm(movieId) {
  console.log("Esta es la id de la pelicula a editar: " + movieId);
  try {
    const response = await fetch(`/api/movies/details/${movieId}`);
    const movieData = await response.json();

    if (movieData && movieData.title) {
      document.querySelector('#EDIT_form input[name="title"]').value =
        movieData.title;
      document.querySelector('#EDIT_form input[name="director"]').value =
        movieData.director;
      document.querySelector('#EDIT_form input[name="year"]').value =
        movieData.year;
      document.querySelector('#EDIT_form input[name="length"]').value =
        movieData.length;
      document.querySelector('#EDIT_form input[name="image"]').value =
        movieData.image;
      document.querySelector('#EDIT_form input[name="genres"]').value =
        movieData.genres;
      document.querySelector('#EDIT_form input[name="actors"]').value =
        movieData.actors;
      document.querySelector('#EDIT_form input[name="trailer"]').value =
        movieData.trailer;
      document.querySelector('#EDIT_form textarea[name="overview"]').value =
        movieData.overview;

      handleMovieForm(movieId);
    } else {
      console.error("Error");
    }
  } catch (error) {
    console.error(error.message);
  }
}

if (document.title === "Movies: Editar Película") {
  function getMovieId() {
    return window.location.href.split("/").pop();
  }
  movieId = getMovieId();
  console.log({
    id: getMovieId(),
  });

  dataEditForm(movieId);
}

// FUNCIONALIDAD BORRAR PELÍCULA
async function deleteMovie(movieId) {
  try {
    const response = await fetch(`/api/deleteMovie/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": "yourAuthTokenHere",
      },
    });
    response.json();
  } catch (error) {
    console.error(error.message);
  }
}
document.addEventListener("click", async function (event) {
  const movieId = event.target.getAttribute("data-movie-id");
  if (event.target.classList.contains("delete")) {
    Swal.fire({
      title: "¿Quieres borrar esta película?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Sí",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Borrado!", "", "success");
        deleteMovie(movieId).then(location.reload());
      } else if (result.isDenied) {
        Swal.fire("La película no se ha borrado", "", "info");
      }
    });
  }
});

// async function getFavoriteMovies() {
//   let registeredemail = document.getElementById("registereduser");
//   // console.log(registeredemail.innerHTML);
//   let favorites = await fetch(
//     `/api/getFavorites/${registeredemail}`
//   ).then((res) => res.json());
//   console.log(favorites);
// }

// async function printFavoriteMovies() {
//   const favoriteMovies = await getFavoriteMovies();
//   printMovieCardsUser(favoriteMovies, "favorites");
// }
// let id_movie= favorites.movie_id //esto hace que se guarde en la variable el id de la peli
// Sección favoritos ---------------------------------------------------------------------------------
async function printFavoriteMovies() {
  const favoritesIds = await fetch("/api/getFavorites").then(res => res.json());
  // console.log("Favorite movies ids: ", favoritesIds);
  let favoritesData = [];
  for (const favoriteId of favoritesIds) {
    const favoriteData = await fetch(`/api/movies/details/${favoriteId.movie_id}`).then(res => res.json());
    console.log("Favorite Data: ", favoriteData);
    favoritesData.push(favoriteData);
  }
  // console.log("Favorites Data: ", favoritesData);
  printMovieCardsUser(favoritesData, "favorites");
}
if (document.title == "Mis películas") {
  // primero cogemos los favoritos, luego los pintamos con las tarjetas
  printFavoriteMovies();
}
