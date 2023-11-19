const getMovies = (req, res) => {
  const admin = true;

  if (admin) {
    res.render("admView");
  } else {
    res.render("userView");
  }
};

module.exports = {
  getMovies,
};
