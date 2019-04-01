// pages/productInfo/productInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifstar:true,
    productId:1,
    productInfo:"",
    getDetailUrl: app.globalData.getDetailUrl,
    imgUrlPrefix: app.globalData.imgUrlPrefix
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({      //显示加载中
      title: '加载中...',
      mask: true,   //蒙版
    })
    console.log("onLoad:::options.id--->",options.id)
    new Promise((reslove,reject)=>{
      this.setData({
        productId:options.id
      })
    }).then(    
        //从服务器获取
      that.getRes().then((res)=>{
        that.setData({
          productInfo: res
        })
      }))

  },

  star:function(){
    const { ifstar } = this.data;
    //访问后台，操作收藏夹
    if(ifstar){
      this.setData({
        ifstar:false
      })
    }else{
      this.setData({
        ifstar:true
      })
    }
  },

  //返回商品数据
  getRes:function(){
    const { productId, getDetailUrl } = this.data
    // const getDetailUrl = "http://192.168.2.171:8080/product/getiteminfo"    //获取商品详情路径
    var url = getDetailUrl + "?id=" + productId
    return new Promise((reslove,reject)=>{
      wx.request({
        url: url,
        header: {
          'token':wx.getStorageSync("_3rd_session")
          },
        method: 'POST',
        success:(res)=>{
          console.log("getRes::res--->",res)
          wx.hideLoading();         //请求成功隐藏加载框
          reslove(res.data)
        },
        fail:(res)=>{
          reject(res)
        }
      })
    })
  },


  //立即购买按钮点击
  buynow:function(){
    //跳转到订单生成页
  }
})