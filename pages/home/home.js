//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    text:"首页信息展示",
    menus: [{ name: 'menu1', price: 1, count: 0 }, { name: 'menu2', price: 2, count: 0 }, { name: 'menu3', price: 3, count: 0 }, { name: 'menu4', price: 4, count: 0 }, { name: 'menu5', price: 5, count: 0 }, { name: 'menu6', price: 6, count: 0 }, { name: 'menu7', price: 7, count: 0 }, { name: 'menu8', price: 8, count: 0 }, { name: 'menu9', price: 9, count: 0 }],
    toView: 'red',
    scrollTop: 1,
    totalPrice: 0,
    purchType:1,//1:下单;2:付款
    showTotalPrice : true //是否显示总价?true是false否
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
    var index = event.currentTarget.dataset.index;//获取当前菜品下标
    var menus_ = this.data.menus;
    if (null == menus_[index].count || menus_[index].count == 0) {
      return;
    }
    menus_[index].count--;//当前菜品数量-1
    this.setData({ 
      menus: menus_, 
      totalPrice: this.data.totalPrice - menus_[index].price //当前总价 = 总价 - 菜品单价
      });
  },
  clkPlus: function (event) {
    var index = event.currentTarget.dataset.index;//获取当前菜品下标
    var menus_ = this.data.menus;
    if (null == menus_[index].count) {
      return;
    }
    menus_[index].count++;//当前菜品数量+1
    this.setData({ 
      menus: menus_, 
      totalPrice: this.data.totalPrice + menus_[index].price //当前总价 = 总价 + 菜品单价
      });
  }
})
