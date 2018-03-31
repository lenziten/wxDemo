//index.js
//获取应用实例
const app = getApp();

//工具类
var util = require('../../utils/util.js');
Page({
  data: {
    text: "首页信息展示",
    aaa: app.globalData.aaa,
    orders: [{ name: 'menu1', price: 1, count: 0, showDetail: 'none' }, { name: 'menu2', price: 2, count: 0, showDetail: 'none' }, { name: 'menu3', price: 3, count: 0, showDetail: 'none'}],
    toView: 'red',
    scrollTop: 1,
    totalPrice: 0,
    purchType: 2,//1:下单;2:付款
    showTotalPrice : false //是否显示总价?true是false否
  },
  editData: function (data_) {
    this.setData({ menus: data_ });
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
        for (var i of res.data) {
          menus_.push(i.name);
        }
        this_.editData(menus_);
        console.log(res);
      }
    })
  },
  onReady: function () {//页面渲染完成

  },
  onShow: function () {//页面显示

  },
  onHide: function () {//页面隐藏

  },
  onUnload: function () {//页面关闭

  },
  clkMinute: function (event) {
    var index = event.currentTarget.dataset.index;//获取当前菜品下标
    var orders_ = this.data.orders;
    if (null == orders_[index].count || orders_[index].count == 0) {
      return;
    }
    orders_[index].count--;//当前菜品数量-1
    this.setData({
      orders: orders_,
      totalPrice: this.data.totalPrice - orders_[index].price //当前总价 = 总价 - 菜品单价
    });
  },
  clkPlus: function (event) {
    var index = event.currentTarget.dataset.index;//获取当前菜品下标
    var orders_ = this.data.orders;
    if (null == orders_[index].count) {
      return;
    }
    orders_[index].count++;//当前菜品数量+1
    this.setData({
      orders: orders_,
      totalPrice: this.data.totalPrice + orders_[index].price //当前总价 = 总价 + 菜品单价
    });
  },
  showDetail: function (event) {
    console.log(event);
    var index = event.currentTarget.dataset.index;//获取当前订单下标
    var orders_ = this.data.orders;
    var showDetail = orders_[index].showDetail;
    if (null == showDetail){
      return;
    }
    orders_[index].showDetail = showDetail == 'none' ? 'display' : 'none';
    this.setData({
      orders:orders_
    });
  },
  //创建随机字符串
  createNonceStr:function(){
    return Math.random().toString(36).substr(2, 15);
  }, 
  //支付
  onPay: function (event) {
    var data_ = null;
        wx.request({
      url: 'http://1610b5834a.iok.la:28506/exit/getSign',
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res);
        data_ = res.data;debugger
        wx.requestPayment(
          {
            'timeStamp': data_.timeStamp,
            'nonceStr': data_.nonceStr,
            'package': data_.package,
            'signType': data_.signType,
            'paySign': data_.paySign,
            'success': function (res) {
              debugger
              console.log(res);
            },
            'fail': function (res) {
              debugger
              console.log(res);
            },
            'complete': function (res) {
              debugger
              console.log(res);
            }
          })
      }
    })


    // var now_ = util.formatTime(new Date);
    // var timestamp_ = Date.parse(new Date());
    // var nonceStr_ = this.createNonceStr();
    // var package_ = "prepay_id=wx37737361ba6405e4";
    // var signType_ = "MD5";
    // var paySign_ = this.createPaySign(timestamp_, nonceStr_, package_, signType_);
    
    }
})
