import { MessagesCollection } from '../db/models/message.js';
import { UsersCollection } from '../db/models/user.js';
import createHttpError from 'http-errors';

export const sendMessage = async (req, res, next) => {
  try {
    const { productId, recipientId, text } = req.body;

    // Проверка, что отправитель не отправляет сообщение самому себе
    if (req.user._id.toString() === recipientId) {
      return next(createHttpError(400, "You can't send message to yourself"));
    }

    // Проверка, что текст сообщения не пустой
    if (!text || !text.trim()) {
      return next(createHttpError(400, 'Message text is required'));
    }

    const message = await MessagesCollection.create({
      product: productId,
      sender: req.user._id,
      recipient: recipientId,
      text: text.trim(),
    });

    // Обновляем счетчик непрочитанных сообщений у получателя
    const newCount = await MessagesCollection.countDocuments({
      recipient: recipientId,
      isRead: false,
    });

    await UsersCollection.findByIdAndUpdate(recipientId, {
      unreadMessagesCount: newCount,
    });

    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};

export default async (req, res, next) => {
  try {
    const chats = await MessagesCollection.aggregate([
      {
        $match: {
          $or: [{ sender: req.user._id }, { recipient: req.user._id }],
        },
      },
      {
        $group: {
          _id: { product: '$product', recipient: '$recipient' },
          lastMessage: { $last: '$$ROOT' },
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$recipient', req.user._id] },
                    { $eq: ['$isRead', false] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id.product',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
    ]);
    res.json(chats);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await MessagesCollection.find({
      product: req.params.productId,
      $or: [
        { sender: req.user._id, recipient: req.params.recipientId },
        { sender: req.params.recipientId, recipient: req.user._id },
      ],
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const { messageIds } = req.body;
    if (!messageIds || !Array.isArray(messageIds)) {
      return next(createHttpError(400, 'messageIds array is required'));
    }
    await MessagesCollection.updateMany(
      {
        recipient: req.user._id,
        _id: { $in: messageIds },
      },
      { $set: { isRead: true } },
    );
    const newCount = await MessagesCollection.countDocuments({
      recipient: req.user._id,
      isRead: false,
    });
    await UsersCollection.findByIdAndUpdate(req.user._id, {
      unreadMessagesCount: newCount,
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
