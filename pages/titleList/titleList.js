// pages/titleList/titleList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_title: [{
      name: '北京纵横时光信息技术有限公司南宁分公司',
      count: "增值税专用发票"
    }, {
        name: '北京纵横时光信息技术有限公司南宁分公司',
        count: "增值税专用发票"
    }, {
        name: '北京纵横时光信息技术有限公司南宁分公司',
        count: "增值税专用发票"
    }, {
        name: '北京纵横时光信息技术有限公司南宁分公司',
        count: "增值税专用发票"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  importTitle:function(){
    wx.chooseInvoiceTitle({
      success(res) {
        let info = JSON.stringify(res);
        wx.navigateTo({
          url: '../addTitle/addTitle?info=' + info
        })
      }
    })
  },
  addTitle:function(){
    wx.navigateTo({
      url: '../addTitle/addTitle'
    })
  }
})