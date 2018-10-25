let wifi = require('../../utils/wiFi.js');
Page({
  data: {
    mList:[]
  },
  page:{
    wfl:[]
  },
  binButn:function(e){
    let that = this;
    let mtag = e.target;
    let mWF = that.data.mList;
    console.log(mtag.id);
    console.log(mWF[mtag.id])
    wifi.setWifi(mWF[mtag.id],function(data){
      setTimeout(function(){
        that.loadDQWF();
      },1000);
    });
  },
  onLoad: function (options) {
    let that = this;
    let mWF = [
      { SSID: "LEHU-5G-2", BSSID: "e8:fc:af:f8:f7:c0", password:'lehu123go'},
      { SSID: "LEHU-5G-1", BSSID: "e8:fc:af:f8:f7:be", password: 'lehu123go' },
      { SSID: "Huuhoo 5G", BSSID: "f4:83:cd:db:ba:ea", password: 'huuhoo123go' },
      { SSID: "Huuhoo 2.4G", BSSID: "f4:83:cd:db:ba:e8", password: 'huuhoo123go' },
      { SSID: "LeHu-QA", BSSID: "8c:f2:28:6b:4c:82", password: 'lehu123go' },
      { SSID: "lehu - QA2", BSSID: "e4:f3:f5:5d:9c:de", password: 'lehu123go' },
      { SSID: "LEHU-2.4G", BSSID: "e8:fc:af:f8:f7:bf", password: 'lehu123go' }
    ]

    wifi.init(function (data) {
      that.page.wfl = wifi.getList();
      that.loadWF(mWF, that.page.wfl);
      let mWiFi = wifi.getSWifi();
    })
  },
  loadWF:function(mWF,alWF){
    let myWF = mWF.filter(function (val, ind) {
      let mBool = alWF.some(function(valc){
        return (val.SSID == valc.SSID);
      });
      return mBool;
    })
    this.setData({ mList: myWF });
    this.loadDQWF();
  },
  loadDQWF:function(){
    let myWFL = this.data.mList;
    let myWF = wifi.getSWifi();
    myWFL.forEach(function (val, ind) {
      if (val.SSID == myWF.SSID){
        val.mb = true;
      }else{
        val.mb = false;
      }
    })
    this.setData({ mList: myWFL });
  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  }
})