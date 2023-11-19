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
    let moviePoster;
    movie.poster_path === null ? moviePoster = `https://i0.wp.com/tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg?ssl=1` : moviePoster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    return `<section class="movie-card" data-movie-title="${movie.title}" data-movie-poster="https://image.tmdb.org/t/p/w500/${movie.poster_path}" data-movie-id="${movie.id}">
              <section class="movie-card-image">
                <img src="${moviePoster}" alt="Poster Image">
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
