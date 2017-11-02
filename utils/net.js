
var util = require("util.js");
const app = getApp();


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

function queryByName(headName, obj) {
  util.getQuery('invoice/queryInvoiceHead',
    { headName:headName, headType:"1", invoiceType:"2"},
    "",
    function success(res) {
      if (res.data.headName) {
        console.log(res);
        obj.setData({
          headName: res.data.headName,
          taxNo: res.data.taxNo,
          address: res.data.address,
          telephone: res.data.telephone,
          bankName: res.data.bankName,
          bankAccount: res.data.bankAccount,
        });
      }
    }, function fail(res) {
     
    })
}


function getHotel(hotelid) {
  util.getQuery('hotel/getHotelSimpleInfoById',
    { hotelId: hotelid },
    "",
    function success(res) {
      console.log(res);
      if (res.data.hotelName){
        app.globalData.hotelName = res.data.hotelName;
        app.globalData.hotelPhone = res.data.hotelPhone;
      }
        // obj.setData({
        //   list_title: res.data.list,
        // });
    }, function fail(res) {
      console.log("获取酒店信息失败");
    })
}

module.exports = {
  getUserTitleList: getUserTitleList,  //获取用户的抬头列表
  getHotel: getHotel,                  //获取酒店信息
  queryByName: queryByName,             //企业名称查询
}
