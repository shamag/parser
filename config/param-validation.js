import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      profile: Joi.string().required(),
      author: Joi.string().required(),
      projectId: Joi.string().required(),
      projectName: Joi.string().required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  }
};
