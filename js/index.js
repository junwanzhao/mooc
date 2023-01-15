// 定时器实现关键词切换
{
  // 1.获取搜索框的输入表单对象
  let input = document.querySelector(".search input");

  // 2.设置关键词数组
  const keyWords = ['Vu3.0', 'React', '爬虫技术', 'Java', '多线程'];

  // 3.使用setInterval 每隔2秒切换一个关键词，就是修改 input placeholder 值
  let i = 0;//关键词组索引
  input.placeholder = keyWords[i];
  setInterval(() => {
    i++;
    if (i === 5) {
      i = 0;
    }
    input.placeholder = keyWords[i];
  }, 2000);
}

// 轮播
{
  // 定义轮播图数据
  const swiperImgList = [
    {
      path: './images/swiper/1.jpg',
      url: 'https://www.imooc.com/',
      bg: './images/swiper/bj-4.jpg'
    },
    {
      path: './images/swiper/2.jpg',
      url: 'https://www.imooc.com/',
      bg: './images/swiper/bj-3.jpg'
    },
    {
      path: './images/swiper/3.jpg',
      url: 'https://www.imooc.com/',
      bg: './images/swiper/bj-4.jpg'
    },
    {
      path: './images/swiper/4.jpg',
      url: 'https://www.imooc.com/',
      bg: './images/swiper/bj-3.jpg'
    },
    {
      path: './images/swiper/5.jpg',
      url: 'https://www.imooc.com/',
      bg: './images/swiper/bj-4.jpg'
    },
    {
      path: './images/swiper/6.jpg',
      url: 'https://www.imooc.com/',
      bg: './images/swiper/bj-1.jpg'
    }

  ];

  // 找到swiper下的a标签
  const swiperA = document.querySelector('.swiper a');
  // 找到最外层的div
  const banner = document.querySelector('#banner');
  // 定时定时器
  let timer = null;
  // 数组索引
  let i = 0;

  // 找到左右切换按钮
  const prevArrow = document.querySelector('.prev');
  const nextArrow = document.querySelector('.next');

  // 获取所有的切换圆点
  const ul = document.querySelector('.circle-list');
  const list = document.querySelectorAll('.circle-list li');

  // 封装一个切换图片的函数
  function changeImg(index) {
    const obj = swiperImgList[index];
    swiperA.style.backgroundImage = `url(${obj.path})`;
    swiperA.href = obj.url;
    banner.style.backgroundImage = `url(${obj.bg})`;
    // 让圆点切换与主图切换同步
    currentCircle(index);
  }

  // 初始化轮播，显示第一张图
  changeImg(i);
  // 启动定时器
  timer = setInterval(() => {
    i = ++i === 6 ? 0 : i;
    changeImg(i);
  }, 3000);

  // 点的快会没有过渡效果，因为过渡需要1秒
  // prevArrow.onclick = function () {
  //   i = --i == -1 ? 3 : i;
  //   changeImg(i);
  // }
  // nextaArrow.onclick = function () {
  //   i = ++i == 4 ? 0 : i;
  //   changeImg(i);
  // }

  // 改进：设置是否允许点击事件执行的标志位：true则允许执行点击事件，false则不允许执行
  let flag = true;
  prevArrow.onclick = function () {
    // 如果当前不能点击直接返回
    if (flag == false) {
      return;
    }
    flag = false;
    i = --i == -1 ? 5 : i;
    changeImg(i);
    // 一秒后允许重新点击
    setTimeout(() => {
      flag = true;
    }, 1000)
  }

  nextArrow.onclick = function () {
    if (flag == false) {
      return;
    }
    flag = false;
    i = ++i == 6 ? 0 : i;
    changeImg(i);
    setTimeout(() => {
      flag = true;
    }, 1000)
  }
  // 选中的圆点对其进行函数封装
  function currentCircle(index) {
    for (let i = 0; i < list.length; i++) {
      list[i].className = '';
      list[index].className = 'current';
    }
  }
  // 循环注册所有圆点的点击事件，也注意1秒内不能重复点击
  for (let i = 0; i < list.length; i++) {
    list[i].onclick = function () {
      if (flag == false) {
        return;
      }
      flag = false;
      changeImg(i);
      setTimeout(() => {
        flag = true;
      }, 1000)
    }
  }

  // 鼠标悬停到轮播大图，清除定时器
  swiperA.onmouseenter = function () {
    clearInterval(timer);
  }

  // 鼠标离开,重新启动定时器
  swiperA.onmouseleave = function () {
    timer = setInterval(() => {
      i = ++i == 6 ? 0 : i;
      changeImg(i);
    }, 3000);
  }

  prevArrow.onmouseenter = function () {
    clearInterval(timer);
  }

  nextArrow.onmouseenter = function () {
    clearInterval(timer);
  }

  ul.onmouseenter = function () {
    clearInterval(timer);

  }

}
