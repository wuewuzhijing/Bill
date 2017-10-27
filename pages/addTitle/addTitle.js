// pages/addTitle/addTitle.js
var WxSearch = require('../../wxSearch/wxSearch.js');
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioCheck:0,
    type:0,

    userId:"",
    headType: 1,
    headName: "666",
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

    //初始化的时候渲染wxSearchdata
    WxSearch.init(that, 43, ['weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);
    WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序', 'weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);
    this.setData({
      //  怎么设置标题的文字
    })
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
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },

  wxSearchFn:function(){
    wx.navigateTo({
      url: '../titleList/titleList'
    })
  },
  
  clearMessage:function(){
    var that = this;
    console.log(123)
    util.clearError(that);
  },

  formSubmit(e){
    var data = e.detail.value;
    var that = this;
    data.headType="1";
    data.userId = "567";
    data.invoiceType = "1";

    console.log(data);

    // if (data.surplus == '0') {
    //   var arr = new Array('', '剩余空位', '乘车人数');
    //   util.isError('请选择' + arr[data.type], that);
    //   return false;
    // }


    if (that.data.type == 0){
      if (data.headName == '') {
        util.isError('请输抬头', that);
        return false;
      }
      if (data.taxNo == '') {
        util.isError('请输入税号', that);
        return false;
      }
      
    } else if (that.data.type == 1){

    } else if (that.data.type == 2){

    }

    console.log("开始提交");
    util.getQuery('invoice/addInvoiceHead' , data , "加载中" , function success(res){
      if(res == false){
        console.log(res.data.returnmessage);
      }else{
        console.log(res);
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
      }
      
    },function fail(res){
      // util.showToastErr(res.data.returnmessage);
      console.log(res);
      if (res.data.returnMessage != ""){
        util.isError("" + res.data.returnMessage, that);
      }
     
    })
  }

  
 
})