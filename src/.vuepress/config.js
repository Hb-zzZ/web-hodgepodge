const themeConfig = require('./config/')

const base = '/web-hodgepodge/'

module.exports = {
  theme: 'reco',
  title: 'Hb的杂烩面',
  base: base,
  dest: './docs',
  description: '前端个人大杂烩，用于记录',
  head: [
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
    ['link', { rel: 'icon', href: `/favicon.ico` }],
    ['meta', { name: 'author', content: 'Hb-zzZ' }],
    ['meta', { name: 'keywords', content: '前端个人大杂烩' }],
  ],
  themeConfig,
  markdown: {
    extendMarkdown: (md) => {
      md.use(require('markdown-it-imsize'))

      md.use(require('markdown-it-image-loading'), {
        loadingSrc: `${base}loading.svg`,
        loadingWidth: 50,
        loadingHeight: 50,
        minWidth: 50,
        minHeight: 50,
      })
    },
  },
}
