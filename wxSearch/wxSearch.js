// 定义数据格式
var util = require("../utils/util.js");
var net = require("../utils/net.js");

/***
 * 
 * "wxSearchData":{
 *  configconfig:{
 *    style: "wxSearchNormal"
 *  },
 *  view:{
 *    hidden: true,
 *    searchbarHeght: 20
 *  }
 *  keys:[],//自定义热门搜索
 *  his:[]//历史搜索关键字
 *  value
 * }
 * 
 * 
 */

var queryList = [];
var view = {isShow: false}
var temData = { view : {isShow: false}};

function init(that){
  that.setData({
    wxSearchData: { view: { isShow: true } }
  });
}


// function init(that, barHeight, keys, isShowKey, isShowHis, callBack) {
//     var temData = {};
//     var view = {
//         barHeight: barHeight,
//         isShow: false
//     }
    
//     if(typeof(isShowKey) == 'undefined'){
//         view.isShowSearchKey = true;
//     }else{
//         view.isShowSearchKey = isShowKey;
//     }

//     if(typeof(isShowHis) == 'undefined'){
//         view.isShowSearchHistory = true;
//     }else{
//         view.isShowSearchHistory = isShowHis;
//     }
//     temData.keys = keys;
//     wx.getSystemInfo({
//         success: function(res) {
//             var wHeight = res.windowHeight;
//             view.seachHeight = wHeight-barHeight;
//             temData.view = view;
//             that.setData({
//                 wxSearchData: temData
//             });
//         }
//     })
    
//     if (typeof (callBack) == "function") {
//         callBack();
//     }
    
//     getHisKeys(that);
// }

function wxSearchInput(e, that, callBack){
  
    var temData = that.data.wxSearchData;
    var text = e.detail.value;
    var mindKeys = [];

    util.getQuery('invoice/queryInvoiceHeadsByKeyword', { keyword: text}, "", 
    function success(res) {
      queryList = res.data.list;
      console.log(res);
      if (res.data.list && queryList.length> 0){
        for (var i = 0; i < queryList.length;i++){
          var mindKey = res.data.list[i].headName;
          // if (mindKey.indexOf(text) > -1) {
            mindKeys.push(mindKey);
          // }
       }
      }

      temData.value = text;
      temData.mindKeys = mindKeys;
      temData.view.isShow = true;
      that.setData({
        wxSearchData: temData
      });
      
    }, function fail(res) {
      console.log("获取title失败");
    })

   
    // if(typeof(text) == "undefined" || text.length == 0){
        
    // }else{
    //     for(var i = 0; i < __mindKeys.length; i++){
    //         var mindKey = __mindKeys[i];
    //         if(mindKey.indexOf(text) > -1){
    //             mindKeys.push(mindKey);
    //         }
    //     }
    // }


    // temData.value = text;
    // temData.mindKeys = mindKeys;
    // that.setData({
    //     wxSearchData: temData
    // });
}

// 失去焦点
function wxSearchBlur(e, that, callBack) {
    var temData = that.data.wxSearchData;

    var oEv = e || event;

    console.log("点击的按钮" +  e);

    if (oEv.keyCode == 13) {

    }else{
      // temData.value = e.detail.value;
      // temData.view.isShow = true;
      that.setData({
        wxSearchData: temData
      });
      if (typeof (callBack) == "function") {
        callBack();
      }
    }

   
}

function wxSearchHiddenPancel(that){
    var temData = that.data.wxSearchData;
    temData.view.isShow = false;
    that.setData({
        wxSearchData: temData
    });
}

function wxSearchfocus(e,that) {
  var temData = that.data.wxSearchData;
  temData.view.isShow = false;
  that.setData({
    wxSearchData: temData
  });
}

//模糊搜索item的点击事件
function wxSearchKeyTap(e, that, callBack) {
  wxSearchHiddenPancel(that);
  //回调
  var temData = that.data.wxSearchData;
  // temData.value = e.target.dataset.key;
  var itemIndex = e.currentTarget.dataset.index;
  


  // that.setData({
  //     // wxSearchData: temData,
  //   headName: temData.value
  // });

  var info = queryList[itemIndex]

  console.log("点击" +  itemIndex + info.headName)
  that.setData({
    headName: info.headName,
    taxNo: info.taxNo,
    address: info.address,
    telephone: info.telephone,
    bankName: info.bankName,
    bankAccount: info.bankAccount,
  });

  //当用户选择的是专票且信息不全的时候再进行一次搜索
  if (that.data.type == 1 && (info.address == null || info.address == "" )){
      console.log('第二次查询');
      net.queryByName(info.headName,that);
  }else{
    
  }

  if (typeof (callBack) == "function") {
      callBack();
  }
}

module.exports = {
  init: init,
  wxSearchInput: wxSearchInput,
  wxSearchBlur: wxSearchBlur,
  wxSearchKeyTap: wxSearchKeyTap,
  wxSearchHiddenPancel:wxSearchHiddenPancel,
  wxSearchfocus: wxSearchfocus,
}