//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    info:"深圳城市客栈",
    showModal: false,
    items: [
      {name: '0', value: '单位普票' },
      { name: '1', value: '单位专票' },
      { name: '2', value: '个人'},
     ],
    radioCheckVal: 0,
    type:1,
    wx_host: 'https://dev.bookingyun.com/hotel_wx/rest/',
    cm_host: 'https://dev.bookingyun.com/CenterMaster/'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  submit: function () {
    this.setData({
      showModal: true
    })
  },

  preventTouchMove: function () {

  },


  go: function () {
    this.setData({
      showModal: false
    })
  },

 radioChange:function(e){
    console.log(e.detail.value);
  },
  radioCheckedChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      radioCheckVal: e.detail.value,
      type: e.detail.value
    })
  },

  //发送验证码
  sendVerifyCode: function sendVerifyCode(parms, cb) {
    wx.request({
      url: this.data.cm_host + 'user/sendVerifyCode',
      sName: 'user/sendVerifyCode',
      text: '发送验证码',
      method: 'GET',
      data: parms,
      isLoading: true,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        return typeof cb == "function" && cb(res.data)
      },
      fail: function () {
        return typeof cb == "function" && cb(false)
      }
    })
  },

  submit3: function () {
    let that = this;
    console.log(that);
    console.log("kaishi" + that.data.cm_host);
    that.sendVerifyCode({ 'mobile': "15820480843"}, function (res) {
      console.log(res);
      wx.showToast({
        title: '成功',
        icon: 'loading',
        duration: 2000
      })

    })

  },
  

})
