import bcrypt from 'bcrypt';
import ApiError from '../errors/apiError';
import model from '../models/model';
import jwt from 'jsonwebtoken';
import { generateJwtToken } from '../utils/generateToken';
import userService from '../service/userService';

class UserController {
  async register(req, res, next) {
    try {
      const { email, password, role } = req.body;

      const userData = await userService.registration(email, password, role);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(userData);

      // const candidate = await model.User.findOne({ where: { email } });
      // return res.status(200).json({ token });
    } catch (error) {
      return next(ApiError.internal(error.message));
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    const candidate: any = await model.User.findOne({ where: { email } });

    if (!candidate) {
      return next(ApiError.forbidden(`Sorry, ${email} does not exist.`));
    }

    const comparePassword = await bcrypt.compare(password, candidate.password);

    if (!comparePassword) {
      return next(ApiError.forbidden('Sorry, you password incorrect !'));
    }

    const token = generateJwtToken(candidate.id, email, candidate.role);

    return res.status(200).json({ token });
  }

  async logout(req, res, next) {
    try {
      await res.status(200).json({ logout: true });
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async activate(req, res, next) {
    try {
      await res.status(200).json(`Activate ${req.params.link}`);
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async refresh(req, res, next) {
    try {
      await res.start(200).json(`REFRESH`);
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async check(req, res, next) {
    try {
      const token = generateJwtToken(
        req.user.id,
        req.user.email,
        req.user.role
      );
      return res.json({ token });
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async users(req, res, next) {
    try {
      let { limit, page } = req.query;
      page = page || 1;
      limit = limit || 5;
      let offset = page * limit - limit;

      const response = await model.User.findAndCountAll({ limit, offset });
      res.status(200).json(response);
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }
}

export default new UserController();
