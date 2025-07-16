import MessagesCollection from '../db/models/message.js';
import UsersCollection from '../db/models/user.js';

export const updateUnreadCount = async (req, res, next) => {
  if (req.user) {
    const count = await MessagesCollection.countDocuments({
      recipient: req.user._id,
      isRead: false,
    });
    await UsersCollection.findByIdAndUpdate(req.user._id, {
      unreadMessagesCount: count,
    });
  }
  next();
};
