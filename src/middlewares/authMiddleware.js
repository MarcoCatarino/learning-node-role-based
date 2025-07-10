import jwt from "jsonwebtoken";

import { ENV } from "../config/env.js";

export const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token)
      return res
        .status(401)
        .json({ message: "No token, Authorization Denied!" });

    try {
      const decode = jwt.verify(token, ENV.JWT_SECRET);
      req.user = decode;

      console.log("The decode user is: ", req.user);

      next();
    } catch (error) {
      res.status(400).json({ meesage: "Token is Not Valid!" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "No token, Authorization Denied! (else)" });
  }
};
