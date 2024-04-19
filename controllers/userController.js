const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const appError = require('./../utils/appError');
const AppError = require('./../utils/appError');
// const filterObj = (obj, ...allowedFields) => {
//   const newObj = {};
//   Object.keys(obj).forEach(el => {
//     if (allowedFields.includes(el)) newObj[el] = obj[el];
//   });
//   return newObj;
// };
// //User updating his own data
// exports.updateMe = catchAsync(async (req, res, next) => {
//   //create error if user Posts password data
//   if (req.body.password || req.body.passwordConfirm) {
//     return next(
//       new AppError(
//         'this route is not for password update.Please use password update route',
//         400
//       )
//     );
//   }
//   //Update user DOCUMENT
//   //Filtered out field names that are not allowed to be updated
//   const filteredBody = filterObj(req.body, 'name', 'email');
//   const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
//     new: true,
//     runValidators: true
//   });
//   res.status(200).json({
//     status: 'success',
//     data: {
//       user: updatedUser
//     }
//   });
//});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(500).json({
    status: 'success',
    data: {
      users
    }
  });
});
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null
  });
});
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
