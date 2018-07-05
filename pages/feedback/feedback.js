 
Page({
  data: {
    content: ""
  },
  onSubmit: function (event) {
   if (!event.detail.value.content) {
      wx.showToast({
        title: "请填写反馈内容"
      })
     
    }else{
      wx.showToast({
        title: "提交成功",
        duration: 1000
      });
      wx.switchTab({
        url: "../set/set",
      }) 
   }
  }
 
})
