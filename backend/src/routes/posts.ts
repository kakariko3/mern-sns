import express from 'express';

import Post from '../models/Post';
import User from '../models/User';

const router = express.Router();

// 投稿を作成する
router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 投稿を更新する
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post?.userId === req.body.userId) {
      await post?.updateOne({
        $set: req.body,
      });
      return res.status(200).json('投稿の編集に成功しました');
    } else {
      return res.status(403).json('あなたは他の人の投稿を編集できません');
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

// 投稿を削除する
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post?.userId === req.body.userId) {
      await post?.deleteOne();
      return res.status(200).json('投稿を削除しました');
    } else {
      return res.status(403).json('あなたは他の人の投稿を削除できません');
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

// 特定の投稿を取得する
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(403).json(err);
  }
});

// 特定の投稿にいいねする
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // まだ投稿にいいねが押されていない場合のみ、いいねができる
    if (!post?.likes?.includes(req.body.userId)) {
      await post?.updateOne({
        $push: {
          likes: req.body.userId,
        },
      });
      return res.status(200).json('投稿にいいねをしました');
    } else {
      // すでにいいねしている場合は、いいねを取り除く
      await post.updateOne({
        $pull: {
          likes: req.body.userId,
        },
      });
      return res.status(403).json('投稿からいいねを外しました');
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// タイムラインの投稿を取得する
router.get('/timeline/all', async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({
      userId: currentUser?._id,
    });
    // 自分がフォローしているユーザーの投稿をすべて取得する
    const followerPosts = await Promise.all(
      currentUser!.followings!.map((followerId) => {
        return Post.find({ userId: followerId });
      })
    );
    return res.status(200).json(userPosts.concat(...followerPosts));
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default router;
