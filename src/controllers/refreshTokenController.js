import User from '../models/User';
import jwt from 'jsonwebtoken';

export const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  const email = req.user;

  console.log('refersh token', req.user, cookies.authToken);

  if (!email)
    return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
  // if(!cookies?.jwt) return res.status(401).json({"status":"fail", "error":"Unauthorized"})
  // const refreshToken = cookies.jwt

  // const foundUser = await User.findOne({ refreshToken }).exec()
  const foundUser = await User.findOne({ email }).exec();
  const refreshToken = foundUser.refreshToken;

  console.log('refreshToken *18*', refreshToken);

  if (!foundUser)
    return res.status(403).json({ status: 'fail', message: 'Forbidden' });

  //evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_SECRET_TOKEN, (err, decoded) => {
    if (err || foundUser.email !== decoded.email)
      res.status(403).json({ status: 'fail', error: 'Forbidden' });
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: decoded.email,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '3600s' }
    );
    res
      .status(200)
      .json({ status: 'success', data: { accessToken: accessToken } });
  });
};
