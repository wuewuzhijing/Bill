
var util = require("util.js");

//获取用户的抬头列表
function getUserTitleList(userid,obj) {
  util.getQuery('invoice/getUserInvoiceHeads',
   { userId: userid },
    "加载中",
    function success(res) {
      if (res.data.list && res.data.list.length > 2){
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

module.exports = {
  getUserTitleList: getUserTitleList,
}
