import User from "../models/User.js";

export const createService = (body) => User.create(body);

export const findService = () => User.find();

export const findByIdService = (id) => User.findById(id);

export const updateService = (
  id,
  name,
  username,
  email,
  password,
  avatar,
  background
) =>
  User.findOneAndUpdate(
    { _id: id },
    { name, username, email, password, avatar, background }
  );
