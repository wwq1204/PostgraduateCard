// pages/login/login.js
var util = require('../../utils/timeadd.js');
Page({
  data: {
    array: [util.formatTime2(new Date()) + 1, util.formatTime2(new Date()) + 2, util.formatTime2(new Date()) + 3, util.formatTime2(new Date()) + 4],
    index: 0,
    grade: 300,//积分
    //设置背景为默认，兑换时可更改
    backurl: "https://wx2.sinaimg.cn/mw690/8b336269ly1fslf4c3dz6j20af0690u2.jpg"
  },

  pickChange: function (e) {
    this.setData({
      index: e.detail.value
    });
  },

  onLoad: function () {

  },

  saveData(e) {
    let index = this.data.index;
    let yearrr = this.data.array[index];
    wx.setStorage({
      key: 'testYear',
      data: yearrr
    })
    
    var start_date = new Date(util.formatTime3(new Date()));
    var end_date = new Date(util.formatTime4(new Date(),index));
    var days = end_date.getTime() - start_date.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    if (day > 0) {
      this.setData({
        num: day
      })  
      wx.setStorage({
        key: 'Day',
        data: day
      })
    } else {
      wx.showToast({
        image: '/image/false.png',
        title: '日期有误',
      })
    }  
    var grade = this.data.grade;
    var backurl = this.data.backurl;
    wx.setStorage({
      key: 'grade',
      data: grade
    })
    wx.setStorage({
      key: 'backurl',
      data: backurl
    })
    wx.switchTab({
      url: '../index/index'
    })
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
  
  }
})