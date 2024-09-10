const jwt = require('jsonwebtoken');

exports.getUser = async (req, res, next) => {
    console.log(req.user)
    const userData = {
        name: req.user.name,
        avatar: req.user.avatarUrl || null
    }

    res.json(userData)
}