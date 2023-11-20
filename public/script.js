//Sección de inicio
if (document.title == "Inicio") {
  let signUp = document.querySelectorAll(".signUpButton");
  signUp.forEach(element => {
      element.addEventListener("click", function() {
          document.getElementById("container").classList.add("hide");
          document.getElementById("signUpContainer").classList.remove("hide");
          document.getElementById("logInContainer").classList.add("hide");
          document.getElementById("signUpButton").classList.add("hide");
          document.getElementById("logInButton").classList.remove("hide");
      })
  });
  let logIn = document.querySelectorAll(".logInButton");
  logIn.forEach(element => {
      element.addEventListener("click", function() {
          document.getElementById("container").classList.add("hide");
          document.getElementById("logInContainer").classList.remove("hide");
          document.getElementById("signUpContainer").classList.add("hide");
          document.getElementById("signUpButton").classList.remove("hide");
          document.getElementById("logInButton").classList.add("hide");
      })
  });
  document.getElementById("signUp").addEventListener("submit", async function(event) {
      event.preventDefault();
      let name = event.target.nameSU.value;
      let email = event.target.emailSU.value;
      let password = event.target.passwordSU.value;
      let alert = "";
      if (!/^[A-Za-z\ ]{2,30}$/.test(name)) {
          alert += "El nombre tiene que tener entre 2 y 30 caracteres y contener solo letras <br>"
      }
      if (!/^[\w\.-]+@[\w\.-]+\.\w{2,}$/.test(email)) {
          alert += "Introduce un email valido <br>"
      }
      if (!/^[A-Za-z0-9\-_#@]{6,30}$/.test(password)) {
          alert += "La contraseña tiene que ser alfanumerica entre 6 y 30 caracteres y puede contener (-,_,@,#) <br>"
      }
      if (alert.length > 0) {
          Swal.fire({
            icon: 'error',
            html: alert,
          })
      } else {
          const datos = {
              name: name,
              email: email,
              password: password
          };
          const opciones = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(datos) 
          };
          let emailAvailable = await fetch("http://localhost:3000/api/signup", opciones)
              .then(response => response.json())
          if (emailAvailable == "success") {
                  window.location.href = "http://localhost:3000/dashboard";
          } else if (emailAvailable == false) {
              Swal.fire({
                  icon: 'error',
                  html: "Ese email ya está en uso, por favor proceda a log in.",
                })
          } else if (emailAvailable == "error") {
              Swal.fire({
                  icon: 'error',
                  html: "Ha habido un error en la creación del usuario",
                })
          }
      } 
  });
  document.getElementById("logIn").addEventListener("submit", async function(event) {
      event.preventDefault();
      let email = event.target.emailLI.value;
      let password = event.target.passwordLI.value;
      let alert = "";
      if (!/^[\w\.-]+@[\w\.-]+\.\w{2,}$/.test(email)) {
          alert += "Introduce un email valido <br>"
      }
      if (!/^[A-Za-z0-9\-_#@]{6,30}$/.test(password)) {
          alert += "La contraseña tiene que ser alfanumerica entre 6 y 30 caracteres y puede contener (-,_,@,#) <br>"
      }
      if (alert.length > 0) {
          Swal.fire({
            icon: 'error',
            html: alert,
          })
      } else {
          const datos = {
              email: email,
              password: password
          };
          const opciones = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(datos) 
          };
          let emailSigned = await fetch("http://localhost:3000/api/login", opciones)
              .then(response => response.json())
          if (emailSigned == "success") {
              window.location.href = "http://localhost:3000/dashboard";
          } else if (emailSigned == false) {
              Swal.fire({
                  icon: 'error',
                  html: "Este email no esta registrado, por favor proceda a Sign up.",
                })
          } else if (emailSigned == "error") {
              Swal.fire({
                  icon: 'error',
                  html: "Credenciales incorrectas",
                })
          }
      }
  }); 
  let google = document.querySelectorAll(".google")
  google.forEach(element => {
      element.addEventListener("click", async function() {
        window.location.href = "http://localhost:3000/api/auth/google";
        // let correctAutentification = await fetch("http://localhost:3000/api/auth/google", { mode: 'no-cors' })
        //       .then(response => response.json())
        //   if (correctAutentification == "success") {
        //       window.location.href = "http://localhost:3000/dashboard";
        //   } else if (correctAutentification == "error") { 
        //       Swal.fire({
        //           icon: 'error',
        //           html: "Ha habido un error en la autenticación",
        //         })
        //   } 
      });
  });
}

if (document.title == "tokenExpirado") {
Swal.fire({
    icon: "error",
    title: "La sesión ha expirado",
    showDenyButton: false,
    showCancelButton: false,
    confirmButtonText: "Volver a iniciar sesión"
  }).then((result) => {
    window.location.href = "http://localhost:3000/"
  });
}

/* Funciones generales para usar en toda la web ---------------------------------------------------------------------*/
/* Función para imrpimir tarjetas de usuario (con boton de fav),hay que pasarle el array de objetos de películas, y el id de la sección (ej: "search-results") donde quieres que se pinten las tarjetas */
function printMovieCardsUser(moviesData, section) {
  console.log("Movie data to print: " + moviesData);
  const resultsSection = document.getElementById(`${section}`);
  resultsSection.innerHTML = "";
  let cardNumber = 0;

  const movieCard = (movie) => {
    //Store all found genres in a string
    let genres = movie.genres.map((genre) => genre).join(", ");
    //-----------------HTML structure of each movie card------------------------------
    return `<section class="movie-card" data-movie-id="${movie.id}">
              <section class="movie-card-image">
                <img src="${movie.image}" alt="Poster Image">
              </section>
              <section class="movie-card-details">
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
//Event listener de click en tarjeta ----- AÑADIR A CADA SECCIÓN DONDE IMPRIMAMOS TARJETAS, PARA PODER CLICKEAR EN ELLAS
function listenForClicks() {
  document.addEventListener("click", async (event) => {
    event.preventDefault();
    // console.log("He clickeado!");
    const movieCard = event.target.closest(".movie-card");
    if (movieCard) {
      const movieId = movieCard.getAttribute("data-movie-id");
      if (movieId) {
        // Redirect a la vista detalles de la película clickeada
        console.log("La id de la película clickeada es: " + movieId);
        window.location.href = `http://localhost:3000/search/${movieId}`;
      }
    }
  });
}
//Side nav-----------------------------------------------------
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
//Sección de búsqueda-----------------------------------------------------------------------------------

async function searchFilms(title) {
  return await fetch(`http://localhost:3000/api/movies/${title}`).then((res) =>
    res.json()
  );
}
async function searchFilmDetails(id) {
  return await fetch(`http://localhost:3000/api/movies/details/${id}`).then(
    (res) => res.json()
  );
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
    listenForClicks(); //Escuchar clicks en tarjetas
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
          <h1 class="movie-title">${movieDetails.title} <span class="movie-year">(${movieDetails.year})</span></h1>
          <div class="movie-length"><b>Duration:</b> ${movieDetails.length} min</div>
          <div class="movie-genres"><b>Genres:</b> ${movieDetails.genres.join(", ")}</div>
          <div class="movie-director"><b>Director:</b> ${movieDetails.director}</div>
          <div class="movie-actors"><b>Cast:</b> ${movieDetails.actors.join(", ")}</div>
      </section>
  </section>
  <section class="movie-overview">
      <h2>Overview</h2>
      <p>${movieDetails.overview}</p>
  </section>
  <section class="movie-trailer">
      <h2>Trailer</h2>
      <iframe src="${movieDetails.trailer}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </section>
</section>`

  console.log("I'm displaying details");
}
if (document.title === "Detalles de la película") {
  const movieId = window.location.pathname.split("/").pop();
  console.log(movieId);
  displayMovieDetails(movieId, "details-section");
}

//*---------Sección de formularios create/edit movies------------*//
document.addEventListener("DOMContentLoaded", () => {
  const createMovieButton = document.querySelector("#create_movie_button");
  const createMovieForm = document.querySelector("#movie_form");

  if (createMovieButton && createMovieForm) {
    createMovieButton.addEventListener("click", () => {
      createMovieForm.style.display = "block";
    });

    createMovieForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(createMovieForm);
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      try {
        const response = await fetch("/createMovie", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formObject),
        });
      } catch (error) {
        console.error("Error");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const editMovieForm = document.querySelector("#edit_movie_form");

  if (editMovieForm) {
    editMovieForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(editMovieForm);
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      // const movieId = /* obtener ID*/;

      try {
        const response = await fetch(`/editMovie/${movieId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formObject),
        });
      } catch (error) {
        console.error("Error de red", error);
      }
    });
  }
});
