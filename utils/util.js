const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
var rootDocment = 'https://cm.bookingyun.com/CenterMaster/'; // 正式环境，相应的appid也需要修改
// var rootDocment = 'https://dev.bookingyun.com/CenterMaster/';   // 测试环境


function getQuery(url, parms, message, success, fail) {

  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }

  wx.request({
    url: rootDocment + url,
    // sName: 'user/sendVerifyCode',  // 这两个参数的作用
    // text: '发送验证码',
    method: 'GET',
    data: parms,
    isLoading: true,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      if (message != "") {
        wx.hideLoading()
      }

      if (res.data.returnCode == '1') {
        success(res);
      }else{
        fail(res);
      }
    },
    fail: function () {
      if (message != "") {
        wx.hideLoading();
      }
    }
  })
}


function checkSettingStatu(msg) {
  var that = this;
  // 判断是否是第一次授权，非第一次授权且授权失败则进行提醒
  wx.getSetting({
    success: function success(res) {
      console.log(res.authSetting);
      var authSetting = res.authSetting;
      if (that.isEmptyObject(authSetting)) {
        console.log('首次授权');
      } else {
        console.log('不是第一次授权', authSetting);
        // 没有授权的提醒
        if (authSetting[msg] === false) {
          wx.hideLoading();
          wx.showModal({
            title: '用户未授权',
            content: '如需正常使用开票功能，请按确定并在授权管理中进行授权，再重新进入小程序即可正常使用。',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.openSetting({
                  success: function success(res) {
                    console.log('openSetting success', res.authSetting);
                  }
                });
              }
            }
          })
        }
      }
    }
  })
}

// 提示错误信息
function isError(msg, that) {
  that.setData({
    showTopTips: true,
    errorMsg: msg
  })
}
// 清空错误信息
function clearError(that) {
  that.setData({
    showTopTips: false,
    errorMsg: ""
  })
}

function isEmptyObject (value) {
  var name;
  for (name in value) {
    return false;
  }
  return true;
}

module.exports = {
  formatTime: formatTime,
  getQuery: getQuery,
  isError: isError,
  clearError: clearError,
  isEmptyObject: isEmptyObject,
  checkSettingStatu: checkSettingStatu,
}
