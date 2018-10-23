let user = require('../../utils/user.js');
Page({
  getphonenumber: function (e) {
    let that = this;
    wx.showToast({ title: '请求处理中……', mask: true, icon: 'loading', duration: 10000 });
    user.setPhone(e.detail, function (data) {
      wx.hideToast();
      wx.switchTab({ url: '/pages/index/index' });
    });
  }
})