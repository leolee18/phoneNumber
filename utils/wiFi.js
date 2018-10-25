

let wifiList = [];
let wifi = null;


function init(sucFun){
  wx.startWifi({
    success(res) {
      //console.log(res.errMsg)
    }
  })
  onGetWiFi(sucFun);
  onWifiCon();
  initWifi();
}
function onGetWiFi(sucFun){
  wx.onGetWifiList(function (res) {
    if (res.wifiList.length) {
      wifiList = res.wifiList;
    }
    if (typeof sucFun == 'function') sucFun(wifiList);
  })
  wx.getWifiList();
}
function onWifiCon(){
  wx.onWifiConnected(function (res) {
    if (res.wifi) {
      wifi = res.wifi;
    }
  })
}
function initWifi(){
  wx.getConnectedWifi({
    success(res) {
      if (res.wifi) {
        wifi = res.wifi;
        if (typeof sucFun == 'function') sucFun(wifi);
      }
    }
  })
}


function setWifi(mObj,sucFun){
  if (wifi.BSSID == mObj.BSSID)return;
  wx.connectWifi({
    SSID: mObj.SSID,
    BSSID: mObj.BSSID,
    password: mObj.password,
    success(res) {
      //console.log(res.errMsg);
      if (typeof sucFun == 'function') sucFun(wifi);
      wx.showToast({ title: '成功上网', icon: 'none', duration: 1500 });
    },
    fail(res){
      wx.showToast({ title: '链接失败', icon: 'none', duration: 1500 });
      //console.log(res);
    }
  })
}



function getSWifi(){
  return wifi;
}
function getList() {
  return wifiList;
}

module.exports = {
  init: init,
  getSWifi: getSWifi,
  getList: getList,
  setWifi: setWifi
}


