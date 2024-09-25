exports.getUser = async (req, res, next) => {
    const userData = {
        name: req.user.name,
        avatar: req.user.avatarUrl || null
    }

    res.json(userData)
}

exports.checkSession = (req, res) => {
    if (req.isAuthenticated()) {
      res.json(true);
    } else {
      res.json(false);
    }
  };