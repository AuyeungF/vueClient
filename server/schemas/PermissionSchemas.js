var mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {
    role:String,
    permissions:String
  },
  {versionKey: false}//不添加版本号/_v字段
);
