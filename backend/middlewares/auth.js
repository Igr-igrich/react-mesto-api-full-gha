const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new UnauthorizedError("Необходима авторизация"));
    return;
  }

  // извлечём токен
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "super_secret_key",
    );
  } catch (err) {
    next(new UnauthorizedError("Необходима авторизация"));
    return;
  }

  req.user = payload;

  next();
};