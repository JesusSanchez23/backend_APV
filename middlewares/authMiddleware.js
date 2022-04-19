import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const chechAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoder = jwt.verify(token, process.env.JWT_SECRET);

      req.veterinario = await Veterinario.findById(decoder.id).select(
        "-password -token -confirmado"
      );

      return next();
    } catch (error) {
      const e = new Error("Token no valido");
      return res.status(404).json({
        msg: e.message,
      });
    }
  }

  if (!token) {
    const error = new Error("Token no valido o inixistente");
    res.status(404).json({
      msg: error.message,
    });
  }
  next();
};

export default chechAuth;
