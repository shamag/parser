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
     
    },
    params: {
      convId: Joi.string().hex().required()
    }
  }
};
