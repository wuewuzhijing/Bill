// pages/titleList/titleList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_title: [{
      name: '应季鲜果',
      count: "哈哈"
    }, {
      name: '精致糕点',
      count: "ehheeh"
    }, {
      name: '全球美食烘培原料',
      count: "dfeij"
    }, {
      name: '无辣不欢生猛海鲜',
      count: "jiji"
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
        console.log(res)
      }
    })
  },
  addTitle:function(){
    wx.navigateTo({
      url: '../addTitle/addTitle'
    })
  }
})