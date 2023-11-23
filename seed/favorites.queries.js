
const favQueries = {

    getAllFavoritesByEmail: `SELECT movie_id 
    FROM favorite_movies 
    WHERE email =$1;`,
    deleteFavoriteById:`DELETE FROM favorite_movies
    WHERE movie_id =$1 AND email =$2;`,
    createFavorite: `INSERT INTO favorite_movies(email, movie_id)
    VALUES ($1,$2)` 
    

}


module.exports = favQueries;