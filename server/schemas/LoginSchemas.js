var mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {
    username: String,//用户名称
    password: String,//用户密码
    roles:Object
  },
  {versionKey: false}//不添加版本号/_v字段
 );
