import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(500)
        .json({ status: 'fail', message: 'email and password are required' });
    }

    const userFound = await User.findOne({ email: email });
    console.log('userFound', userFound);

    if (!userFound)
      return res
        .status(404)
        .json({ status: 'failed', message: 'user not found' });

    const ispassWordValid = await bcrypt.compare(password, userFound.password);

    console.log('PASSWORD', ispassWordValid);

    if (!ispassWordValid)
      return res
        .status(400)
        .json({ status: 'fail', error: 'Invalid email or password' });

    const roles = Object.values(userFound.roles);

    console.log('ROLES', roles);

    const accessToken = jwt.sign(
      {
        userInfo: {
          id: userFound._id,
          email: userFound.email,
          roles: roles,
        },
      },
      process.env.ACCESS_SECRET_TOKEN,
      { expiresIn: '1h' }
    );
    const refreshToken = jwt.sign(
      {
        email: userFound.email,
      },
      process.env.REFRESH_SECRET_TOKEN,
      { expiresIn: '1d' }
    );

    console.log('access && refresh token', accessToken, refreshToken);

    userFound.refreshToken = refreshToken;
    await userFound.save();

    res.cookie('authToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      status: 'success',
      message: 'logged in successfully',
      data: { accessToken: accessToken },
    });
  } catch (error) {
    res.status(401).json({ status: 'fail', error: 'invalid credentials' });
  }
};
