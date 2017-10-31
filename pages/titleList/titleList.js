// pages/titleList/titleList.js
const app = getApp()
var net = require("../../utils/net.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // list_title: [{
    //   headName: '北京纵横时光信息技术有限公司南宁分公司',
    //   invoiceHeadId: "增值税专用发票"
    // }, {
    //     headName: '北京纵横时光信息技术有限公司南宁分公司',
    //     invoiceHeadId: "增值税专用发票"
    // }, {
    //     headName: '北京纵横时光信息技术有限公司南宁分公司',
    //     invoiceHeadId: "增值税专用发票"
    // }, {
    //     headName: '北京纵横时光信息技术有限公司南宁分公司',
    //     invoiceHeadId: "增值税专用发票"
    // }]
    list_title:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.list) {  //启动页会判断是否有title列表，有的话直接带过来
      var list = JSON.parse(options.list);
      this.setData({
        list_title: list,
      });
    }else{
      if (app.globalData.userInfo.userId) {
        net.getUserTitleList(app.globalData.userInfo.userId, that)
      }
    }
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  //导入微信title
  importTitle:function(){
    var that = this;
    // 手动权限获取
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.invoiceTitle']) {
          // 已经授权，可以直接调用
          that.jump();
        } else {
          if (!res.authSetting['scope.invoiceTitle']) {
            wx.authorize({
              scope: 'scope.invoiceTitle',
              success() {
                that.jump();
              },
              fail(){
                util.checkSettingStatu('scope.invoiceTitle');
              }
            })
          }
           
        }
      }
    })
   
  },

  jump:function(){
    wx.chooseInvoiceTitle({
      success(res) {
        let info = JSON.stringify(res);
        console.log(info);
        wx.redirectTo({
          url: '../addTitle/addTitle?type=2&info=' + info
        })
      }
    })
  },


  addTitle:function(){
    wx.redirectTo({
      url: '../addTitle/addTitle'
    })
  },
  selectTitleItem:function(e){
    var that = this;
    var itemsss = e.currentTarget.dataset.index;
    console.log("点击" + itemsss)

    let info = JSON.stringify(that.data.list_title[itemsss]);
    console.log(info);
    wx.redirectTo({
      url: '../addTitle/addTitle?type=1&info=' + info
    })
    
    // that.setData({
    //   headName: that.data.list_title[2].headName
    // });

    // console.log(this.data.headName);
   
  }
})