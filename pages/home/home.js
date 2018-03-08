//index.js
//获取应用实例
const app = getApp()

var infoPage = "home";//详细信息页面,home-首页；order-订单；info-信息

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  clkHome: function () {//首页导航按钮点击事件
    console.log("click home page");
    infoPage = "home";
    var objs = wx.createSelectorQuery().in(this);
    var obj = objs.select('#listHome'); debugger
    // wx.request({
    //   url: 'http://1610b5834a.iok.la:28506/exit/test',
    //   header:{
    //     'content-type':'application/json'
    //   },
    //   success:function(res){
    //     console.log(res);
    //   }
    // })
  },
  clkOrder: function () {//订单导航按钮点击事件
    console.log("click order page");
    infoPage = "order";
  },
  clkInfo: function () {//信息导航按钮点击事件
    console.log("click information page");
    infoPage = "info";
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
