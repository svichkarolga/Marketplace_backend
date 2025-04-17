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
    condition: {
      type: String,
      enum: ['new', 'used'],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    region: {
      type: String,
      enum: [
        'Vinnytska',
        'Volynska',
        'Dnipropetrovska',
        'Donetska',
        'Zhytomyrska',
        'Zakarpatska',
        'Zaporizka',
        'Ivano-Frankivska',
        'Kyivska',
        'Kirovohradska',
        'Luhanska',
        'Lvivska',
        'Mykolaivska',
        'Odeska',
        'Poltavska',
        'Rivnenska',
        'Sumska',
        'Ternopilska',
        'Kharkivska',
        'Khersonska',
        'Khmelnytska',
        'Cherkaska',
        'Chernivetska',
        'Chernihivska',
        'Crimea',
      ],
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    delivery: {
      type: String,
      enum: ['self - pickup', 'mail'],
      required: true,
    },
    favoritesCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ProductsCollection = model('product', productSchema);
