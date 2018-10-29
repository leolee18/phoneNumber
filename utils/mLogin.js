let mServer = require('server.js');

let mToken = '';
let mUser = null;
let pageLogin = true;
let userFunt = [];

function mLogin(sucFun) {
  wx.checkSession({
    success: function () {
      let value = wx.getStorageSync('userToken');
      if (value) {
        mToken = value;
        mUserToken(mToken, sucFun);
      } else {
        loginCode(sucFun);
      }
    },
    fail: function () {
      loginCode(sucFun);
    }
  })
}
function loginCode(sucFun) {
  wx.login({
    success: function (res) {
      if (res.code) {
        let mSendObj = { code: res.code};
        mUserCode(mSendObj, sucFun);
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  });
}
function mUserCode(mSend, sucFun) {
  mServer.serverReq('wx/login', mSend, function (data) {
    //console.log('login:'+JSON.stringify(data));
    if (data.result === 'success') {
      mToken = data.items.token;
      try {
        wx.setStorageSync('userToken', mToken);
      } catch (e) { }
      mUserToken(mToken, function (mToken){
        if (typeof sucFun == 'function') sucFun(mToken);
      });
    }
  });
}
function mUserToken(mToken, sucFun) {
  if (mUser){
    if (typeof sucFun == 'function') sucFun(mToken);
    pageJump();
    return;
  }
  mServer.serverReq('wx/login', { token: mToken }, function (data) {
    //console.log('getUser:' +JSON.stringify(data));
    if (data.result === 'success') {
      mUser = data.items;
      if (typeof sucFun == 'function') sucFun(mToken);
      pageJump();
    } else {
      console.log('重新授权');
      if (typeof sucFun == 'function') loginCode(sucFun);
    }
  });
}
function pageJump(){
  if (!mUser.mobileChecked) {
    if (getCurrentPages().length >= 1) {
      let mCur = getCurrentPages()[(getCurrentPages().length - 1)];
      if (mCur.route !== 'pages/login/logph' && pageLogin) {
        pageLogin = false;
        wx.navigateTo({ url: '/pages/login/logph' });
      }
    }
  } else if (!mUser.userChecked) {
    if (getCurrentPages().length >= 1) {
      let mCur = getCurrentPages()[(getCurrentPages().length - 1)];
      if (mCur.route !== 'pages/login/login' && pageLogin) {
        pageLogin = false;
        wx.navigateTo({ url: '/pages/login/login' });
      }
    }
  }
}

//用户主动触发登录
function bGUinfo(detail, sucFun) {
  if (detail.errMsg !== 'getUserInfo:ok'){
    return;
  }
  let mInfo = detail.userInfo;
  
  let mSendObj = {};
  if (detail.encryptedData) mSendObj.encrpytdata = detail.encryptedData;
  if (detail.iv) mSendObj.encrpytiv = detail.iv;
  wx.login({
    success: function (res) {
      if (res.code) {
        mSendObj.code = res.code;
        mUserCode(mSendObj, sucFun);
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  });
}


function getToken() {
  return mToken;
}
function setToken(mTo) {
  mToken = mTo;
}
function getUser() {
  return mUser;
}

////////////////////////////////////////////////////////
function getUserInfo(infoFun) {
  let that = this;
  userFunt.push(infoFun);
  if (userFunt.length > 1) {
    return;
  }

  if (mToken != '') {
    let mLeng = userFunt.length;
    mUserToken(mToken, function (mToken) {
      for (let i = 0; i < mLeng; i++) {
        let nCb = userFunt.shift();
        typeof nCb == "function" && nCb(mToken);
      }
    });
  } else {
    mLogin(function (mToken) {
      let mLeng = userFunt.length;
      for (let i = 0; i < mLeng; i++) {
        let nCb = userFunt.shift();
        typeof nCb == "function" && nCb(mToken);
      }
    })
  }
}


module.exports = {
  mLogin: mLogin,
  getToken: getToken,
  setToken: setToken,
  getUser: getUser,
  bGUinfo: bGUinfo,
  getUserInfo: getUserInfo
}