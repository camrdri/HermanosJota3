module.exports = function adminGuard(req, res, next) {
  if (!req.user?.rol?.includes("admin")) {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  next();
};
