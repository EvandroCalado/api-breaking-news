import {
  createService,
  findService,
  countNewsService,
  topNewsService,
  findByIdService,
} from "../services/news.service.js";

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
  try {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }

    if (!offset) {
      offset = 0;
    }

    const news = await findService(limit, offset);
    const totalNews = await countNewsService();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < totalNews ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous !== null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (news.length === 0) {
      return res.status(400).send({ message: "There are no registered news" });
    }

    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      totalNews,

      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        userName: item.user.username,
        userAvatar: item.user.avatar,
      })),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const topNews = async (req, res) => {
  try {
    const topNew = await topNewsService();

    if (!topNew) {
      return res.status(400).send({ message: "There is not registered post" });
    }

    res.send({
      topNew: {
        id: topNew._id,
        title: topNew.title,
        text: topNew.text,
        banner: topNew.banner,
        likes: topNew.likes,
        comments: topNew.comments,
        name: topNew.user.name,
        userName: topNew.user.username,
        userAvatar: topNew.user.avatar,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const findById = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await findByIdService(id);

    res.send({
      topNew: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.username,
        userAvatar: news.user.avatar,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
