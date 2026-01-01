import jwt from "jsonwebtoken";

function jwtMiddleware(req, res, next) {
  let token =
    req.header("Authorization") &&
    req.header("Authorization").replace("Bearer ", "");
  //bearer dfsfsdf.sdfsdf.sdfsdf
  if (!token) {
    return res.status(401).json({ message: "Acces réfusé , aucun jeton" });
  }
  try {
    console.log(token);
    let decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //bech nzid l token decoded l requete w na3tih lelli ba3di
    req.user = decoded_token.user;
    // t3adda lel etape elli ba3dha
    next();
  } catch (err) {
    return res.status(400).json({ message: "jeton invalide !" });
  }
}

export default jwtMiddleware;
