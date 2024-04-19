const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A User must have a name'],
    unique: true,
    trim: true,
    maxlength: [20, 'A Username must have less or equal then 20 characters'],
    minlength: [3, 'A  Username must have more or equal then 5 characters']
    // validate: [validator.isAlpha, 'Tour name must only contain characters']
  },
  email: {
    type: String,
    required: [true, 'please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide a valid email']
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'admin'
  },
  password: {
    type: String,
    required: [true, 'provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please confirm your password'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'passwords do not match'
    }
    // validate: {
    //   validator: function(el) {
    //     return el === this.passwordConfirm;
    //   },
    //   message: 'passwords do not match'
    // }
    // // // // validate: {
    // // // //   validator: function(el) {
    // // // //     return el === this.password;
    // // // //   },
    // // // //   message: 'password not confirmed'
    // // // // }
  }
  // passwordChangedAt: Date,
  // // passwordResetToken: String, // Corrected casing
  // // passwordResetExpires: Date, // Corrected casing
  // // active: {
  // //   type: Boolean,
  // //   default: true,
  // //   select: false
  // // }
  // active: {
  //   type: Boolean,
  //   default: true,
  //   select: false
  // }
});
userSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.passwordCorrect = function(candidatePassword, userPassword) {
  return bcrypt.compare(candidatePassword, userPassword);
};
// userSchema.pre('save', async function(next) {
//   (this.password = await bcrypt.hash(this.password, 12)),
//     (this.passwordConfirm = undefined),
//     next();
// });
// userSchema.methods.correctPassword = async function(
//   candidatePassword,
//   userPassword
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };
// userSchema.methods.changesPasswordAfter = function(JWTTimestamp) {
//   if (this.passwordChangedAt) {
//     const gettime = parseInt(this.passwordChangedAt.gettime() / 1000, 10);

//     return JWTTimestamp < gettime;
//   }
//   return false;
// };
/*
// instance is available on all documents
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
*/
// userSchema.methods.changesPasswordAfter = async function(JWTTimestamp) {
//   if (this.passwordChangedAt) {
//     const changedTimesStamp = parseInt(
//       this.passwordChangedAt.getTime() / 1000,
//       10
//     );
//     console.log(this.passwordChangedAt, JWTTimestamp);
//     return JWTTimestamp < changedTimesStamp;
//   }

//   return false;
// };

// // userSchema.methods.createPasswordResetToken = function() {
// //   const resetToken = crypto.randomBytes(32).toString('hex');
// //   this.passwordResetToken = crypto // Corrected casing
// //     .createHash('sha256')
// //     .update(resetToken)
// //     .digest('hex');
// //   this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Corrected casing
// //   console.log(resetToken, this.passwordResetToken);
// //   return resetToken;
// // };

const User = mongoose.model('User', userSchema);

module.exports = User;
