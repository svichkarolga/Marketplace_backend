import express from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import getChats, {
  sendMessage,
  getMessages,
  markAsRead,
} from '../controllers/messages.js';

const router = express.Router();

router.use(authenticate);

router.post('/', sendMessage);
router.get('/chats', getChats);
router.get('/:productId/:recipientId', getMessages);
router.patch('/read', markAsRead);

export default router;
