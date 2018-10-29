let mLogin = require('utils/mLogin.js');
let user = require('utils/user.js');
App({
  onLaunch: function (Object) {
    mLogin.getUserInfo(function (mToken) {
      //console.log('mToken::' + mToken);
      //console.log('uObj:' + JSON.stringify(mLogin.getUser()))
    });
  }
})