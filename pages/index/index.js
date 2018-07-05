//index.js
//获取应用实例
var util = require('../../utils/timeadd.js');
const app = getApp()

Page({
  data: {
    year:'',//考研年份
    day:'',//还剩多少天
    count_day:0,//累计签到天数
    timeLists:[],//签到时间
    grade:'',//积分
     //设置背景为默认，兑换时可更改
    backurl:"",
    userInfo: {
      avatarUrl: "",//用户头像  
      nickName: "",//用户昵称  
    },
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  countDay:function(e){
    let newTimeLists = this.data.timeLists;
    for(var i=0; i<newTimeLists.length; i++){
      if (util.formatTime3(new Date())==newTimeLists[i].days){
        wx.showModal({
          title: '提示',
          content: '今天已经签到',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
        return
      }
    }
    newTimeLists.push({ days: util.formatTime3(new Date()), time: util.formatTime5(new Date())})
    this.setData({
      timeLists: newTimeLists
    })
    let newlist = this.data.timeLists;
    wx.setStorage({
      key: 'ReadyTime',
      data: newlist
    })
    //前面随便加个日期以比较大小
    var oDate1 = Date.parse('2018-06-18 ' + util.formatTime5(new Date())); 
    var oDate2 = Date.parse('2018-06-18 ' + '09:00:00');
    if (oDate1 < oDate2) {
      var grade = this.data.grade;
      grade = grade + 5;
      this.setData({
        grade:grade
      })
      wx.setStorage({
        key: 'grade',
        data: grade
      })
      wx.showToast({
        title: '签到成功积分+5',
        icon: 'success',
        duration: 1000
      })  
    } else {
      wx.showToast({
        title: '签到成功',
        icon: 'success',
        duration: 1000
      })  
    }
    var count = this.data.count_day;
    count = count+1;
    this.setData({
      count_day:count
    })
    wx.setStorage({
      key: 'CountDay',
      data: count
    })
  },

onLoad: function () {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  /**  
  *点击添加地址事件  
  */
  add_address_fun: function () {
    wx.navigateTo({
      url: 'add_address/add_address',
    })
  },

  /**  
   * 生命周期函数--监听页面加载  
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'testYear',
      success: function (res) {
        console.log(res)
        that.setData({
          year: res.data
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })

    wx.getStorage({
      key: 'Day',
      success: function (res) {
        console.log(res)
        that.setData({
          day: res.data
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

    wx.getStorage({
      key: 'CountDay',
      success: function (res) {
        console.log(res)
        that.setData({
          count_day: res.data
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })

    wx.getStorage({
      key: 'ReadyTime',
      success: function (res) {
        if (res.data) {
          that.setData({
            timeLists: res.data
          })
        }
      }
    })

    /**  
     * 获取用户信息  
     */
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
      }
    })
  },  

  breakday:function(){
    var year = wx.getStorageSync('testYear')
    var i = year - util.formatTime2(new Date()) - 1;
    var start_date = new Date(util.formatTime3(new Date()));
    var end_date = new Date(util.formatTime4(new Date(), i));
    var days = end_date.getTime() - start_date.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    if (day > 0) {
      this.setData({
        num: day
      })
    } else {
      this.setData({
        num: 0
      })
    } 
    wx.setStorage({
      key: 'Day',
      data: day
    })
  },
  onShow: function () {
    var that = this; 
    that.breakday();

    var grade = wx.getStorageSync('grade')
    this.setData({
      grade:grade
    })     
    var backurl = wx.getStorageSync('backurl')
    this.setData({
      backurl: backurl
    })      
    var day = wx.getStorageSync('Day')
    this.setData({
      day : day
    })   
  },
  footerTap: app.footerTap
})