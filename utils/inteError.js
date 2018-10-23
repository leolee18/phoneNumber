
function inteE(mCode){
  switch (mCode.resultCode){
    case 102:
      wx.showToast({ title: '聊天室密码错误', icon:'none', duration: 1500 });
      break; 
    default:
      wx.showToast({ title: mCode.returnMsg, icon: 'none', duration: 1500 });
      break;      
  }
}


module.exports = {
  inteE: inteE
}