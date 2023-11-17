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
            alert += "El nombre tiene que tener entre 2 y 30 caracteres <br>"
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
            if (emailAvailable == false) {
                Swal.fire({
                    icon: 'error',
                    html: "Ese email ya está en uso, por favor proceda a log in.",
                  })
            }
        } 

        
    });
}