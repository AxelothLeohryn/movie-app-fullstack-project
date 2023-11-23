-- esta query devuelve las películas favs de un usuario según su email registrado
-- ponemos el email en parámetro ya que cogerá el que se haya registrado?
SELECT * FROM favorite_movies 
WHERE email =$1 



--borra una peli de la bbdd según si id
DELETE FROM favorite_movies
WHERE movie_id =$1;
