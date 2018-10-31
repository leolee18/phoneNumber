function serverReq(mUrl,mData,sucFun,errFun) {
    wx.request({
      url: serAdd(mUrl),
      data: mData,
      header: {
        "content-type": "application/json"
      },
      method:"POST",
      success: function(res) {
        if (typeof sucFun == 'function') sucFun(res.data);
      },
      fail:function(res){
        if (typeof errFun == 'function'){
          errFun(res.data);
        }else{
          wx.showToast({ title:'网络错误，请稍后重试', icon: 'none', duration: 1500 });
        }
      }
    });
}
function getNetType(){
  wx.getNetworkType({
    success: function (res) {
      if (res.networkType == 'none') {
        wx.showModal({ title: '温馨提示', content: '网络错误，请稍后重试', showCancel: false });
      }
    }
  });
}
function serAdd(addres){
  var serInter = 'https://wxappmarket.familyktv.com/';
	
  var kc = 'market/';
	var returnStr = serInter;
	switch (addres){
    case 'wx/login':
    case 'wx/domain':
    case 'wx/addCodeUser':
			returnStr = serInter+kc+addres;
			break;
      break;  		
		case 'local':
      returnStr = 'http://wxappmarket.familyktv.com/';
			break;	
		default:
			returnStr = serInter;
			break;
	}
	return returnStr;
}
function serUrl(url){
	var myUrl = "";
	if(url != null && url != undefined){
		myUrl = url;
	}
	if(myUrl.length > 5){
		var myType = url.substr(0,5);
    if (myType != "http:" && myType != "wxfil" && myType != "https"){
			myUrl = serAdd('local') + myUrl;
		}
	}
	return myUrl;
}
module.exports = {
  serverReq:serverReq,
  serAdd:serAdd,
	serUrl:serUrl,
  getNetType:getNetType
}