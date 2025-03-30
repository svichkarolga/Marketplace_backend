import { model, Schema } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    photo: { type: String },
  },
  {
    timestamps: true,
    createdAt: Date.now,
    updatedAt: Date.now,
    versionKey: false,
  },
);

export const ProductCollection = model('product', productSchema);
