var mongoose = require('mongoose');

var roleSchema = require('../schemas/PermissionSchemas');

module.exports = mongoose.model('Role', roleSchema);
