const bgAud = wx.getBackgroundAudioManager()
Page({
  data: {
    mCon: {
      sliderValue: 0,
      updateState: false,
      playStates: true
    }
  },
  mpbind:function(e){
    let mag = e.target;
    if (mag.id === 'myConP'){
      this.data.mCon.playStates ? bgAud.pause() : bgAud.play();
    }
    
  },
  sliderChanging(e) {
    let myCon = this.data.mCon;
    myCon.updateState = false;
    this.setData({
      mCon: myCon
    })
  },
  sliderChange(e) {
    let myCon = this.data.mCon;
    bgAud.seek(e.detail.value / 100 * bgAud.duration);
    myCon.sliderValue = e.detail.value;
    myCon.updateState = true;
    this.setData({
      mCon: myCon
      })
  },
  onLoad: function (options) {
    let that = this;
    let myCon = that.data.mCon;

    bgAud.title = '此时此刻';
    bgAud.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000';
    bgAud.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46';
    myCon.updateState = true;
    this.setData({
      mCon: myCon

    })
    bgAud.onPlay(function(){
      myCon.playStates = true;
      that.setData({
        mCon: myCon
      })
    });
    bgAud.onPause(function () {
      myCon.playStates = false;
      that.setData({
        mCon: myCon
      })
    });
    bgAud.onTimeUpdate(function(e){
      console.log(bgAud.currentTime)
      console.log(bgAud.duration)
      if (myCon.updateState){
        let sliderValue = bgAud.currentTime / bgAud.duration * 100;
        myCon.sliderValue = sliderValue;
        that.setData({
          mCon: myCon
        })
      }
    })
  },
  onShow: function () {

  },
  onReady: function () {
    this.setData({
      mCon: { updateState: true}
      
    })
  },
  onShareAppMessage: function () {

  }
})