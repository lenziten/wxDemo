//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    text:"首页信息展示",
    menus: [{ name: 'menu1', price: 1.10, count: 0 }, { name: 'menu2', price: 2.30, count: 0 }, { name: 'menu3', price: 3.00, count: 0 }, { name: 'menu4', price: 4.40, count: 0 }, { name: 'menu5', price: 5.00, count: 0 }, { name: 'menu6', price: 6.66, count: 0 }, { name: 'menu7', price: 7.00, count: 0 }, { name: 'menu8', price: 8.56, count: 0 }, { name: 'menu9', price: 9.00, count: 0 }],
    toView: 'red',
    scrollTop: 1,
    totalPrice: 0
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
  clkMinute: function (event) {
    var index = event.currentTarget.dataset.index;
    var menus_ = this.data.menus;
    if (null == menus_[index].count || menus_[index].count == 0) {
      return;
    }
    menus_[index].count--;
    var totalPrice_ = this.data.totalPrice;
    totalPrice_ = totalPrice_ - menus_[index].price;
    this.setData({ menus: menus_, totalPrice: totalPrice_ });
  },
  clkPlus: function (event) {
    var index = event.currentTarget.dataset.index;
    var menus_ = this.data.menus;
    if (null == menus_[index].count) {
      return;
    }
    menus_[index].count++;
    var totalPrice_ = this.data.totalPrice;
    console.log(totalPrice_ + " + " + menus_[index].price);
    totalPrice_ = totalPrice_ + menus_[index].price;
    console.log("= " + totalPrice_);
    this.setData({ menus: menus_, totalPrice: totalPrice_ });
  }
})
