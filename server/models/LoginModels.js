var mongoose = require('mongoose');

var userSchema = require('../schemas/LoginSchemas');

module.exports = mongoose.model('User', userSchema);
