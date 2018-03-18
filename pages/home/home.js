//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    text:"首页信息展示",
    menus: ['menu1', 'menu2', 'menu3', 'menu4', 'menu5', 'menu6', 'menu7', 'menu8', 'menu9'],
    toView: 'red',
    scrollTop: 1,
    count: [],
  },
  editData:function(data_){
    this.setData({ menus: data_});
  },
  onLoad: function (options) {//页面初始化 options为页面跳转带来的参数

    return;
  var this_ = this;
    wx.request({
      url: 'http://1610b5834a.iok.la:28506/exit/getAllMenus',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        debugger
        var menus_ = [];
        for(var i of res.data){
          menus_.push(i.name);
        }
        this_.editData(menus_);
        console.log(res);
      }
    })
  },
  onReady:function(){//页面渲染完成

  },
  onShow:function(){//页面显示

  },
  onHide:function(){//页面隐藏

  },
  onUnload:function(){//页面关闭

  },
  clkMinute:function(options){

  }
})
