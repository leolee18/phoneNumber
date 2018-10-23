let mServer = require('server.js');
let mLogin = require('mLogin.js');

let userPhone = '';

function mUserPhone(mSend, sucFun) {
  mServer.serverReq('wx/phone/bind', mSend, function (data) {
    //console.log('phone:' + JSON.stringify(data));
    if (data.result === 'success') {
      if (typeof sucFun == 'function') sucFun(data);
    }
  });
}

function setPhone(detail, sucFun){
  if (detail.errMsg !== 'getPhoneNumber:ok') {
    return;
  }
  let mSendObj = {};
  mSendObj.token = mLogin.getToken();
  if (detail.encryptedData) mSendObj.encrpytdata = detail.encryptedData;
  if (detail.iv) mSendObj.encrpytiv = detail.iv;
  wx.login({
    success: function (res) {
      if (res.code) {
        mSendObj.code = res.code;
        mUserPhone(mSendObj, sucFun);
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  });
}



function getPhone(){
  let mPh = '';
  let userObj = mLogin.getUser();
  if (userObj && userObj.phoneNumber){
    mPh = userObj.phoneNumber;
  } else if (userPhone != ''){
    mPh = userPhone;
  }
  return mPh;
}





module.exports = {
  setPhone: setPhone,
  getPhone: getPhone
}