const express = require('express');
const userRouter = require('./user');
const {
  getAllUsers,
  getUserDetailsByID,
  deleteUserByID,
  updateUserByID,
  changeProfileByID,
} = require('../controllers/userController');

const apiRouter = express.Router();

apiRouter.use('/user', userRouter);
apiRouter.get('/users', getAllUsers);
apiRouter.get('/users/:id', getUserDetailsByID);
apiRouter.put('/users/:id', updateUserByID);
apiRouter.patch('/users/:id/changeProfile', changeProfileByID);
apiRouter.delete('/users/:id', deleteUserByID);

module.exports = apiRouter;
