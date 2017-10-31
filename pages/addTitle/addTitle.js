// pages/addTitle/addTitle.js
var WxSearch = require('../../wxSearch/wxSearch.js');
var util = require("../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioCheck:0,
    type:0,
    hotelName: "",

    info:{},
    list_title: [], // 模糊搜索取到的集合

    userId:"",
    headType: 1,
    headName: "",
    invoiceType: 1,
    taxNo: "",
    address: "",
    telephone: "",
    bankName: "",
    bankAccount: "",   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.info){
      var info = JSON.parse(options.info);
      if (options.type == 1){    // 点击抬头列表时导入的数据
        this.setData({
          headName: info.headName,
          taxNo: info.taxNo,
          address: info.address,
          telephone: info.telephone,
          bankName: info.bankName,
          bankAccount: info.bankAccount,
          hotelName: app.globalData.hotelName,
        });
      } else if (options.type == 2){   // 导入微信抬头时的数据
        this.setData({
          headName: info.title,
          taxNo: info.taxNumber,
          address: info.companyAddress,
          telephone: info.telephone,
          bankName: info.bankName,
          bankAccount: info.bankAccount,
          hotelName: app.globalData.hotelName,
        });
      }
     
    }

    // //初始化的时候渲染wxSearchdata
    // WxSearch.init(that, 43, ['weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);
    // WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序', 'weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);
    WxSearch.init(that);
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

  radioCheckedChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      radioCheck: e.detail.value,
      type: e.detail.value
    })
  },

  wxSearchInput: function (e) {
    console.log(e);
    var that = this
    WxSearch.wxSearchInput(e, that);
  },

  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  
  clearMessage:function(){
    var that = this;
    console.log(123)
    util.clearError(that);
    WxSearch.wxSearchHiddenPancel(that);
  },

  importTitle: function () {
    wx.redirectTo({
      url: '../titleList/titleList'
    })
  },

  formSubmit(e){
    var data = e.detail.value;
    var that = this;
   
    data.userId = app.globalData.userInfo.userId;
    data.hotelId = app.globalData.hotelId;
    data.reciveWay = "1";

    if (data.headName == '') {
      util.isError('请输抬头', that);
      return false;
    }

    if (that.data.type == 0){
      if (data.taxNo == '') {
        util.isError('请输入税号', that);
        return false;
      }

      data.headType = "1";
      data.invoiceType = "1";
      
    } else if (that.data.type == 1){
      if (data.taxNo == '') {
        util.isError('请输入税号', that);
        return false;
      }
      if (data.address == '') {
        util.isError('请输入公司注册地址', that);
        return false;
      }
      if (data.telephone == '') {
        util.isError('请输入公司电话', that);
        return false;
      }
      if (data.bankName == '') {
        util.isError('请输入公司开户银行', that);
        return false;
      }
      if (data.bankAccount == '') {
        util.isError('请输入开户公司开户帐号', that);
        return false;
      }

      data.headType = "1";
      data.invoiceType = "2";

    } else if (that.data.type == 2){
      if (data.taxNo == '') {
        util.isError('请输入税号', that);
        return false;
      }
     
      data.headType = "0";
      data.invoiceType = "1";
    }

    console.log("开始提交");
    util.getQuery('invoice/intentInvoice' , data , "加载中" , function success(res){
      console.log(res);
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      })
      wx.redirectTo({
        url: '../commitSuc/commitSuc'
      })
    },function fail(res){
      // util.showToastErr(res.data.returnmessage);
      console.log(res);
      if (res.data.returnMessage != ""){
        util.isError("" + res.data.returnMessage, that);
      }
     
    })
  }

  
 
})