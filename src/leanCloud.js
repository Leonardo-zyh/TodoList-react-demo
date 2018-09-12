
import AV from 'leancloud-storage'
var APP_ID = '1tQJosYf47DrGlSBzUF0hkRm-gzGzoHsz';
var APP_KEY = '5zJnoxUAoJD4DV1K28et83WV';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV

export function signUp(username,password,successFn,errorFn){
  // 新建 AVUser 对象实例
  var user = new AV.User();
  // 设置用户名
  user.setUsername(username);
  // 设置密码
  user.setPassword(password);
  // 设置邮箱
  user.signUp().then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null,user)    
  }, function (error) {
    errorFn.call(null,error)
  });
  return undefined
}

export function signIn(username,password,successFn,errorFn){
  AV.User.logIn(username, password).then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser);
    successFn.call(null,user)
  }, function (error) {
    errorFn.call(null,error)
  });
}

export function getCurrentuser(){
  let user = AV.User.current()
  if(user){
    return getUserFromAVUser(user)
  }else{
    return null
  }
}

export function signOut(){
  AV.User.logOut()
  return undefined
}


function getUserFromAVUser(AVUser){
  return{
    id:AVUser.id,
    ...AVUser.attributes  //把 AVUser.attributes 的属性拷贝到这个对象
    
  }
}



/*var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
  //words: 'Hello World!'
}).then(function(object) {
  //alert('LeanCloud Rocks!');
})*/