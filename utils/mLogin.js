let mServer = require('server.js');

let mToken = '';
let mUser = null;
let pageLogin = true;
let userFunt = [];
let shareId = '';
let userId = '';

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
      userId = data.items.userId;
      try {
        wx.setStorageSync('userToken', mToken);
      } catch (e) { }
      try {
        wx.setStorageSync('userId', userId);
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
    return;
  } else {
    let uInfo = wx.getStorageSync('userInfo');
    if (uInfo) {
      mUser = JSON.parse(uInfo);;
      if (typeof sucFun == 'function') sucFun(mToken);
      return;
    }
  }
  mServer.serverReq('user/get', { token: mToken }, function (data) {
    //console.log('getUser:' +JSON.stringify(data));
    if (data.result === 'success' && data.items.authedFlag == '1') {
      mUser = data.items;
      try {
        wx.setStorageSync('userInfo', JSON.stringify(mUser));
      } catch (e) {}
      if (typeof sucFun == 'function') sucFun(mToken);
    } else {
      console.log('重新授权');
      if (typeof sucFun == 'function') sucFun(mToken);
      
      if (getCurrentPages().length >= 1){
        let mCur = getCurrentPages()[(getCurrentPages().length - 1)];
        if (mCur.route !== 'pages/login/login' && pageLogin){
          pageLogin = false;
          wx.reLaunch({ url: '/pages/login/login' });
        }
      }
    }
  });
}

//用户主动触发登录
function bGUinfo(detail, sucFun) {
  if (detail.errMsg !== 'getUserInfo:ok'){
    return;
  }
  let mInfo = detail.userInfo;
  mUser = {
    nickName: mInfo.nickName,
    gender: mInfo.gender,
    city: mInfo.city,
    avatarUrl: mInfo.avatarUrl
  }
  try {
    wx.setStorageSync('userInfo', JSON.stringify(mUser));
  } catch (error) {}

  let mSendObj = {};
  mSendObj.recommenderId = shareId;
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
  let myUser = { aut:false, nickName: '匿名', avatarUrl: '../../imgs/mrtx.png', city: '未知', gender: '0' };
  if (mUser){
    myUser = JSON.parse(JSON.stringify(mUser));
    myUser.aut = true;
    if (!myUser.nickName || myUser.nickName == '') {
      myUser.nickName = '匿名';
    }
    if (!myUser.avatarUrl || myUser.avatarUrl == '') {
      myUser.avatarUrl = '../../imgs/mrtx.png';
    }
  }
  return myUser;
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
////////////////////////////////////////////////////////////
function setShareid(mId){
  shareId = mId;
}
function getUserId() {
  let mId = '';
  if (userId) {
    mId = userId;
  }else{
    let value = wx.getStorageSync('userId');
    if (value) {
      mId = value;
    }
  }
  return mId;
}

module.exports = {
  mLogin: mLogin,
  getToken: getToken,
  setToken: setToken,
  getUser: getUser,
  bGUinfo: bGUinfo,
  getUserInfo: getUserInfo,
  setShareid: setShareid,
  getUserId: getUserId
}