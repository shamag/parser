import Conversation from '../models/conversation';

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  Conversation.get(id).then((conv) => {
    req.conv = conv;		// eslint-disable-line no-param-reassign
    return next();
  }).error((e) => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.conv);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  Conversation.findOne({projectId: req.body.projectId}).execAsync().then(function(exConv){
    if (!exConv){
      const conv = new Conversation({
        profile: req.body.profile,
        author: req.body.author,
        projectId: req.body.projectId,
        projectName: req.body.projectName
        //lastAnswer: false
      });

      conv.saveAsync()
        .then((savedUser) => res.json(savedUser))
        .error((e) => next(e));
    } else {
        exConv.profile = req.body.profile;
        exConv.author = req.body.author;
        exConv.projectName = req.body.projectName;
        exConv.lastAnswer = false;

      exConv.saveAsync()
        .then((savedUser) => res.json(savedUser))
        .error((e) => next(e));
    }


  });

}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const conv = req.conv;
  //console.log(req);
  if (req.body.profile)
  conv.profile = req.body.profile;
  if (req.body.author)
  conv.author = req.body.author;
  if (req.body.projectId)
  conv.projectId = req.body.projectId;
  if (req.body.projectName)
  conv.projectName = req.body.projectName;
  if (req.body.lastAnswer!==undefined)
    conv.lastAnswer = req.body.lastAnswer;
  if (req.body.lastMessage)
    conv.lastMessage = new Date().setTime(req.body.lastMessage);
  if (req.body.notes!==undefined){
    conv.notes = req.body.notes;}
  else{}

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
  Conversation.list({ limit, skip }).then((convs) =>	res.json(convs))
    .error((e) => next(e));
}
function listAll(req, res, next) {
  const { limit = 200, skip = 0 } = req.query;
  Conversation.listAll({ limit, skip }).then((convs) =>	res.json(convs))
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

export default { load, get, listAll, create, update, list, remove };
