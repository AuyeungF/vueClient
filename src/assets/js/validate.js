export const validateUsername = (rule, value, callback) => {
  if (value === '') {
    return callback(new Error('账号不能为空'));
  } else {
    callback();
  }
};

export const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {

    callback();
  }
};
