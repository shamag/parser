import Message from '../models/messages';

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  Message.get(id).then((mes) => {
    req.mes = mes;		// eslint-disable-line no-param-reassign
    return next();
  }).error((e) => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.mes);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  const mes = new Message({
    message: req.body.message,
    author: req.body.author,
    _conv: req.body._conv,
  });

  mes.saveAsync()
    .then((savedUser) => res.json(savedUser))
    .error((e) => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const conv = req.conv;
  conv.profile = req.body.profile;
  conv.author = req.body.author;
  conv.projectId = req.body.projectId;
  conv.projectName = req.body.projectName;
  conv.saveAsync()
    .then((savedUser) => res.json(savedUser))
    .error((e) => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Message.list({ limit, skip }).then((convs) =>	res.json(convs))
    .error((e) => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const conv = req.conv;
  conv.removeAsync()
    .then((deletedUser) => res.json(deletedUser))
    .error((e) => next(e));
}

export default { load, get, create, update, list, remove };
