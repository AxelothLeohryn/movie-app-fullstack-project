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
  ### Admin ###
  Para acceder como admin: ya tenemos registrado un administrador para que puedas ver cómo sería gestionar las películas.
  
      Usuario: admin@gmail.com
  
      Password: holahola

Con esos podrás crear, editar y borrar películas originales, creadas por tí y que aparecerán en el buscador para un futuro usuario.
  
   ### User ### 
  Para acceder como usuario: registrate en la web clicando en Sign Up y después logueate para poder empezar. Una vez dentro, ya podrás interactuar con toda la web y su funcionalidad:
   
  #### Navegador ####
  1. si clicas en la lupa podrás volver al buscador.
  2. si clicas en el corazón podrás acceder al apartado de tus películas guardadas en favoritos.

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
