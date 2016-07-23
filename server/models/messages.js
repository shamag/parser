import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * User Schema
 */
const MessageSchema = new mongoose.Schema({
  _conv: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String,
    default: '',
    required: true
  },
  author: {
    type: String,
    default: '',
    required: true
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

MessageSchema.pre('save', function (next) {
  // get the current date
  const currentDate = new Date();
  // change the updated_at field to current date
  this.updated_at = currentDate;
  next();
});

/**
 * Methods
 */
MessageSchema.method({});

/**
 * Statics
 */
MessageSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .execAsync().then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .execAsync();
  }
};

/**
 * @typedef User
 */
export default mongoose.model('Message', MessageSchema);
