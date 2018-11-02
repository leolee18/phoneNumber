let indDa = require('../../utils/indexData.js');
let mLogin = require('../../utils/mLogin.js');
Page({
  data: {
    weburl:'https://kids.familyktv.com/cccyj.html'
  },
  onLoad: function (options) {
    let that = this;

    if (indDa.getUrl() != '') {
      that.setData({ weburl: indDa.getUrl() });
    } else if (indDa.getUrlId() != '') {
      indDa.setIndUrl(function (data) {
        that.setData({ weburl: data });
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: '全民扫码通',
      desc: '全民扫码通',
      path: 'pages/index/index?code=' + indDa.getUrlId()
    }
  }
})
