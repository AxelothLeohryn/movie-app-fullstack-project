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
  document.getElementById("sidenav").style.width = "calc(100vw - 56px)"
}
function closeNav() {
  document.getElementById("sidenav").style.width = "0px"
}
document.getElementById("topnav-menu").addEventListener("click", event => {
  event.preventDefault();
  openNav();
})
document.getElementById("sidenav-header-close").addEventListener("click", event => {
  event.preventDefault();
  closeNav();
})
//Sección de búsqueda

if (document.title == "Búsqueda") {
  
  console.log("estoy en search");
  const searchButton = document.getElementById("search-button");
  //Prueba de fetch en API externa y display resultados:
  searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("test de busqueda");
    const query = document.getElementById("search-bar").value;
    console.log(query);
    // fetch.searchFilmsExternalAPI(query);
  });
}
