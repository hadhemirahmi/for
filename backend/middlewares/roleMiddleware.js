function roleMiddleware(requiredRole) {
  return (req, res, next) => {
    console.log(req.user, requiredRole);
    if (req.user.role != requiredRole) {
      return res
        .status(403)
        .json({ message: "acces réfusé , permissions insuffisante" });
    }
    next();
  };
}

export default roleMiddleware;
