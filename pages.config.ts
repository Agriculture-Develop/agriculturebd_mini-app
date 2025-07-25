import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'unibest',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^fg-(.*)': '@/components/fg-$1/fg-$1.vue',
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  // 如果不需要tabBar，可以注释掉这个配置，或者直接删除
  tabBar: {
    color: '#999999',
    selectedColor: '#018d71',
    backgroundColor: '#F8F8F8',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/tabbar/home.png',
        selectedIconPath: 'static/tabbar/homeHL.png',
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        iconPath: 'static/tabbar/shop.png',
        selectedIconPath: 'static/tabbar/shopHL.png',
        pagePath: 'pages/goods/index',
        text: '供需对接',
      },
      {
        iconPath: 'static/tabbar/publish.png',
        selectedIconPath: 'static/tabbar/publishHL.png',
        pagePath: 'pages/goods/publish/index',
        text: '发布',
      },

      {
        iconPath: 'static/tabbar/personal.png',
        selectedIconPath: 'static/tabbar/personalHL.png',
        pagePath: 'pages/mine/index',
        text: '我的',
      },
    ],
  },
})
