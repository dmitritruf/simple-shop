import bcrypt from 'bcrypt';
import ApiError from '../errors/apiError';
import model from '../models/model';
import jwt from 'jsonwebtoken';

class UserController {
  async register(req, res, next) {
    const { email, password, role } = req.body;
    console.log(email, password, role);
    const candidate = await model.User.findOne({ where: { email } });

    if (candidate) {
      return next(ApiError.forbidden(`This ${email} has already exist`));
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const user: any = await model.User.create({
      email,
      password: hashPassword,
      role,
    });

    const basket = await model.Basket.create({ userId: user.id });

    const token = jwt.sign(
      { id: user.id, email, role },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    return res.status(200).json(token);
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    const candidate: any = await model.User.findOne({ where: { email } });

    if (!candidate) {
      return next(ApiError.forbidden(`Sorry, ${email} does not exist.`));
    }

    const comparePassword = await bcrypt.compare(password, candidate.password);
    console.log(comparePassword);
    if (!comparePassword) {
      return next(ApiError.forbidden('Sorry, you password incorrect !'));
    }

    const token = jwt.sign(
      { id: candidate.id, email, role: candidate.role },
      process.env.SECRET_KEY
    );

    return res.status(200).json(token);
  }
  async check(req, res) {
    res.send('test controller');
  }
}

export default new UserController();
