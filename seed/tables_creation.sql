CREATE TABLE "users"(
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "password" geography(LINESTRING, 4326) NOT NULL,
    "admin" BOOLEAN NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("email");
CREATE TABLE "favorite_movies"(
    "favorite_id" SERIAL,
    "email" VARCHAR(255) NOT NULL,
    "movie_id" BIGINT NOT NULL
   
);
ALTER TABLE
    "favorite_movies" ADD PRIMARY KEY("favorite_id");
ALTER TABLE
    "favorite_movies" ADD CONSTRAINT "movies_email_foreign" FOREIGN KEY("email") REFERENCES "users"("email");