let mMp3 = require('../../temp/mimp3.js');
Page({
  data: {
    mCon: {
      sliderValue: 0,
      updateState: false,
      playStates: true,
      curStr:'00:00',
      durStr:'00:00',
      bgimg:'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    }
  },
  updataCon:function(data){
    this.setData({
      mCon: data
    })
  },
  onLoad: function (options) {
    let that = this;
    let myCon = that.data.mCon;

    mMp3.setPthis(that);
    mMp3.setUpCont(that.updataCon);
    mMp3.init(myCon, { 
      title: '此时此刻', 
      coverImgUrl:'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    });
    
  },
  onShow: function () {

  },
  onReady: function () {

  },
  onShareAppMessage: function () {

  }
})