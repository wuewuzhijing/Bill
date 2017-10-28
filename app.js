//app.js
var util = require("utils/util.js")
App({
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        this.globalData.getOpnidParms.jsCode = res.code;
        if (res.code) {
          // 获取用户信息
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: res => {
                    // 可以将 res 发送给后台解码出 unionId
                    this.globalData.userInfo = res.userInfo
                    this.globalData.getOpnidParms.encryptedData = res.encryptedData;
                    this.globalData.getOpnidParms.iv = res.iv;

                    let info = JSON.stringify(this.globalData);
                    console.log(info)

                    this.getOpenId(this.globalData.getOpnidParms, that);

                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    // if (this.userInfoReadyCallback) {
                    //   this.userInfoReadyCallback(res)
                    // }
                  }
                })
              }else{
                console.log("获取用户信息授权失败")
              }
            }
          })
        }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
   
  },

  //获取opind
  getOpenId: function (parms,that){
    wx.showLoading({
      title: "正在登录",
    })

    wx.request({
      url: "https://dev.bookingyun.com/hotel_wx/rest/wxRest/getSNSUserInfoByEncryptedData",
      method: 'GET',
      data: parms,
      isLoading: true,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading()
        console.log("获取openid成功" + res.data.returnMessage)
        if (res.data.openId){
          //获取用户的抬头列表 ， 如果有数据打开抬头列表页，没有数据就进入添加抬头页
          
         
        }

        var userid = { userId:"567"};
        // that.getUserTitleList(userid);
        console.log("开始获取title列表");
        util.getQuery('invoice/getUserInvoiceHeads', userid , "加载中", function success(res) {
          let list = JSON.stringify(res.data.list);
          console.log(list);
          if (list && list.length > 0){
            wx.redirectTo({
              url: '../titleList/titleList?list=' + list
            })
          }else{
            wx.redirectTo({
              url: '../addTitle/addTitle'
            })
          }
          

        }, function fail(res) {
          // util.showToastErr(res.data.returnmessage);
          console.log("失败");
          
        })

      },
      fail: function () {
          wx.hideLoading();
          console.log("获取openid失败")
      }
    })
  },

  //获取用户的抬头列表
  getUserTitleList:function(userid){
    console.log("开始获取title列表");
    util.getQuery('invoice/getUserInvoiceHeads', userid, "加载中", function success(res) {
      console.log(res);
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      })
    }, function fail(res) {
      // util.showToastErr(res.data.returnmessage);
      console.log(res);
      if (res.data.returnMessage != "") {
        util.isError("" + res.data.returnMessage, that);
      }

    })
  },

  globalData: {
    userInfo: null,
    getOpnidParms: { appId:"wx73ca0044fd536511"}
  },
   
})