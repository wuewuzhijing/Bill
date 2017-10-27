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

// var rootDocment = 'https://dev.bookingyun.com/CenterMaster/';
var rootDocment = 'https://dev.bookingyun.com/CenterMaster/';


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

module.exports = {
  formatTime: formatTime,
  getQuery: getQuery,
  isError: isError,
  clearError: clearError
}
