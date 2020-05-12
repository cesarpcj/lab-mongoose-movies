const express = require("express");
const celebRouter = express.Router();
const Celebrity = require("./../models/celebrity");

celebRouter.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/index", { celebrities });
    })
    .catch((error) => {
      next(error);
    });
});

celebRouter.get("/celebrities/:id", (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebrity) => {
      res.render("celebrities/show", celebrity);
    })
    .catch((error) => {
      next(error);
    });
});

celebRouter.post("/celebrities", (req, res, next) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  const phrase = req.body.phrase;

  Celebrity.create({
    name,
    occupation,
    catchPhrase: phrase,
  })
    .then((celebrity) => {
      res.redirect("celebrities/");
    })
    .catch((error) => {
      res.redirect("celebrities/create/create");
    });
});

celebRouter.post("/celebrities/:id/delete", (req, res, next) => {
  const id = req.params.id;

  Celebrity.findByIdAndRemove(id)
    .then((celebrity) => {
      res.redirect("/celebrities/");
    })
    .catch((error) => {
      next(error);
    });
});

celebRouter.get("/celebrities/create/create", (req, res, next) => {
  res.render("celebrities/create");
});

module.exports = celebRouter;
