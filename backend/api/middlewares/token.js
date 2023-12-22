import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.user_id = decoded.user_id;
    req.role = decoded.role;
    req.email = decoded.email;

    next();
  });
};

export const verifyEmailToken = (req, res, next) => {
  const token = req.params.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user_id = decoded.user_id;
    req.email = decoded.email;

    next();
  });
};
