let user = require('../../utils/user.js');
let mLogin = require('../../utils/mLogin.js');
Page({
  onLoad: function (options) {
    
  },
  getphonenumber: function (e) {
    let that = this;
    wx.showToast({ title: '请求处理中……', mask: true, icon: 'loading', duration: 10000 });
    if (e.detail !== 'getUserInfo:ok') {
      wx.hideToast();
    }
    user.setPhone(e.detail, function (data) {
      wx.hideToast();
      let myUser = mLogin.getUser();
      if (!myUser || !myUser.userChecked) {
        wx.redirectTo({ url: 'login' });
      }else{
        wx.reLaunch({ url: '/pages/index/index' });
      }
    });
  }
})