const User = require('../models/user');
const CustomError = require('../models/customError');

const changeProfileByID = async (req, res, next) => {
  const { imageLink } = req.body;
  User.findOneAndUpdate(
    {
      id: req.params.id,
    },

    {
      imageLink: imageLink,
    },
    {
      new: true,
    },
    (err, user) => {
      if (!user) res.send('User Not Found');
      else res.send('User Updated');
    }
  );
};
const updateUserByID = async (req, res, next) => {
  const { userName, email, city } = req.body;
  User.findOneAndUpdate(
    {
      id: req.params.id,
    },

    {
      userName: userName,
      email: email,
      city: city,
    },
    {
      new: true,
    },
    (err, user) => {
      if (!user) res.send('User Not Found');
      else res.send('User Updated');
    }
  );
};

const deleteUserByID = async (req, res, next) => {
  User.findOneAndDelete(
    {
      id: req.params.id,
    },
    function (err, user) {
      if (err || !user) {
        next(new CustomError(404, 'User not Found'));
        return;
      }

      res.send('User is successfully Deleted');
    }
  );
};

const getAllUsers = async (req, res, next) => {
  res.send(
    await User.find({
      userName: { $regex: req.query.name_like, $options: 'i' },
    })
  );
};

const getUserDetailsByID = async (req, res, next) => {
  res.send(await User.find({ id: req.params.id }));
};

const register = async (req, res, next) => {
  // TODO: Validate req body data.
  const { userName, email, city, imageLink } = req.body;
  const existentUser = await User.findOne({ email }).catch(() => {
    return next(CustomError(500, 'internal error'));
  });
  if (existentUser) {
    next(new CustomError(400, 'email already exists'));
    return;
  }
  const user = new User({ userName, email, city, imageLink });
  await user.save();
  res.send('user added successfully');
};

module.exports = {
  register,

  getAllUsers,
  getUserDetailsByID,
  deleteUserByID,
  updateUserByID,
  changeProfileByID,
};
