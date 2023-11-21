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
          "http://localhost:3000/api/signup",
          opciones
        ).then((response) => response.json());
        if (emailAvailable == "success") {
          window.location.href = "http://localhost:3000/dashboard";
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
          "http://localhost:3000/api/login",
          opciones
        ).then((response) => response.json());
        if (emailSigned == "success") {
          window.location.href = "http://localhost:3000/dashboard";
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
    element.addEventListener("click", function () {
      window.location.href = "http://localhost:3000/api/auth/google";
    });
  });
}
/* --------------------------------PRINT MOVIES FUNCTION -------------------------*/
function printMovieCards(moviesData, section) {
  // A esta función hay que pasarle el array de objetos de películas, y el id de la sección (ej: "search-results") donde quieres que se pinten las tarjetas
  const resultsSection = document.getElementById(`${section}`);
  resultsSection.innerHTML = "";
  let cardNumber = 0;

  const movieCard = (movie) => {
    //Check if there is a movie poster, if not use a placeholder image ("Image not available")
    let moviePoster;
    movie.image === "https://image.tmdb.org/t/p/w500//null"
      ? (moviePoster = `https://i0.wp.com/tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg?ssl=1`)
      : (moviePoster = `https://image.tmdb.org/t/p/w500/${movie.image}`);
    //Store all found genres in a string
    let genres = movie.genres.map((genre) => genre).join(", ");
    //-----------------HTML structure of each movie card------------------------------
    return `<section class="movie-card" data-movie-title="${movie.title}" data-movie-poster="https://image.tmdb.org/t/p/w500/${movie.image}" data-movie-id="${movie.id}">
              <section class="movie-card-image">
                <img src="${moviePoster}" alt="Poster Image">
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
  resultsSection.innerHTML += movieCardContainerHTML;
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
//Event listener of search button: GET (/api/movies/title), then print cards
if (document.title == "Búsqueda") {
  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const query = document.getElementById("search-bar").value;
    //Fetch from our API to search for the film/s.
    const results = await searchFilms(query);
    console.log(results);
    printMovieCards(results, "search-results");
  });
}

// FORMULARIO CREAR PELICULA
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
    const response = await fetch("http://localhost:3000/api/createMovie", {
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
});

// FORMULARIO EDITAR PELICULA
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
    const response = await fetch("http://localhost:3000/api/editMovie/:id", {
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
});

if (document.title == "tokenExpirado") {
  Swal.fire({
    icon: "error",
    title: "La sesión ha expirado",
    showDenyButton: false,
    showCancelButton: false,
    confirmButtonText: "Volver a iniciar sesión",
  }).then((result) => {
    window.location.href = "http://localhost:3000/";
  });
}
