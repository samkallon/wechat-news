Page({
  data: {
    ID : 0,
    Detail_content : [],
    Detail_title : '',
    Detail_source : '',
    Detail_time : '',
    Detail_read : 0,
    Detail_PicPath : ''
  },
  onPullDownRefresh() {
    this.getDetail(() => {
      wx.stopPullDownRefresh()
    })
  },
  onLoad(options) {
    this.setData({
      ID : options.id
    })
    console.log(this.data.ID) 
    this.getDetail()

  },

  getDetail(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data:{
        id : this.data.ID
      },
      success:res=>{
        let result = res.data.result
        console.log(result)
        this.setData({
          Detail_read : result.readCount,
          Detail_content : result.content,
          Detail_source : result.source,
          Detail_time : result.date,
          Detail_title : result.title,
          Detail_PicPath : result.firstImage
        })
        console.log(this.data.Detail_time)
      },
      complete:()=>{
        callback && callback()
      }
    })
  },


})