// pages/fucktencent/sbtencent.js
import { $wuxToast } from '../../dist/index'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getUser: function (e){
    //设置globalData的userInfo
    const { errMsg,userInfo } = e.detail;
    console.log(errMsg);
    //点击授权，调用login方法
    if (errMsg == "getUserInfo:ok"){
        app.wxLogin();
    }else{
      $wuxToast().show({          //用户取消授权，弹出提示
        type: 'forbidden',
        duration: 1000,
        color: '#fff',
        text: '请同意授权',
        success: () => console.log('用户取消授权')
      })
    }
  }
})