// pages/productInfo/productInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifStar:true,
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
        that.setData({
          ifStar:(res.ifStar) == 0 ? false : true
        })
      }))

  },

  star:function(){
    const { ifStar } = this.data;
    //访问后台，操作收藏夹
    this.updateStar()
  },
  updateStar:function(){
    var that = this
    const { productId,ifStar } = this.data
    const { updateStarUrl } = app.globalData
    wx.request({
      url: updateStarUrl + "?id=" + productId + "&action=" + (ifStar?'0':'1'),
      header: {
        'token': wx.getStorageSync('_3rd_session')
      },
      method: 'POST',
      //更新收藏标记
      success: function(res) {
        console.log("updateStar::",res)
        that.setData({
          ifStar:(ifStar ? false : true)
        })
        console.log(that.data.ifStar)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
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

  },

  onPreview:function(e) {         //图片预览
    console.log("onPreview:::e--->",e)
    const { url } = e.currentTarget.dataset
    const { productInfo, imgUrlPrefix } = this.data;
    const urls = productInfo.imgUrlList.map((x)=>{
      return imgUrlPrefix + x.imgUrl
    })
    // console.log(urls)
    wx.previewImage({
      urls: urls,
      current: imgUrlPrefix+url
    })
  }
})