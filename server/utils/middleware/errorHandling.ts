import ApiError from '../../errors/apiError';

export const errorHandler = function (err, req, res, next) {
  if (!(err instanceof ApiError)) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Unexpected error. Sorry' });
};
