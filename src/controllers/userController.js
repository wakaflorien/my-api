import User from '../models/User';
import bcrypt from 'bcryptjs';

export const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      res.status(400).json({ status: 'fail', message: 'required fields' });
    }

    const userFind = await User.findOne({ email: email }).exec();
    if (userFind)
      return res
        .status(409)
        .json({ status: 'fail', message: 'User already exists' });

    const hashedPwd = await bcrypt.hash(password, 10);

    const result = await User.create({
      email: email,
      password: hashedPwd,
      firstname: firstname,
      lastname: lastname,
    });

    console.log(result);

    res
      .status(201)
      .json({ status: 'success', data: { User: `${email} created` } });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!req.user)
      return res
        .status(400)
        .json({ status: 'fail', error: 'no logged in user' });
    const user = await User.findOne({ email: req.user });

    if (!user)
      return res
        .status(404)
        .json({ status: 'fail', error: 'no user match found' });

    if (!firstname || !lastname || !email || !password) {
      res.status(400).json({ status: 'fail', message: 'required fields' });
    }
    const hashedPwd = await bcrypt.hash(password, 10);

    if (req.user) user.email = req.user;
    if (password) user.password = hashedPwd;
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;

    const result = await user.save();
    console.log(result);

    res
      .status(200)
      .json({ status: 'success', message: 'user updated', data: result });

    res
      .status(201)
      .json({ status: 'success', data: { User: `${email} created` } });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
};
