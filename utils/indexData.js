let mServer = require('server.js');
let err = require('inteError.js');

let indSwi = [];

//缓存轮播列表
function setIndSwi(sucFun) {
  mServer.serverReq('slideshow/list', {}, function (data) {
    //console.log('listSwi:'+JSON.stringify(data));
    if (data.result === 'success') {
      indSwi = data.items;
      try {
        wx.setStorageSync('myIndSwi', JSON.stringify(indSwi));
      } catch (e) { }
      if (typeof sucFun == 'function') sucFun(indSwi);
    }else{
      err.inteE(data);
    }
  });
}


module.exports = {
  setIndSwi: setIndSwi
}