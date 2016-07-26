import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
/**
 * User Schema
 */
const ConversationSchema = new mongoose.Schema({
  profile: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default:'',
  },
  type: {
    type: String,
    enum: ['pm', 'project'],
    default: 'project',
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
  },
  projectId: {
    type: String,
    required: true,
    unique: true
  },
  projectName: {
    type: String,
    required: true
  },
  lastMessage: {
    type: Date,
    default: Date.now
  },
  messageCount: {
    type: Number,
    default: 0,
  },
  lastAnswer: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String, default: ''
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

ConversationSchema.pre('save', function (next) {
  // get the current date
  const currentDate = new Date();
  // change the updated_at field to current date
  this.updatedAt = currentDate;
  next();
});

/**
 * Methods
 */
ConversationSchema.method({});

/**
 * Statics
 */
ConversationSchema.statics = {
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

  findByProject(id) {
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
    return this.find({lastAnswer: true})
      .sort({ lastMessage: -1 })
      .skip(skip)
      .limit(limit)
      .execAsync();
  },
  listAll({ skip = 0, limit = 200 } = {}) {
    return this.find()
      .sort({ lastMessage: -1 })
      .skip(skip)
      .limit(limit)
      .execAsync();
  }
};

/**
 * @typedef Conversation
 */
export default mongoose.model('Conversation', ConversationSchema);
