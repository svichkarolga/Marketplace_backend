import { model, Schema } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        'children',
        'pet',
        'home',
        'fashion',
        'hobby',
        'sport',
        'tools',
        'gadget',
        'garden',
        'free',
      ],
      required: true,
      default: 'children',
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
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'users',
    // },
  },
  {
    timestamps: true,
    createdAt: Date.now,
    updatedAt: Date.now,
    versionKey: false,
  },
);

export const ProductsCollection = model('product', productSchema);
