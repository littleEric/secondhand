// pages/productInfo/productInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifstar:true,
    productId:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad:::options.id--->",options.id);
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

  //立即购买按钮点击
  buynow:function(){
    //跳转到订单生成页
  }
})