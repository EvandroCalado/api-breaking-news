import User from "../models/User.js";

const create = (body) => User.create(body);

const find = () => User.find();

const findById = (id) => User.findById(id);

const update = (id, name, username, email, password, avatar, background) =>
  User.findOneAndUpdate(
    { _id: id },
    { name, username, email, password, avatar, background }
  );

export default {
  create,
  find,
  findById,
  update,
};
