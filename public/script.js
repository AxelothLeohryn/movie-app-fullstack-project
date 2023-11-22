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
        let emailAvailable = await fetch(
          "https://movie-app-fullstack.onrender.com/api/signup",
          opciones
        ).then((response) => response.json());
        if (emailAvailable == "success") {
          window.location.href =
            "https://movie-app-fullstack.onrender.com/dashboard";
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
        let emailSigned = await fetch(
          "https://movie-app-fullstack.onrender.com/api/login",
          opciones
        ).then((response) => response.json());
        if (emailSigned == "success") {
          window.location.href =
            "https://movie-app-fullstack.onrender.com/dashboard";
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
      window.location.href =
        "https://movie-app-fullstack.onrender.com/api/auth/google";
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
        `https://movie-app-fullstack.onrender.com/api/resetpassword/${token}`,
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
          window.location.href =
            "https://movie-app-fullstack.onrender.com:3000/";
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
    window.location.href = "https://movie-app-fullstack.onrender.com:3000/";
  });
}
/* --------------------------------PRINT MOVIES FUNCTION -------------------------*/
function printMovieCardsUser(moviesData, section) {
  // A esta función hay que pasarle el array de objetos de películas, y el id de la sección (ej: "search-results") donde quieres que se pinten las tarjetas
  const resultsSection = document.getElementById(`${section}`);
  resultsSection.innerHTML = "";
  let cardNumber = 0;
  if (moviesData.length == 0) {
    resultsSection.innerHTML =
      "No se han encontrado películas con ese nombre.";

  } else {
  const movieCard = (movie) => {
      //Store all found genres in a string
      let genres = movie.genres.map((genre) => genre).join(", ");
      //-----------------HTML structure of each movie card------------------------------
      return `<section class="movie-card" data-movie-id="${movie.id}">
                <section class="movie-card-image">
                  <img src="${movie.image}" alt="Poster Image">
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
    }
    // console.log(moviesData);
    let movieCardContainerHTML = `<section class="movie-card-container">`;
    moviesData.forEach((movie) => {
      movieCardContainerHTML += movieCard(movie);
    });
    movieCardContainerHTML += `</section>`;
    resultsSection.innerHTML = "";
    resultsSection.innerHTML += movieCardContainerHTML;
  };
}
function editButtonMovie() {
  const editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((editButton) => {
    editButton.addEventListener("click", function (event) {
      event.preventDefault();
      console.log("Me has clickeado!", event.target);
      const movieId = event.target.getAttribute("data-movie-id");
      console.log(movieId);
      window.location.href = `https://movie-app-fullstack.onrender.com/editMovie/${movieId}`;
    });
  });
}

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

//Event listener de click en tarjeta ----- AÑADIR A CADA SECCIÓN DONDE IMPRIMAMOS TARJETAS, PARA PODER CLICKEAR EN ELLAS
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
        window.location.href = `https://movie-app-fullstack.onrender.com/search/${movieId}`;
      }
    }
  });
}

//Side nav-----------------------------------------------------
if (document.title != "Inicio") {
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
  document
    .getElementById("sidenav-header-close")
    .addEventListener("click", (event) => {
      event.preventDefault();
      closeNav();
    });
    document.getElementById("sidenav-footer-logout").addEventListener("click", event => {
      event.preventDefault();
      window.location.href = "https://movie-app-fullstack.onrender.com";
    })
}

//Sección de búsqueda-----------------------------------------------------------------------------------

async function searchFilms(title) {
  return await fetch(
    `https://movie-app-fullstack.onrender.com/api/movies/${title}`
  ).then((res) => res.json());
}
async function searchFilmDetails(id) {
  return await fetch(
    `https://movie-app-fullstack.onrender.com/api/movies/details/${id}`
  ).then((res) => res.json());
}

//Event listener of search button: GET (/api/movies/title), then print cards
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
    console.log(results);
    printMovieCardsUser(results, "search-results"); //Imprimir tarjetas
    listenForClicks("search-results"); //Escuchar clicks en tarjetas
  });
}

//*---------Sección de movie-details------------*//
async function displayMovieDetails(id, section) {
  const movieDetails = await searchFilmDetails(id);
  console.log(movieDetails);
  //Aqui podria ir la funcionalidad del scrapping:

  //Vista de detalles de una película: --------------------------------------
  document.getElementById(section).innerHTML = `
  <section class="movie-details">
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
</section>`;

  console.log("I'm displaying details");
}
if (document.title === "Detalles de la película") {
  const movieId = window.location.pathname.split("/").pop();
  console.log(movieId);
  displayMovieDetails(movieId, "details-section");
}
if (document.title == "tokenExpirado") {
  Swal.fire({
    icon: "error",
    title: "La sesión ha expirado",
    showDenyButton: false,
    showCancelButton: false,
    confirmButtonText: "Volver a iniciar sesión",
  }).then((result) => {
    window.location.href = "https://movie-app-fullstack.onrender.com/";
  });
}
//*---------Sección de formularios create/edit movies------------*//
async function getLocalMovies() {
  return await fetch(
    "https://movie-app-fullstack.onrender.com/api/movies"
  ).then((res) => res.json());
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
      genres: formData.get("genres"),
      actors: formData.get("actors"),
      trailer: formData.get("trailer"),
      overview: formData.get("overview"),
    };

    try {
      const response = await fetch(
        "https://movie-app-fullstack.onrender.com/api/createMovie",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movieData),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error.message);
    }
  });
}

// FORMULARIO EDITAR PELICULA
if (document.title == "Movies: Editar Película") {
  const editMovieForm = document.getElementById("edit_movie_form");

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

    try {
      const response = await fetch(
        "https://movie-app-fullstack.onrender.com/api/editMovie/:id",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedMovieData),
        }
      );

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error.message);
    }
  });
}
