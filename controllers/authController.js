// // const { promisify } = require('util');
// // const jwt = require('jsonwebtoken');
// // const User = require('./../models/userModel');
// // const AppError = require('./../utils/appError');
// // const catchAsync = require('./../utils/catchAsync');
// // const signToken = function(id) {
// //   return jwt.sign({ id }, process.env.JWT_SECRET);
// // };
const jwt = require('jsonwebtoken');

const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

const appError = require('./../utils/appError');

exports.signUp = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({
    status: 'sucess',
    token
  });
  next();
});
//check if user exists
//check if email and password exists
//check if email and //password is correct
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return appError('enter email and password');
  }
  const user = await User.findOne({ email }).select('+password');

  if (!email || !(await user.passwordCorrect(password, user.password))) {
    return next(new appError('login with correct email or password'));
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({
    status: 'success',
    token
  });
});

// // exports.signUp = catchAsync(async (req, res, next) => {
// //   const newuser = await User.create({
// //     name: req.body.name,
// //     email: req.body.email,
// //     password: req.body.password,
// //     passwordConfirm: req.body.passwordConfirm
// //   });
// //   const token = signToken(newuser._id);
// //   res.status(200).json({
// //     status: 'sucess',
// //     token,
// //     data: {
// //       newuser
// //     }
// //   });
// // });
// // exports.login = catchAsync(async (req, res, next) => {
// //   const { email, password } = req.body;
// //   if (!email || !password) {
// //     return next(new AppError('provide  email or password'));
// //   }

// //   const user = await User.findOne({ email }).select('+password');
// //   if (!email || !(await user.correctPassword(password, user.password))) {
// //     return next(new AppError('login with correct email or password'));
// //   }
// //   const token = signToken(user._id);
// //   res.status(200).json({
// //     status: 'success',
// //     token
// //   });
// // });
// // exports.protect = catchAsync(async (req, res, next) => {
// //   //c)'Getting the token and check if its there
// //   let token;
// //   if (
// //     req.headers.authorization &&
// //     req.headers.authorization.startsWith('Bearer')
// //   ) {
// //     token = req.headers.authorization.split(' ')[1];
// //   }

// //   //2) verifying the token the token
// //   if (!token) {
// //     return next(new AppError('you are not logged in! please login in'));
// //   }
// //   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
// //   //3) Check if the user still exists
// //   const user = await User.findById(decoded.id);
// //   if (!user) {
// //     return next(
// //       new AppError(' token does not relate to this user or it doesnot exitst')
// //     );
// //   }

// //   if (user.changesPasswordAfter(decoded.iat)) {
// //     return new AppError(' password was changed reserntly');
// //   }
// //   next();
// //   //4) check if the user change password after the token was issued
// // });
// // // const crypto = require('crypto');
// const { promisify } = require('util');
// const jwt = require('jsonwebtoken');
// const User = require('./../models/userModel');
// const catchAsync = require('./../utils/catchAsync');
// const sendEmail = require('./../utils/email');

// const AppError = require('./../utils/appError');

// const signToken = id => {
//   return jwt.sign({ id }, process.env.JWT_SECRET);
// };
// exports.signUp = catchAsync(async (req, res, next) => {
//   const newUser = await User.create({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     passwordConfirm: req.body.passwordConfirm
//   });
//   const token = signToken(newUser._id);
//   res.status(200).json({
//     status: 'success',
//     token,
//     data: {
//       user: newUser
//     }
//   });
// });
// exports.login = async (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return next(new AppError('please provide email and password!', 400));
//   }

//   //check if user exists
//   //check if email and //password is correct
//check if email and password exists
//   const user = await User.findOne({ email }).select('+password');
//   console.log(user);
//   if (!user || !(await user.correctPassword(password, user.password))) {
//     return next(new AppError('incorrect email or password', 401));
//   }
//   const token = signToken(user._id);
//   res.status(200).json({
//     status: 'success',
//     token
//   });
//   //check if email and password exists
// };
// exports.protect = catchAsync(async (req, res, next) => {
//   // 1)'Getting the token and check if its there
//2) verifying the token the token
//3) Check if the user still exists
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   }
//   if (!token) {
//     return next(new AppError('you are not logged in! please login in'));
//   }
//   console.log(token);
//   //2) verifying the token the token
//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
//   console.log('it is here');
//   //3) Check if the user still exists
//   const freshUser = await User.findById(decoded.id);
//   //4) check if the user change password after the token was issued
//   freshUser.changesPasswordAfter(decoded.iat);
//   req.user = freshUser;
//   next();
// });
// exports.restrictTo = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(new AppError('you do not have permission to peform'));
//     }
//     next();
//   };
// };
// exports.forgotPasswrod = catchAsync(async (req, res, next) => {
//   //get user based on posted email
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return next(new AppError('there is no user with this email'));
//   }
//   //generate token
//   const resetToken = user.createPasswordResetToken();
//   user.save({ validateBeforeSave: false });
//   //3)Sent it to user's email
//   const resetURL = `${req.protocol}://${req.get(
//     'host'
//   )}/api/v1/users/resetPassword/${resetToken}`;
//   const message = `Forgot your password? submit a PATCH request with your new password and passwordConfirm to : ${resetURL}.\nIf you remeber your password! please ignore the eai;!`;
//   try {
//     await sendEmail({
//       email: user.email,
//       subject: 'your password reset token is valid for 10 min',
//       message
//     });
//     res.status(200).json({
//       status: 'success',
//       message: 'Token sent to Email'
//     });
//   } catch (err) {
//     user.PasswordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save({ validateBeforeSave: false });
//     return next(
//       new AppError('There was an error sending the email. Try again Later', 500)
//     );
//   }
// });
// exports.resetPassword = catchAsync(async (req, res, next) => {
//   // // 1) Get user based on the token
//   // const hashedToken = crypto
//   //   .createHash('sha256')
//   //   .update(req.params.token)
//   //   .digest('hex');
//   // const user = await User.findOne({
//   //   passwordResetToken: hashedToken,
//   //   passwordResetExpires: {
//   //     $gt: Date.now() + 200 * 60 * 1000
//   //   }
//   // });
//   // //2( If token has not expired, and there is user, set the new password)
//   // if (!user) {
//   //   next(new AppError('token is invalid or expired'), 400);
//   // }
//   // user.password = req.body.password;
//   // user.passwordConfirm = req.body.passwordConfirm;
//   // user.passwordResetToken = undefined;
//   // user.passwordResetExpires = undefined;
//   // await user.save();
//   // //3 update changedPASSWORDAT property for user
//   // //4)Log the user in, Send JWT tok the client
//   // const token = signToken(user._id);
//   // res.status(200).json({
//   //   status: 'success',
//   //   token
//   // });
// });
