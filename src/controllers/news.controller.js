import {
  createService,
  findService,
  countNewsService,
  topNewsService,
  findByIdService,
  searchByTitleService,
  findByUserService,
  updateService,
  eraseService,
  likeService,
  deleteLikeService,
  addCommentService,
  deleteCommentService,
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

export const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const news = await searchByTitleService(title);

    if (news.length === 0) {
      return res
        .status(400)
        .send({ message: "There ar no news with this title" });
    }

    res.send({
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

export const findByUser = async (req, res) => {
  try {
    const id = req.userId;

    const news = await findByUserService(id);

    res.send({
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

export const update = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    const { id } = req.params;

    if (!title && !banner && !text) {
      res
        .status(400)
        .send({ message: "Submit at least one field to update the post" });
    }

    const news = await findByIdService(id);

    if (news.user._id != req.userId) {
      return res.status(400).send({ message: "You didn`t update this post" });
    }

    await updateService(id, title, text, banner);

    return res.send({ message: "Post successfully updated" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const erase = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await findByIdService(id);

    if (news.user._id != req.userId) {
      return res.status(400).send({ message: "You didn`t delete this post" });
    }

    await eraseService(id);

    return res.send({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const like = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const newsLiked = await likeService(id, userId);

    if (!newsLiked) {
      await deleteLikeService(id, userId);
      return res.status(200).send({ message: "Like successfully removed" });
    }

    return res.status(200).send({ message: "Like done successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).send({ message: "Write a message to comment" });
    }

    await addCommentService(id, comment, userId);

    res.send({ message: "Comment successfully completed" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id, idComment } = req.params;
    const userId = req.userId;

    const commentDeleted = await deleteCommentService(id, idComment, userId);

    const commentFinder = commentDeleted.comments.find(
      (comment) => comment.idComment === idComment
    );

    commentFinder ?? res.status(404).send({ message: "Comment not found" });

    if (commentFinder.userId !== userId) {
      return res.status(400).send({ message: "You can`t delete this comment" });
    }

    res.send({ message: "Comment successfully removed" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
