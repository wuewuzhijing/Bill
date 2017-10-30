//app.js
var util = require("utils/util.js")
App({
  onLaunch: function () {
    let that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        this.globalData.openidParms.jsCode = res.code;
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
                    this.globalData.openidParms.encryptedData = res.encryptedData;
                    this.globalData.openidParms.iv = res.iv;

                    let info = JSON.stringify(this.globalData);
                    console.log(info)

                    this.getOpenId(this.globalData.openidParms);

                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    // if (this.userInfoReadyCallback) {
                    //   this.userInfoReadyCallback(res)
                    // }
                  }
                })
              }else{
                console.log("获取用户信息授权失败")
                if (!res.authSetting['scope.userInfo']) {
                  wx.authorize({
                    scope: 'scope.userInfo',
                    success() {
                      // 用户已经获取用户信息，后续调用接口不会弹窗询问
                      wx.startRecord()
                    }
                  })
                }
              }
            }
          })
        }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
   
  },

  //获取opind
  getOpenId: function (parms){
    let that = this;
    // wx.showLoading({
    //   title: "正在登录",
    // });
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
        // var userid = { userId: "567" };
        // that.getUserTitleList(userid);
        that.getUserId(res);
      },
      fail: function () {
        wx.hideLoading();
        console.log("获取openid失败")
        that.getDataFail();
      }
    })
  },

//获取userid
  getUserId: function (res){
    var that = this;
    wx.request({
      url: "https://dev.bookingyun.com/CenterMaster/user/getUserByInvoiceOpenId",
      method: 'GET',
      data: { openIdInvoiceLittleApp: res.data.openId, nickname: res.data.nickname, avatar: res.data.avatarUrl},
      isLoading: true,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("获取userid成功" + res.data.userId)
        if (res.data.userId) {
          //获取用户的抬头列表 ， 如果有数据打开抬头列表页，没有数据就进入添加抬头页
          // this.globalData.userInfo.userId = res.data.userId
          that.globalData.userInfo.userId = "567"
        }
        var userid = { userId: "567" };
        that.getUserTitleList(that.globalData.userInfo.userId );
      },
      fail: function () {
        console.log("获取userid")
        that.getDataFail();
      }
    })
  },

  //获取用户的抬头列表
  getUserTitleList:function(userid){
    var that = this;
    util.getQuery('invoice/getUserInvoiceHeads', {userId: userid}, "", function success(res) {
      let list = JSON.stringify(res.data.list);
      console.log("获取抬头列表成功");
        if (list && list.length > 2){
          wx.redirectTo({
            url: '../titleList/titleList?list=' + list
            //  url: '../titleList/titleList'
              // url: '../addTitle/addTitle'
          })
        }else{
          wx.redirectTo({
            url: '../addTitle/addTitle'
          })
        }
    }, function fail(res) {
      console.log("获取抬头列表失败");
      that.getDataFail();
    })
  },

  getDataFail:function(){
    wx.redirectTo({
      url: '../addTitle/addTitle'
    })
  },

  globalData: {
    userInfo: {userId:null},
    openidParms: { appId:"wx73ca0044fd536511"}
  },
   
})
