
var util = require("util.js");
const app = getApp();

//获取用户的抬头列表
function getUserTitleList(userid,obj) {
  util.getQuery('invoice/getUserInvoiceHeads',
   { userId: userid },
    "加载中",
    function success(res) {
      if (res.data.list && res.data.list.length > 0){
        // let list = JSON.stringify(res.data.list);
        //console.log(res.data.list);
        obj.setData({
          list_title: res.data.list,
        });
      }
  }, function fail(res) {
    console.log("获取抬头列表失败");
  })
}

//获取酒店信息
function getHotel(hotelid) {
  util.getQuery('hotel/getHotelSimpleInfoById',
    { hotelId: hotelid },
    "",
    function success(res) {
      console.log(res);
      if (res.data.hotelName){
        app.globalData.hotelName = res.data.hotelName;
      }
        // obj.setData({
        //   list_title: res.data.list,
        // });
    }, function fail(res) {
      console.log("获取酒店信息失败");
    })
}

module.exports = {
  getUserTitleList: getUserTitleList,
  getHotel: getHotel,
}
