// pages/order/order.js
import { $wuxToast } from '../../dist/index'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productId:"",
    itemInfo:"",
    imgPrefix:"",
    currentAddress: "",     //当前地址
    domAreaList: wx.getStorageSync("domAreaList"),
    locationList: wx.getStorageSync("locationList")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.productid)
    this.setData({
      productId: app.globalData.currentOpItemId,
      currentAddress: app.globalData.currentAddress
    })
    this.setData({
      imgPrefix: app.globalData.imgUrlPrefix
    })
    var that = this
    //向服务器请求数据
    wx.request({
      url: app.globalData.getDetailUrl + "?id=" + that.data.productId,
      data: '',
      header: {
        'token': wx.getStorageSync("_3rd_session")
      },
      method: 'POST',
      success: function(res) {
        const { data } = res
        that.setData({
          itemInfo: data
        })
        // console.log("order::onLoad---->",res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })

    console.log("order.js::onLoad--->", this.data.currentAddress, this.data.domAreaList, this.data.locationList)
  },

  //提交订单
  onSubmit:function(){
    //如果未选择地址，不提交
    if (this.data.currentAddress==""){
      return
    }
    var data = { "productId": this.data.productId,"addressId":this.data.currentAddress.id }
    wx.request({
      url: app.globalData.submitOrderUrl,
      data: data,
      header: {
        'token': wx.getStorageSync("_3rd_session")
      },
      method: 'POST',
      success: function(res) {
        if (res.data.msg == "ADD_ORDER_SUCCESS"){
          //弹出提示，跳转到主页
          $wuxToast().show({
            type: 'success',
            duration: 1500,
            color: '#fff',
            text: '购买成功',
            success: () => {
              wx.reLaunch({
                url: '/pages/index/index',
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              })
            }
          })
        }
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  //显示地址列表
  showAddressList:function(){
    //跳转到选择地址页面
    wx.navigateTo({
      url: '/pages/addressList/addressList',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

})