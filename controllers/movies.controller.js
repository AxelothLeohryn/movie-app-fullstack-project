const getMovies = (req, res) => {
  const admin = req.user.admin;

  if (admin) {
    res.render("admView");
  } else {
    res.render("userView", {email:req.user.email});
  }
};

module.exports = {
  getMovies,
};
