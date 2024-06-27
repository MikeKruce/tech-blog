const router = require('express').Router();
const { Post, Comment } = require('../../models');

// Create a new post
router.post('/', async (req, res) => {
  if (!req.session.logged_in) {
    res.status(401).json({ message: 'You must be logged in to create a post' });
    return;
  }

  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post
router.put('/:id', async (req, res) => {
  if (!req.session.logged_in) {
    res.status(401).json({ message: 'You must be logged in to edit a post' });
    return;
  }

  try {
    const post = await Post.findByPk(req.params.id);
    if (post.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'You are not authorized to edit this post' });
      return;
    }

    const updatedPost = await Post.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  if (!req.session.logged_in) {
    res.status(401).json({ message: 'You must be logged in to delete a post' });
    return;
  }

  try {
    const post = await Post.findByPk(req.params.id);
    if (post.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'You are not authorized to delete this post' });
      return;
    }

    await Comment.destroy({ where: { post_id: req.params.id } });
    await Post.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Post and associated comments deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
