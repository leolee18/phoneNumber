let user = require('../../utils/user.js'); 
let indDa = require('../../utils/indexData.js');
let mLogin = require('../../utils/mLogin.js');
Page({
  onLoad: function (options) {
    let that = this;
    wx.showToast({ title: '请求处理中……', mask: true, icon: 'loading', duration: 10000 });
    indDa.init(options, function (mUrl, mUrlId) {
      wx.hideToast();
      mLogin.getUserInfo(function (mToken) {
        indDa.addCodeUser(mToken);
      });
    });
  },
  getphonenumber: function (e) {
    let that = this;

    wx.showToast({ title: '请求处理中……', mask: true, icon: 'loading', duration: 10000 });
    if (e.detail.errMsg !== 'getPhoneNumber:ok') {
      wx.hideToast();
      wx.showModal({ title: '授权访问', content: '请授权，再访问页面！', showCancel: false });
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
  },
  onShow: function () {
    let that = this;
    let myUser = mLogin.getUser();
    if (myUser && myUser.mobileChecked){
      wx.reLaunch({
        url: '/pages/index/index',
        fail: function () {
          setTimeout(function () {
            wx.reLaunch({ url: '/pages/index/index' });
          }, 100)
        }});
    }
  }
})