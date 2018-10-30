let indDa = require('../../utils/indexData.js');
let mLogin = require('../../utils/mLogin.js');
Page({
  data: {
    weburl:'https://kids.familyktv.com/cccyj.html'
  },
  onLoad: function (options) {
    let that = this;
    wx.showToast({ title: '请求处理中……', mask: true, icon: 'loading', duration: 10000 });
    indDa.init(options,function(mUrl,mUrlId){
      wx.hideToast();
      if (mUrl != ''){
        that.setData({ weburl: mUrl});
      } else if (mUrlId != ''){
        indDa.setIndUrl(function (data) {
          that.setData({ weburl: data });
        })
      }
    });
  },
  onShareAppMessage: function () {
    return {
      title: '全民扫码通',
      desc: '全民扫码通',
      path: 'pages/index/index?code=' + indDa.getUrlId()
    }
  }
})
