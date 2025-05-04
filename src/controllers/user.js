import { getEnvVar } from '../utils/getEnvVar.js';
import { getUserById, updateUser } from '../services/user.js';
import createHttpError from 'http-errors';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getUserByIdController = async (req, res, next) => {
  const userId = req.user._id;
  console.log('req.user', req.user);
  try {
    const user = await getUserById(userId);
    res.json({
      status: 200,
      message: `Successfully found user with id ${userId}!`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const patchUserController = async (req, res, next) => {
  try {
    const { id: userId } = req.params;

    const photo = req.file;
    let photoUrl;
    if (photo) {
      if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
    }
    const result = await updateUser(userId, {
      ...req.body,
      photo: photoUrl,
    });
    if (!result) {
      return next(createHttpError(404, 'User not found'));
    }
    res.json({
      status: 200,
      message: `Successfully patched a user!`,
      data: result.user,
    });
  } catch (error) {
    next(error);
  }
};
