if (document.title == "Inicio") {
    let signUp = document.querySelectorAll(".signUpButton");
    signUp.forEach(element => {
        element.addEventListener("click", function() {
            document.getElementById("container").classList.add("hide");
            document.getElementById("signUpContainer").classList.remove("hide");
            document.getElementById("logInContainer").classList.add("hide");
            document.getElementById("signUp").classList.add("hide");
            document.getElementById("logIn").classList.remove("hide");
        })
    });
    let logIn = document.querySelectorAll(".logInButton");
    logIn.forEach(element => {
        element.addEventListener("click", function() {
            document.getElementById("container").classList.add("hide");
            document.getElementById("logInContainer").classList.remove("hide");
            document.getElementById("signUpContainer").classList.add("hide");
            document.getElementById("signUp").classList.remove("hide");
            document.getElementById("logIn").classList.add("hide");
        })
    });
}