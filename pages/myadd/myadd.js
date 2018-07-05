Page({
  data: {},
  // bindinput 事件，内容修改后绑定到本页面实例
  change(e) {
    console.log(e);
    this.setData({
      content: e.detail.value
    })
  },
  // 点击取消按钮后返回上级页面
  cancel() {
    wx.navigateBack();
  },
  // 点击确定后更新数据
  sure() {
    // 点击确定时 若内容为空格，直接返回上级
    var re = /^\s*$/g;
    if (!this.data.content || re.test(this.data.content)) {
      return;
    }
    //  点击确定时，更新时间戳，并绑定到页面实例（必须在 setValue之前调用）
    this.setData({
      time: Date.now()
    })
    // 将新内容更新到localstorage
    setValue(this);
    wx.navigateBack()
  },
  onLoad(e) {
    // 页面加载后首先获取上级页面传来的id
    var id = e.id;
    if (id) {
      //  若存在id 则为修改记事本内容
      getData(id, this);
    } else {
      //  不存在id则为新增记事本内容
      this.setData({
        //  为新增的记事本内容增加记事本id 并绑定到页面实例
        id: Date.now()
      })
    }
  }
})


function getData(id, page) {
  // 从本地存储获取数据
  var arr = wx.getStorageSync("txt");
  arr.forEach(function (item) {
    if (arr.length) {
      //  遍历数据并根据id显示当前记事本内容
      if (item.id == id) {
        page.setData({
          //  匹配记事本后将id与content绑定到页面实例
          id: item.id,
          content: item.content
        })
      }
    }
  })
}


function setValue(page) {
  var arr = wx.getStorageSync("txt");
  var data = [], flag = true;
  // data数组用于存储更新或新加的记事本内容
  if (arr.length) {
    // 修改原有记事本内容
    arr.forEach(function (item) {
      if (item.id == page.data.id) {
        item.time = Date.now();
        item.content = page.data.content;
        // flag用于控制 是修改记事本内容还是新增记事本内容
        flag = false;
      }
      data.push(item);
    })
  }
  // 新增记事本内容
  if (flag) {
    data.push(page.data)
  }
  // 最后将新的内容加至localStore中
  wx.setStorageSync("txt", data)
}