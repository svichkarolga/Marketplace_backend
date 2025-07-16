import { model, Schema } from 'mongoose';

const messageSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'products', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    recipient: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    text: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

export const MessagesCollection = model('messages', messageSchema);
