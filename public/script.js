//Sección de inicio
if (document.title == "Inicio") {
  let signUp = document.querySelectorAll(".signUpButton");
  signUp.forEach((element) => {
    element.addEventListener("click", function () {
      document.getElementById("container").classList.add("hide");
      document.getElementById("signUpContainer").classList.remove("hide");
      document.getElementById("logInContainer").classList.add("hide");
      document.getElementById("signUp").classList.add("hide");
      document.getElementById("logIn").classList.remove("hide");
    });
  });
  let logIn = document.querySelectorAll(".logInButton");
  logIn.forEach((element) => {
    element.addEventListener("click", function () {
      document.getElementById("container").classList.add("hide");
      document.getElementById("logInContainer").classList.remove("hide");
      document.getElementById("signUpContainer").classList.add("hide");
      document.getElementById("signUp").classList.remove("hide");
      document.getElementById("logIn").classList.add("hide");
    });
  });
}

//Side nav
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
//Sección de búsqueda
async function searchFilms(title) {
  return await fetch(`http://localhost:3000/api/movies/${title}`).then((res) =>
    res.json()
  );
}
function printMovieCards(moviesData, section) {
  // A esta función hay que pasarle el array de objetos de películas, y el id de la sección (ej: "search-results") donde quieres que se pinten las tarjetas
  const resultsSection = document.getElementById(`${section}`);
  let cardNumber = 0;
  const movieCard = (movie) => {
    return `<section class="movie-card" data-movie-title="${movie.title}" data-movie-poster="https://image.tmdb.org/t/p/w500/${movie.poster_path}" data-movie-id="${movie.id}">
              <section class="movie-card-image">
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Poster Image">
              </section>
              <section class="movie-card-details">
                <section class="movie-card-details-header">
                  <h4>${movie.release_date}</h4>
                  </section>
                <section class="movie-card-details-content">
                  <h3>${movie.title}</h3>
                </section>
              </section>
            </section>`;
  };
  // Podria añadir inline: style="background-image: url(https://image.tmdb.org/t/p/w1280${movie.poster_path})"
  // console.log(moviesData);
  let movieCardContainerHTML = `<section class="movie-card-container">`;
  moviesData.forEach((movie) => {
    movieCardContainerHTML += movieCard(movie);
  });
  movieCardContainerHTML += `</section>`;
  resultsSection.innerHTML += movieCardContainerHTML;
}

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
