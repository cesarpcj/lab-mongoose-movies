const { Router } = require("express");
const movieRouter = Router();
const Movie = require("./../models/movie");

movieRouter.get("/movies", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/index", { movies });
    })
    .catch((error) => {
      next(error);
    });
});

movieRouter.get("/movies/create", (req, res, next) => {
  res.render("movies/create");
});

movieRouter.post("/movies/create", (req, res, next) => {
  const { title, genre, plot } = req.body;
  Movie.create({
    title,
    genre,
    plot,
  })
    .then((doc) => {
      console.log(doc);
      res.redirect("/movies");
    })
    .catch((error) => {
      next(error);
    });
});

movieRouter.get("/movies/movie/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      console.log(movie);
      res.render("movies/show", movie);
    })
    .catch((error) => {
      next(error);
    });
});

movieRouter.post("/movies/movie/:id/delete", (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then((movie) => {
      res.redirect("/movies");
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = movieRouter;
