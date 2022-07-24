import express from 'express';

import User from '../models/User';

// const router = require('express').Router();
const router = express.Router();

// ユーザー情報の取得
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, updatedAt, ...other } = user?._doc;
    return res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// ユーザー情報の更新
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      return res.status(200).json('ユーザー情報が更新されました');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('あなたは自分のアカウントのときだけ情報を更新できます');
  }
});

// ユーザー情報の削除
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json('ユーザー情報が削除されました');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('あなたは自分のアカウントのときだけ情報を削除できます');
  }
});

// ユーザーのフォロー
router.put('/:id/follow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      // フォロワーに自分が存在しなかった場合のみフォローできる
      if (!user?.followers?.includes(req.body.userId)) {
        await user?.updateOne({
          $push: {
            followers: req.body.userId,
          },
        });
        await currentUser?.updateOne({
          $push: {
            followings: req.params.id,
          },
        });
        return res.status(200).json('フォローしました');
      } else {
        return res.status(403).json('あなたはすでにこのユーザーをフォローしています');
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json('自分自身をフォローできません');
  }
});

// ユーザーのアンフォロー
router.put('/:id/unfollow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      // フォロワーに存在した場合、フォローを外せる
      if (user?.followers?.includes(req.body.userId)) {
        await user?.updateOne({
          $pull: {
            followers: req.body.userId,
          },
        });
        await currentUser?.updateOne({
          $pull: {
            followings: req.params.id,
          },
        });
        return res.status(200).json('フォロー解除しました');
      } else {
        return res.status(403).json('このユーザーはフォロー解除できません');
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json('自分自身をフォロー解除できません');
  }
});

// module.exports = router;
export default router;
