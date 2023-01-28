import { createService, findService } from "../services/news.service.js";

export const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      res.status(400).send({ message: "Submit all fields for regisdtration" });
    }

    await createService({
      title,
      text,
      banner,
      user: req.userId,
    });

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const find = async (req, res) => {
  const news = await findService();

  if (news.length === 0) {
    return res.status(400).send({ message: "There are no registered news" });
  }

  res.send(news);
};
