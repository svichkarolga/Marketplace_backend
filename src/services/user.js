import { UsersCollection } from '../db/models/user.js';

export const getUserById = async (userId) => {
  const user = await UsersCollection.findOne({ _id: userId });
  return user;
};

export const updateUser = async (userId, payload, options = {}) => {
  const updatedUser = await UsersCollection.findOneAndUpdate(
    { _id: userId },
    payload,
    {
      new: true,
      ...options,
    },
  );
  if (!updatedUser) return null;
  return {
    user: updatedUser,
    isNew: false,
  };
};
