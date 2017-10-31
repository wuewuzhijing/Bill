//app.js
var util = require("utils/util.js")
App({
  onLaunch: function () {
    console.log("初始化");
    let that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  login:function(){
    var that = this
    // 登录
    wx.login({
      success: res => {
        that.globalData.openidParms.jsCode = res.code;
        if (res.code) {
          // 获取用户信息
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                that.getUserInfo();
              } else {
                console.log("获取用户信息授权失败")
                if (!res.authSetting['scope.userInfo']) {
                  wx.authorize({
                    scope: 'scope.userInfo',
                    success() {
                      that.getUserInfo();
                    },
                    fail() {
                      util.checkSettingStatu('scope.userInfo');
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

  //获取用户信息
  getUserInfo:function(){
    let that = this;
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        that.globalData.userInfo = res.userInfo
        that.globalData.openidParms.encryptedData = res.encryptedData;
        that.globalData.openidParms.iv = res.iv;

        let info = JSON.stringify(that.globalData);
        console.log(info)

        that.getOpenId(that.globalData.openidParms);

        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        // if (this.userInfoReadyCallback) {
        //   this.userInfoReadyCallback(res)
        // }
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
          that.globalData.userInfo.userId = res.data.userId
          // that.globalData.userInfo.userId = "567"
        }
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
      

      if (res.data.list && res.data.list.length > 0){
        console.log("获取抬头列表成功");
          let list = JSON.stringify(res.data.list);
          wx.redirectTo({
            url: '../titleList/titleList?list=' + list
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
    openidParms: { appId:"wx73ca0044fd536511"},
    lists:[],
    hotelId:"",
    hotelName:"酒店名称5",
    hotelPhone:"",
  },
   
})
