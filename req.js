const App = getApp()
import { $wuxToast } from '../components/wux'
// 请求头配置
var header = {
  'content-type': 'application/x-www-form-urlencoded',
  appVersionCode: 1000001,
  appVersionName: "1.0.1",
  userId: wx.getStorageSync('user').id,
  channel: "wxapp",
  mobileType: 2,
  deviceToken:'',
  mobileModel: wx.getStorageSync('mobileModel'),
  osVersionCode: wx.getStorageSync('osVersionCode'),
  userType: 2,
}


//GET请求
function req_get(url, message, success, fail) {
  wx.onNetworkStatusChange(function (res) {
    console.log(res)
    if (res.networkType == "none") {
      wx.showToast({
        title: '网络无连接，请重试',
      })
      return;
    }
    if (message != "") {
      wx.showLoading({
        title: message,
      })
    }
    wx.request({
      url: url,
      header: header,
      method: 'GET',
      success: function (res) {
        //wx.hideNavigationBarLoading()
        // if (message != "") {
        //   wx.hideLoading()
        // }
        if (res.data.resCode == '0000') {
          success(res);
        } else if (res.data.resCode == '403') {//无权限，需重新登录
          wx.removeStorageSync('token');
          wx.redirectTo({
            url: '/pages/login/index',
          });
        } else {
          // if (res.data.resCode) {
          //   showToastErr(res.data.resDesc);
          // }
          // if (res.data.resCode = 'A002') {
          //   wx.removeStorageSync('token');
          //   wx.redirectTo({
          //     url: '/pages/login/index',
          //   });
          // } else {
          //   if (res.data.resCode) {
          //     showToastErr(res.data.resDesc);
          //   }
          // }
          
          fail(res);
        }
      },
      fail: function (res) {
        console.log("--------reqfail---------" + res.data.resCode + "/" + res.data.resDesc);
        wx.hideNavigationBarLoading();
        if (message != "") {
          wx.hideLoading();
        }
        //fail(res);
      }
    })
  })
}

//自定义错误提示
function showToastErr(content) {
  $wuxToast.show({
    type: 'forbidden',
    timer: 1500,
    color: '#fff',
    text: content,
    success: () => console.log(content)
  })
}


//h5请求
function req_get_html(url, message, success, fail) {
  wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  wx.request({
    url: url,
    header: header,
    method: 'GET',
    success: function (res) {
      wx.hideNavigationBarLoading()
      if (res) {
        success(res);
      } else {
        fail(res);
      }
    },
    fail: function (res) {
      if (message != "") {
        wx.hideLoading();
      }
      fail(res);
    }
  })
}



function cbFail() {
  return res;
}

//POST请求
function req_post(url, message, success, fail) {
  wx.onNetworkStatusChange(function (res) {
    console.log(res)
    if (res.networkType == "none") {
      wx.showToast({
        title: '网络无连接，请稍候重试',
      })
      return;
    } else {
      //wx.showNavigationBarLoading()
    }
  })

  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  wx.request({
    url: url,
    header: header,
    method: 'POST',
    success: function (res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      if (res.data.resCode == '0000') {
        success(res);
      } else if (res.data.resCode == '403' || res.data.resCode =='A002') {//无权限，需重新登录,或token过期
        wx.removeStorageSync('token');
        wx.redirectTo({
          url: '/pages/login/index',
        });
      } else {
        //if (res.data.resCode!='A101'){//病人未分组提示
          wx.showToast({
            title: res.data.resDesc,
          })
       // }
        console.log("--------reqfail---------" + res.data.resCode + "/" + res.data.resDesc);
        fail(res);
      }
    },
    fail: function (res) {
      wx.hideNavigationBarLoading();
      if (message != "") {
        wx.hideLoading();
      }
    }
  })

}


//JSON传参
function req_json(url, params, message, success, fail) {
  wx.showNavigationBarLoading()
  // if (message != "") {
  //   wx.showLoading({
  //     title: message,
  //   })
  // }
  wx.request({
    url: url,
    dataType: JSON,
    header: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    success: function (res) {
      wx.hideNavigationBarLoading()
      // if (message != "") {
      //   wx.hideLoading()
      // }
      if (res.data.resCode == '0000') {
        success(res);
      } else if (res.data.resCode == '403') {//无权限，需重新登录
        wx.removeStorageSync('token');
        wx.redirectTo({
          url: '/pages/login/index',
        });
      } else {
        console.log("--------reqfail---------" + res.data.resCode + "/" + res.data.resDesc);
        if (res.data.resCode) {
          showToastErr(res.data.resDesc);
        }
        fail(res);
      }
    },
    fail: function (res) {
      wx.hideNavigationBarLoading();
      if (message != "") {
        wx.hideLoading();
      }
      fail(res);
    }
  })
}

module.exports = {
  req_post: req_post,
  req_get: req_get,
  req_json: req_json,
  req_get_html: req_get_html
}