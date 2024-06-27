const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
  if (!req.session.logged_in) {
    res.status(401).json({ message: 'You must be logged in to comment' });
    return;
  }

  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ message: 'Failed to post comment', error: err.message });
  }
});

module.exports = router;
