CREATE TABLE "users"(
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "password" geography(LINESTRING, 4326) NOT NULL,
    "admin" BOOLEAN NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("email");
CREATE TABLE "movies"(
    "favorite_id" BIGINT NOT NULL UNIQUE,
    "email" VARCHAR(255) NOT NULL,
    "movie_id" BIGINT NOT NULL,
    "from_api" BOOLEAN NOT NULL
);
ALTER TABLE
    "movies" ADD PRIMARY KEY("favorite_id");
ALTER TABLE
    "movies" ADD CONSTRAINT "movies_email_foreign" FOREIGN KEY("email") REFERENCES "users"("email");