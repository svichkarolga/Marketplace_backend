import { Schema, model, Types } from 'mongoose';

const reviewSchema = new Schema(
  {
    seller: { type: Types.ObjectId, ref: 'users', required: true },
    buyer: { type: Types.ObjectId, ref: 'users', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true, versionKey: false },
);

export const ReviewsCollection = model('reviews', reviewSchema);
