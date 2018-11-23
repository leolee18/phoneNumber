const bgAud = wx.getBackgroundAudioManager();

let miCont = null;
let miObj= null;
let mUpCon = null;
let mDurB = true;
let mStop = false;

function init(myCon,mObj) {
  miCont = myCon;
  miObj = mObj;
  mDurB = true;
  mStop = false;

  setBgOnFun();
  setBgAuInit(mObj);
}
function setBgOnFun(){
  bgAud.onPlay(function () {
    miCont.playStates = true;
    if (typeof mUpCon == 'function') mUpCon(miCont);
  });
  bgAud.onPause(function () {
    miCont.playStates = false;
    if (typeof mUpCon == 'function') mUpCon(miCont);
  });
  bgAud.onStop(function () {
    mStop = true;
    miCont.playStates = false;
    if (typeof mUpCon == 'function') mUpCon(miCont);
  });
  bgAud.onEnded(function () {
    mStop = true;
    miCont.playStates = false;
    if (typeof mUpCon == 'function') mUpCon(miCont);
  });
  bgAud.onError(function () {
    miCont.playStates = false;
    if (typeof mUpCon == 'function') mUpCon(miCont);
  });
  bgAud.onTimeUpdate(function (e) {
    miCont.curStr = formatTim(bgAud.currentTime);
    if (mDurB){
      mDurB = false; 
      miCont.durStr = formatTim(bgAud.duration);
    }
    if (miCont.updateState) {
      let sliderValue = bgAud.currentTime / bgAud.duration * 100;
      miCont.sliderValue = sliderValue;
      if (typeof mUpCon == 'function') mUpCon(miCont);
    }
  })
}
function setBgAuInit(mObj){
  bgAud.title = mObj.title;
  bgAud.coverImgUrl = mObj.coverImgUrl;
  bgAud.src = mObj.src;

  miCont.updateState = true;
  if (typeof mUpCon == 'function') mUpCon(miCont);
}
function formatTim(mNum) {
  let myTim = parseInt(mNum);
  let sTim = myTim % 60;
  let mmTim = parseInt(myTim / 60);
  if (sTim < 10) sTim = '0' + sTim;
  if (mmTim < 10) mmTim = '0' + mmTim;

  return mmTim + ':' + sTim;
}

function setUpCont(sucFun){
  mUpCon = sucFun;
}

function setPthis(that) {
  that.mpbind = function(e){
    let mag = e.target;
    if (mag.id === 'myConP') {
      if (bgAud.src != '' && !mStop){
        bgAud.paused ? bgAud.play():bgAud.pause();
      } else if (miObj.src != ''){
        setBgAuInit(miObj);
      }
    }
  }
  that.sliderChanging = function(e){
    miCont.updateState = false;
    if (typeof mUpCon == 'function') mUpCon(miCont);
  }
  that.sliderChange = function (e) {
    bgAud.seek(e.detail.value / 100 * bgAud.duration);
    miCont.sliderValue = e.detail.value;
    miCont.updateState = true;
    if (typeof mUpCon == 'function') mUpCon(miCont);
  }
}

function pUnload(){
  bgAud.stop();
}

module.exports = {
  init: init,
  setUpCont: setUpCont,
  setPthis: setPthis,
  pUnload: pUnload
}