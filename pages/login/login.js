let mLogin = require('../../utils/mLogin.js');
let user = require('../../utils/user.js');
Page({
  getUserInfo: function (e) {
    let that = this;
    wx.showToast({ title: '请求处理中……', mask: true, icon: 'loading', duration: 10000 });
    if (e.detail !== 'getUserInfo:ok') {
      wx.hideToast();
    }
    mLogin.bGUinfo(e.detail,function(mToken){
      wx.hideToast();
      wx.reLaunch({ url: '/pages/index/index' });
    });
  }
})