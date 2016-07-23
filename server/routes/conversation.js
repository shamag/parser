import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import convCtrl from '../controllers/conversation';

const router = express.Router();	// eslint-disable-line new-cap

router.route('/')
/** GET /api/users - Get list of users */
  .get(convCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), convCtrl.create);

router.route('/:convId')
/** GET /api/users/:userId - Get user */
  .get(convCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateUser), convCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(convCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('convId', convCtrl.load);

export default router;
