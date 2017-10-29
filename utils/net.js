
var util = require("util.js");

//获取用户的抬头列表
function getUserTitleList(userid,obj) {
  util.getQuery('invoice/getUserInvoiceHeads',
   { userId: userid }, "加载中", function success(res) {
    let list = JSON.stringify(res.data.list);
    //console.log(res.data.list);
    console.log("获取抬头列表成功");
    console.log(res.data.list);
    obj.setData({
      list_title: res.data.list,
    });
   
    if (list && list.length > 0) {
      // wx.redirectTo({
      //   url: '../titleList/titleList?list=' + list
      // })
    } else {
      // wx.redirectTo({
      //   url: '../addTitle/addTitle'
      // })
    }
  }, function fail(res) {
    console.log("获取抬头列表失败");
  })
}

module.exports = {
  getUserTitleList: getUserTitleList,
}
