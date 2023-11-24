# Backend proyect :computer: 	:warning: # 
---

## Herramientas ##
- Node js
- Express
- BBDD SQL
- BBDD Mongo Atlas
- Render
- Web Scraping (puppeteer)
- Pug
- NodeMailer
- Helmet
- Passport, OAuth
  
## Contenido ##
En este repositorio encontrarás un proyecto de backend en que se han combinado las herramientas descritas más arriba para crear una web en la que podrás buscar películas y guardarlas en tu perfil de favoritos. Además, si te accedes como administrador podrás crear películas nuevas, editarlas o borrarlas. Al usuario le aparecerán en su búsqueda tambien. 

## Instrucciones ##

<img width="156" alt="Captura de pantalla 2023-11-23 210746" src="https://github.com/AxelothLeohryn/movie-app-fullstack-project/assets/145337549/ee61d990-2e69-4219-b273-42e142ce4acf">

  ### Admin ###
  Para acceder como admin: ya tenemos registrado un administrador para que puedas ver cómo sería gestionar las películas.
  
      Usuario: admin@gmail.com
  
      Password: holahola


      

Con esos podrás crear, editar y borrar películas originales, creadas por tí y que aparecerán en el buscador para un futuro usuario.
Si clicas en crear película se abrirá un formulario como el de editar pero con los campos vacíos, dale rienda suelta a tu imaginación. 

  <img width="206" alt="Captura de pantalla 2023-11-23 204914" src="https://github.com/AxelothLeohryn/movie-app-fullstack-project/assets/145337549/c604e2a4-4392-4db5-b951-17563bb0742c">
  
  <img width="217" alt="Captura de pantalla 2023-11-23 205009" src="https://github.com/AxelothLeohryn/movie-app-fullstack-project/assets/145337549/582e1358-38d5-4ef8-ba05-6097c5d8619e">


---

Este es un ejemplo de una película original, si quisieras editarla le das a la rueda de la esquina superior, si quisieras borrarla le das a la papelera. Si clicas en el cartel gris con detalles de la película se despliegan los restantes, así puedes verlo todo. 


  <img width="204" alt="Captura de pantalla 2023-11-23 204930" src="https://github.com/AxelothLeohryn/movie-app-fullstack-project/assets/145337549/1d9758f9-003b-4774-a0d2-795a3bbdc123">
  
  
  <img width="210" alt="Captura de pantalla 2023-11-23 204946" src="https://github.com/AxelothLeohryn/movie-app-fullstack-project/assets/145337549/77ec77e2-0845-4fbb-aea0-860c641819df">



   ### User ### 
  Para acceder como usuario: registrate en la web clicando en Sign Up y después logueate para poder empezar. Podrás registrarte tanto con google como con una cuenta de correo y contraseña propios. Una vez dentro, ya podrás interactuar con toda la web y su funcionalidad:
  
  <img width="152" alt="Captura de pantalla 2023-11-23 210759" src="https://github.com/AxelothLeohryn/movie-app-fullstack-project/assets/145337549/1804c56e-1bdd-4fbe-8a80-04f7c892f65d">

   
  #### Navegador ####
  1. si clicas en la lupa podrás volver al buscador.
  2. si clicas en el corazón podrás acceder al apartado de tus películas guardadas en favoritos.

De igual manera podrás acceder a esas dos secciones pulsando en los botones que salen en la pantalla

<img width="148" alt="Captura de pantalla 2023-11-23 210229" src="https://github.com/AxelothLeohryn/movie-app-fullstack-project/assets/145337549/0593aee3-174c-441e-8c8f-a761a0cdc167">


  #### Buscador ####
  Escribe el título de una película que desees buscar y conocer sus detalles, verás un corazón rojo con un más, al clicarlo se guardará esa película en tus favoritos. Si clicas en el título de la película podrás desplegar todos sus detalles. 

  #### Mis películas favoritas ####
  En esta sección puedes gestionar las películas que hayas guardado en favoritos, si clicas en el corazón con un menos podrás eliminarla y la tarjeta desaparecerá. 

## ¿Cómo funciona? ##  
El proyecto funciona con dos bases de datos: SQl y Mongo. En SQL, desplegada en Render, se guardan las películas favoritas de cada usuario que luego pintamos en las diferentes tarjetas. En administrador, trabaja con la base de datos no relacional Mongo y crea, edita y borra películas que se guardan allí. 
Las películas se pintan a través de llamadas fetch a una APi externa combinada con una llamada a nuestra APi de películas originales. La llamada da como resultado un array de objetos de películas.

¿Quieres probarlo? Pues clica en el enlace y disfruta!! 

https://movie-app-fullstack.onrender.com/

![image](https://github.com/AxelothLeohryn/movie-app-fullstack-project/assets/145337549/1f1e0074-31a7-45ad-aa87-0f13d2b9d6e9)
