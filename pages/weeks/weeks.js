var timeFormat = require("../../utils/timeadd")

Page({
  data: {
    items: [],
  },
  onload: function () {
    initData(this);
  },
  onShow: function () {
    initData(this);
  },
  toDelete(e) {
    let i = e.currentTarget.dataset.id, newitems = this.data.items;
    newitems.map(function (l, index) {
      if (l.id == i) {
        newitems.splice(index, 1);
      }
    })
    this.setData({
      items: newitems
    })
    wx.setStorage({
      key: 'txt',
      data: newitems
    })
  },


  edit(e) {
    // 修改原有的记事本内容
    console.log("myedit")
    var myid = e.currentTarget.dataset.id;
    console.log(myid);
    wx.navigateTo({
      url: '../myadd/myadd?id=' + myid,
    })

  },


  add() {
    // 增加新的记事本内容
    var result = this.data.items;
    console.log("my add");
    wx.navigateTo({
      url: '../myadd/myadd'
    })
  },

})

// 每次onload和onshow从本地存储中获取数据
function initData(page) {
  var txt = wx.getStorageSync("txt");
  if (txt.length) {
    txt.forEach(function (item, i) {
      //  循环每一项数据，并格式化时间戳
      var t = new Date(Number(item.time));
      item.time = timeFormat.formatTime(t);
    })
  }
  page.setData({
    //  将获取到的数据绑定到本页面实例中
    items: txt
  })




}




