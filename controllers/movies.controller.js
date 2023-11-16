const getMovies = (req, res) => {
  const viewData = {
    title: "Administrador",
    trueAdmi: req.trueAdmi,
  };

  if (req.isAdmin) {
    res.render("adminView", viewData);
  } else {
    res.render("userView", viewData);
  }
};

module.exports = {
  getMovies,
};
