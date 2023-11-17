const getMovies = (req, res) => {
  const viewData = {
    title: "Administrador",
    trueAdmi: true,
  };

  if (viewData.isAdmin) {
    res.render("adminView", viewData);
  } else {
    res.render("userView", viewData);
  }
};

module.exports = {
  getMovies,
};
