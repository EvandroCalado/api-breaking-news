import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { findByIdService } from "../services/user.service.js";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.sendStatus(401);
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.sendStatus(401);
    }

    const [Schema, token] = parts;

    if (Schema !== "Bearer") {
      return res.sendStatus(401);
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Token invalid" });
      }

      const user = await findByIdService(decoded.id);

      if (!user || !user.id) {
        return res.status(401).send({ message: "Invalid token!" });
      }

      req.id = user.id;

      next();
    });

  } catch (error) {
    res.status(500).send(error.message);
  }
};