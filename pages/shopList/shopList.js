// pages/shopList/shopList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList:[],
    shopList1:[],
    pageIndex: 0,
    pageSize: 20,
    catId: 1,
    hasMore:true
  },
  // 封装请求数据函数
  loadmore: function(){
    console.log(this.data.catId)
    wx.request({
      url: 'https://locally.uieee.com/categories/' + this.data.catId + '/shops',
      data: {
        _limit: this.data.pageSize,
        _page: ++this.data.pageIndex
      },
      success: (res) => {
        var newList = this.data.shopList.concat(res.data);
        var count = parseInt(res.header['X-Total-Count']);
        var flag = this.data.pageIndex * this.data.pageSize < count;
        // 等同于 var flag = this.data.shopList.length < count;
        this.setData({
          shopList: newList,
          hasMore: flag
        })
        // console.log(this.data.shopList) 
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.setData({
      catId:options.cat
    })
    this.loadmore();    
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
    this.loadmore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})