const getMovies = (req, res) => {
  const admin = req.user.admin;
  console.log(admin);

  if (admin === true) {
    res.render("admView");
  } else {
    res.render("userView");
  }
};

const createMoviesForm = (req, res) => {
  res.render("createView");
};

const editMoviesForm = (req, res) => {
  res.render("editView");
};
//res, formulario crear
//formulario editar

module.exports = {
  getMovies,
  createMoviesForm,
  editMoviesForm,
};
