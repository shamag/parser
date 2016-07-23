import express from 'express';
// import validate from 'express-validation';
// import paramValidation from '../../config/param-validation';
import messageCtrl from '../controllers/message';

const router = express.Router();	// eslint-disable-line new-cap

router.route('/')
/** GET /api/users - Get list of users */
  .get(messageCtrl.list)

  /** POST /api/users - Create new user */
  .post(/* validate(paramValidation.createUser),*/ messageCtrl.create);

router.route('/:userId')
/** GET /api/users/:userId - Get user */
  .get(messageCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(messageCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(messageCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', messageCtrl.load);

export default router;
