(function () {
  const    resJson = [
    {
    type: '行人过街按灯同行',
    list: [
      {
        name: '张三',
        imgList: [
          {
            imgUrl: 'https://novacloud-v5.oss-cn-hangzhou.aliyuncs.com/liuxy/media/%E7%B3%BB%E7%BB%9F%E6%96%87%E4%BB%B6%E5%A4%B9/%E6%88%AA%E5%B1%8F2020-02-13%E4%B8%8B%E5%8D%883.20.54%5B274980-1%5D.png?OSSAccessKeyId=LTAI4FwrvLWLuyvaNQNf4wB9&Expires=1627556003&Signature=FT2%2FlkJdTqmBw%2BOdDCOhm8w8P08%3D',
            text: '姓名：张三'
          },
          {
            imgUrl: 'https://novacloud-v5.oss-cn-hangzhou.aliyuncs.com/ym123/media/%E7%B3%BB%E7%BB%9F%E6%96%87%E4%BB%B6%E5%A4%B9/%E4%BA%91%E6%98%BE%E7%85%A7%E7%89%87%5B200714-1%5D.jpg?OSSAccessKeyId=LTAI4FwrvLWLuyvaNQNf4wB9&Expires=1627556140&Signature=KD393nKQ8LKuxKGv%2BdWdbpLeUF0%3D',
            text: '姓名：张三'
          },
          {
            imgUrl: 'https://novacloud-v5.oss-cn-hangzhou.aliyuncs.com/ym123/media/%E7%B3%BB%E7%BB%9F%E6%96%87%E4%BB%B6%E5%A4%B9/2838438063%5B94801-3%5D.jpg?OSSAccessKeyId=LTAI4FwrvLWLuyvaNQNf4wB9&Expires=1627556140&Signature=5aCDdv9%2BAMsMg%2FKth4CdutmcWmA%3D',
            text: '姓名：张三'
          }
        ]
      },
      {
        name: '李四',
        imgList: [
          {
            imgUrl: 'https://novacloud-v5.oss-cn-hangzhou.aliyuncs.com/ym123/media/%E7%B3%BB%E7%BB%9F%E6%96%87%E4%BB%B6%E5%A4%B9/222%5B94799-2%5D.jpg?OSSAccessKeyId=LTAI4FwrvLWLuyvaNQNf4wB9&Expires=1627556140&Signature=VgX8c71tVtuXdJ0PDsifcNOJMyA%3D',
            text: '姓名：李四'
          },
          {
            imgUrl: 'https://novacloud-v5.oss-cn-hangzhou.aliyuncs.com/ym123/media/%E7%B3%BB%E7%BB%9F%E6%96%87%E4%BB%B6%E5%A4%B9/00%20-%20%E5%89%AF%E6%9C%AC123%5B223570-1%5D.bmp?OSSAccessKeyId=LTAI4FwrvLWLuyvaNQNf4wB9&Expires=1627556140&Signature=hftQUrtpJDvIcScSSi3%2BEzhk%2F6I%3D',
            text: '姓名：李四'
          },
          {
            imgUrl: './6.jpg',
            text: '姓名：李四'
          }
        ]
      }
    ]
  }, {
    type: '车辆同行礼让行人',
    list: [
      {
        name: '王五',
        imgList: [
          {
            imgUrl: './7.jpg',
            text: '姓名：王五'
          },
          {
            imgUrl: './8.jpg',
            text: '姓名：王五'
          },

        ]
      }
    ]
  }]
  const getUrlParam = function (key) {
    let str = location.search;
    str = str.substring(1, str.length);
    let arr = str.split('&');
    let obj = new Object();
    for (let i = 0; i < arr.length; i++) {
      let tmp_arr = arr[i].split('=');
      obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
    }
    return obj[key];
};

const timeClock = function() {
    setTimeout(()=>{
      $('.swiper-wrapper .open-view').hide()
    },3000)
    var childHtml = $('.swiper-wrapper .swiper-slide')
    var domLength = childHtml.length
    var index = 0
    var time = setInterval( () =>{
      $(childHtml[index]).show()
      $(childHtml[index == 0 ? domLength-1 : index-1]).hide()
      index++;
      if(index == domLength){
        index = 0;
      }
    }, 3000)
  }
  const creatDom = function(data) {
    var htmlStr = '';
    if (data && data.length > 0) {
      data.forEach((item) =>{
        htmlStr += createTypeHtml(item.type)
        if (item.list && item.list.length > 0) {
          item.list.forEach( (pre) =>{
            if (pre.imgList && pre.imgList.length > 0) {
              pre.imgList.forEach( (imgItem)=> {
                htmlStr += createSlideHtml(imgItem)
              })
            }
          })
        }
      })
    }
    $('.swiper-wrapper').append(htmlStr)
    timeClock()
  }
  const createSlideHtml = (item) => {
    return '<div class="swiper-slide" style="background-image:url(' + item.imgUrl + ')"><div class="text">' + item.text + '</div></div>'
  }
  const createTypeHtml = (text) =>  {
    return '<div class="swiper-slide text-view"><div>' + text + '</div></div>'
  }
  const getData = () => {
    $.ajax({
      type: 'GET',
      url: 'https://sit2-manager.vnnox.com/gateway/apis?vnnox=djEvY2xvdWQtc2VydmljZS9pbnRlcm5hdGlvbmFsaXphdGlvbmNvbmZpZ3VyYXRpb24/',
      timeout: 3000,
      context: $('body'),
      success: function (data) {
        creatDom(resJson)
      },
      error: function (xhr, type) {
        console.log('Ajax error!')
      }
    })
  }
  const setBodyStyle = (width,height) => {
    $('.swiper-wrapper').width(width+'px').height(height+'px')
  }
  const init = ()=>{
    let width = getUrlParam('width'),height =  getUrlParam('height')
    setBodyStyle(width,height)
    getData()
  }
  init()
})()
