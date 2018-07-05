// pages/gradeback/gradeback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:[0,1,2],
    backurl:'',
    grade:''
  },

  back:function(){
    var index = "https://wx2.sinaimg.cn/mw690/8b336269ly1fslf4c3dz6j20af0690u2.jpg";
    this.setData({
      backurl: index
    })
    wx.setStorage({
      key: 'backurl',
      data: index
    })
    wx.showModal({
      title: '提示',
      content: '成功，去首页点击封面即可更改',
      success: function (res) {
        if (res.confirm) {
          wx.switchTab({
            url: '../index/index'
          })
          console.log('用户点击确定')
        }
      }
    })
  },

  changeback: function (event) {
    var grade = wx.getStorageSync('grade')
    this.setData({
      grade: grade
    })  
    var newgrade= this.data.grade;
    if(newgrade >= 100){
      var backurl2 = event.currentTarget.dataset['index'];
      this.setData({
        backurl: backurl2
      })
      wx.setStorageSync('backurl', backurl2)
      newgrade = newgrade-100;
      this.setData({
        grade:newgrade
      })
      wx.setStorage({
        key: 'grade',
        data: newgrade,
      })
      wx.showModal({
        title: '提示',
        content: '封面修改成功',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../index/index'
            })
            console.log('用户点击确定')
          }
        }
      })
    }
    else{
      wx.showModal({
        title: '提示',
        content: '您的积分不足',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../index/index'
            })
            console.log('用户点击确定')
          }
        }
      })
    }

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'backurl',
      success: function (res) {
        console.log(res)
        that.setData({
          backurl: res.data
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
    wx.getStorage({
      key: 'grade',
      success: function (res) {
        console.log(res)
        that.setData({
          grade: res.data
        })
      },
      fail: function (res) {
        console.log(res)
      }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})