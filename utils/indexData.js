let mServer = require('server.js');
let err = require('inteError.js');

let mOptions = null;
let mUrl = '';
let mUrlId = '';

function init(mOpt, sucFun){
  mOptions = mOpt;
  setUrlId(mOptions, sucFun);
}
function setUrlId(mOpti, sucFun){
  if (mOpti && mOpti.code && mOpti.code != ''){
    mUrlId = mOpti.code;
  }
  if (mOpti && mOpti.q && mOpti.q != '') {
    mUrl = decodeURIComponent(mOpti.q);
    mUrlId = getQrParam(mUrl,'code');
  }
  if (typeof sucFun == 'function') sucFun(mUrl, mUrlId);
}
function getQrParam(mStr, mName) {
  let mUrlArr = mStr.split("?");
  if (mUrlArr && mUrlArr.length > 1) {
    let mParArr = mUrlArr[1].split("&");
    let mArr;
    for (var i = 0; i < mParArr.length; i++) {
      mArr = mParArr[i].split("=");
      if (mArr != null && mArr[0] == mName) {
        return mArr[1];
      }
    }
  }
  return "";
}

function setIndUrl(sucFun) {
  if (mUrlId == ''){
    wx.showToast({ title: '没有找到相应的页面', icon: 'none', duration: 1500 });
    return;
  }
  mServer.serverReq('wx/domain', { code: mUrlId }, function (data) {
    //console.log('domain:'+JSON.stringify(data));
    mUrl = data.items.domain;
    if (data.result === 'success') {
      if (typeof sucFun == 'function') sucFun(mUrl);
    }else{
      err.inteE(data);
    }
  });
}

function getUrlId(){
  return mUrlId;
}

/////统计////////////////////////////////////
function addCodeUser(mToken) {
  mServer.serverReq('wx/addCodeUser', { code: mUrlId, token: mToken}, function (data) {
    console.log('addCodeUser:'+JSON.stringify(data));
  });
}


module.exports = {
  init: init,
  getQrParam: getQrParam,
  setIndUrl: setIndUrl,
  getUrlId: getUrlId,
  addCodeUser: addCodeUser
}