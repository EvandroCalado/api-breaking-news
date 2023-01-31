import {
  createService,
  findService,
} from "../services/user.service.js";

export const create = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
      res.status(400).send({ message: "Submit all fields for registration" });
    }

    const user = await createService(req.body);

    if (!user) {
      return res.status(400).send({ message: "Error creating User" });
    }

    res.status(201).send({
      message: "User create successfully",
      user: {
        id: user._id,
        name,
        username,
        email,
        avatar,
        background,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const find = async (req, res) => {
  try {
    const users = await findService();

    if (users.length === 0) {
      return res.status(400).send({ message: "There are no registered users" });
    }

    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const findById = async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name && !username && !email && !password && !avatar && !background) {
      res.status(400).send({ message: "Submit at least one field update" });
    }

    const { id, user } = req;

    await updateService(
      id,
      name,
      username,
      email,
      password,
      avatar,
      background
    );

    res.send({ massage: "User successfully update!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
