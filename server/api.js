'use scrit'

const express = require('express')

const router = express.Router();


//引入login的model模块
var User = require('./models/LoginModels');
//引入权限的model模块
var Role = require('./models/PermissionModels');

  //统一返回的数据信息格式
var responseData;
var jsonData;

router.use(function (req, res, next) {

    //自定义格式
    responseData = {
        code: 0,//错误代码
        message: '',//错误提示信息
        name: ''
    };
    //自定义List
    jsonData = {
      code:0,
      data:{},
      message:'',
      total:0,
      currentPage:0,
    };


    next();//向下传递

});

//创建账号接口
router.post('/api/createAccount', (req, res, next) => {

// 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
	//3.接收数据
    var username = req.body.username;
    var password = req.body.password;
 //处理用户注册
 User.findOne({
        username: username
    }).then((data) => {
        //先判断是否存在该用户
        if (data) {
            //数据库存在该用户名
            responseData.code = 1;
            responseData.message = '该用户名已注册';
            res.json(responseData);
            return;
        }
      var user;
      var role;
       //向数据库写入用户注册数据
        if(username === 'admin') {
           user = new User({
            username: username,
            password: password,
          });
           role = new Role({
             role:'admin',
             permissions:'超级管理员'
           })
        } else {
          user = new User({
            username: username,
            password: password,
          });
          role = new Role({
            role:username,
            permissions:'管理员'
          })
        }

        return user.save() && role.save();

    }).then((newUserInfo) => {
        if (newUserInfo != undefined) {
            responseData.code = 2;
            responseData.message = '注册成功!';
            responseData.name = username;
            res.json(responseData);
            return ;
        }

    });

});
//登录
router.post('/api/login',(req,res,next)=>{
  var username = req.body.username;
  var password = req.body.password;

  //查询用户
  User.findOne({
    username: username
  }).then((data)=>{
    if(data !== null) {
      if(data.password == password) {
        responseData.code = 3;
        responseData.message = '登录成功现在为你跳转.......';
        responseData.name = data.username;
        res.json(responseData);
        return;
      } else {
        responseData.code = 5;
        responseData.message = '请输入正确密码';
        res.json(responseData);
        return;
      }
    } else {
      responseData.code = 4;
      responseData.message = '用户名不存在';
      res.json(responseData);
      return;
    }
  })
});
//获取对应的用户信息
router.post('/api/LoginUserInfo',(req,res,next)=>{
  var username = req.body.username;

  Role.findOne({
    role:username
  }).then((data) => {
   if(data !== null){
     jsonData.data = data;
     jsonData.code = 200;
     jsonData.message = "success";
     res.json(jsonData);
     return;
   }
  })
});
//获取所有用户信息
router.get('/api/getLoginUserAll',(req,res,next) => {
  Role.find({
  }).then(data=>{

    //当前页,前端用户通过get传递过来的页数，或没有传递时默认当前页数为1
    if(data !== null) {
        Role.find({}).limit(10).then(resData=>{
          jsonData.data=resData;
          jsonData.code = 200;
          jsonData.message = 'success';
          jsonData.total = data.length;
          jsonData.currentPage = 1;
          res.json(jsonData);
          return;
        });
    }
  })
});
//获取用户信息分页处理
router.post('/api/getLoginUser/page',(req,res,next)=>{
  var page = req.body.currentPage;
  let skip = (page-1)*10;
  Role.find({}).skip(skip).limit(10).then(data=>{
    if(data !== null) {
      if(skip == 0) {
        skip = 1;
      }
      jsonData.data=data;
      jsonData.code = 200;
      jsonData.message = 'success';
      jsonData.total = skip + data.length;
      jsonData.currentPage = page;
      res.json(jsonData);
      return;
    }
  })


});
//修改用户信息
router.post('/api/editUser/:id',(req,res,next)=>{
    let userInfo ={};
    userInfo.role = req.body.role;
    userInfo.permissions = req.body.permissions;
    Role.updateOne({_id:req.params.id},{$set:userInfo},{new:true})
      .then( data => {
        let json = {};
        json.message="success";
        json.code=200;
        res.json(json);
        return;

      });
});
//删除用户信息
router.delete('/api/delUser/:id',(req,res,next) => {
    Role.deleteOne({_id:req.params.id}).then(data=>{
      res.json(data);
      return;
    })
});


module.exports = router
