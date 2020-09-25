const nav = require('./nav/')

module.exports = Object.assign(
  {},
  {
    nav
  },
  {
    // 关闭404公益页面
    noFoundPageByTencent: false,
    startYear: '2020',
    author: 'Hb_zzZ',
    authorAvatar: '/avatar.jpg',
    lastUpdated: '最后更新',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    subSidebar: 'auto',
    sidebarDepth: 4,
    // 备案号
    // record: 'xxxx',
    codeTheme: 'tomorrow',
    type: 'blog',
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: '分类' // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: '标签' // 默认 “标签”
      }
    }
  }
)
